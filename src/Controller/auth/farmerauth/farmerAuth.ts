import { Request, Response } from "express";
import { farmerAuthSchema } from "../../../zod/farmerAuthSchema";
import { STATUS_CODE } from "../../../Constants";
import prisma from "../../../Db/db.config";
import bcrypt from "bcryptjs";
import { loginPayload } from "../../../types/Payload";
import { createToken } from "../../../utils/createToken";
import Stream from "stream";
import cloudinary from "../../../utils/cloudinary";

//Farmer register
export const farmerRegister = async (req: Request, res: Response) => {
  const {
    name,
    email,
    password,
    address,
    contact,
    role,
    farmName,
    farmAddress,
  } = req.body;

  const parsedInput = farmerAuthSchema.safeParse(req.body);

  if (!parsedInput.success) {
    res.status(STATUS_CODE.EXPECTATION_FAILED).json({
      message: "zod validation failed",
      error: parsedInput.error,
    });
  } else if (!req.file) {
    res.status(STATUS_CODE.BAD_REQUEST).json({
      message: "Image file is required",
    });
  } else {
    try {
      const existingFarmer = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (existingFarmer) {
        res.status(STATUS_CODE.BAD_REQUEST).json({
          message: "Farmer with email or contact already exists",
        });
      } else {
        const bufferStream = new Stream.PassThrough();
        bufferStream.end(req.file.buffer);

        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "farmers" },
          async (error, result) => {
            if (error) {
              res.status(500).json({
                error: "Cloudinary upload failed",
                detail: error,
              });
            } else if (!result?.secure_url) {
              res.status(500).json({ error: "Upload failed" });
            }
            if (result) {
              const hashedPassword = await bcrypt.hash(password, 10);

              // Create farmer user
              await prisma.user.create({
                data: {
                  name,
                  email,
                  password: hashedPassword,
                  address,
                  contact,
                  image: result.secure_url, // store Cloudinary URL
                  role,
                  farmer: {
                    create: {
                      farmName,
                      farmAddress,
                    },
                  },
                },
              });
            }

            res.status(STATUS_CODE.ACCEPTED).json({
              message: "Farmer created successfully",
            });
          }
        );

        bufferStream.pipe(uploadStream);
      }
    } catch (error) {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        message: "Error while creating farmer",
        error: error,
      });
    }
  }
};
//farmer login
export const farmerLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const findFarmer = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        farmer: true,
      },
    });
    if (!findFarmer) {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        message: "Farmer not found || please register first.",
      });
    } else {
      if (findFarmer.role === "FARMER") {
        bcrypt.compare(password, findFarmer.password, (err, result) => {
          if (err) {
            res.status(STATUS_CODE.BAD_REQUEST).json({
              message: "Error while comparing password",
            });
          } else if (!result) {
            res.status(STATUS_CODE.BAD_REQUEST).json({
              message: "Invalid password",
            });
          } else {
            const payload: loginPayload = {
              id: findFarmer.id,
              email: findFarmer.email,
              role: findFarmer.role,
            };

            const token = createToken(payload);
            res.cookie("auth_token", token, {
              maxAge: 24 * 60 * 60 * 1000,
              httpOnly: true,
              sameSite: "none",
              secure: true,
            });

            res.status(STATUS_CODE.ACCEPTED).json({
              message: "Login successful",
              data: {
                id: findFarmer.id,
                name: findFarmer.name,
                email: findFarmer.email,
                address: findFarmer.address,
                contact: findFarmer.contact,
                image: findFarmer.image,
                role: findFarmer.role,
                farmName: findFarmer.farmer?.farmName,
                farmAddress: findFarmer.farmer?.farmAddress,
              },
              token: token,
            });
          }
        });
      } else {
        res.status(STATUS_CODE.BAD_REQUEST).json({
          message: "Invalid role || Only farmer can login",
        });
      }
    }
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Error while logging in",
      error: error,
    });
  }
};

//Farmer Logout

export const farmerLogout = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.auth_token;
    if (!token) {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        message: "No token found || Login first",
      });
    }
    res.clearCookie("auth_token", {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(STATUS_CODE.ACCEPTED).json({
      message: "Logout successful",
    });
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Error while logging out",
      error: error,
    });
  }
};
