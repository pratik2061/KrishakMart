import { Request, Response } from "express";
import prisma from "../../../Db/db.config";
import bcrypt from "bcryptjs";
import { STATUS_CODE } from "../../../Constants";
import { createToken } from "../../../utils/createToken";
import { userAuthSchema } from "../../../zod/userAuthSchema";
import { loginPayload } from "../../../types/Payload";

//consumer registeration

export const userRegister = async (req: Request, res: Response) => {
  const { name, email, password, address, contact, image } = req.body;

  const parsedInput = userAuthSchema.safeParse(req.body);

  if (!parsedInput.success) {
    res.status(STATUS_CODE.EXPECTATION_FAILED).json({
      message: "zod validation failed",
      error: parsedInput.error,
    });
  } else {
    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (existingUser) {
        res.status(STATUS_CODE.BAD_REQUEST).json({
          message: "User with the email or contact already exits",
        });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
          data: {
            name: name,
            email: email,
            password: hashedPassword,
            address: address,
            contact: contact,
            image: image,
          },
        });
        res.status(STATUS_CODE.ACCEPTED).json({
          message: "user created successfully.",
        });
      }
    } catch (error) {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        message: "Error while creating user",
        error: error,
      });
    }
  }
};

//User login
export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!findUser) {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        message: "User not found || Please register first",
      });
    } else {
      if (findUser.role === "ADMIN" || findUser.role === "CONSUMER") {
        bcrypt.compare(password, findUser.password, (err, result) => {
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
              id: findUser.id,
              email: findUser.email,
              role: findUser.role,
            };

            const token = createToken(payload);
            res.cookie("auth_token", token, {
              maxAge: 24 * 60 * 60 * 1000,
              httpOnly: true,
              // sameSite: "lax",
            });

            res.status(STATUS_CODE.ACCEPTED).json({
              message: "Login successful",
              data: {
                id: findUser.id,
                name: findUser.name,
                email: findUser.email,
                address: findUser.address,
                contact: findUser.contact,
                image: findUser.image,
                role: findUser.role,
              },
              token: token,
            });
          }
        });
      } else {
        res.status(STATUS_CODE.UNAUTHORIZED).json({
          message: "Unauthorized || Only admin or consumer can login",
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

//logout
export const userLogout = async (req: Request, res: Response) => {
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
      // sameSite: "lax",
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
