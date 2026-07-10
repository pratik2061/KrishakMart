import { Request, Response } from "express";
import { loginPayload } from "../../types/Payload";
import prisma from "../../Db/db.config";
import { productSchema } from "../../zod/productSchema";
import { STATUS_CODE } from "../../Constants";
import Stream from "stream";
import cloudinary from "../../utils/cloudinary";

export const addProductController = async (req: Request, res: Response) => {
  try {
    const userData = res.locals.user as loginPayload;
    const farmer_data = await prisma.farmer.findUnique({
      where: {
        userId: userData.id,
      },
    });

    const {
      productName,
      productDescription,
      productPrice,
      productQuantity,
      productCategory,
    } = req.body;

    const parsedInput = productSchema.safeParse(req.body);

    if (!parsedInput.success) {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        message: "Invalid input",
        error: parsedInput.error,
      });
    } else if (!farmer_data?.isVerified) {
      res.status(STATUS_CODE.FORBIDDEN).json({
        message: "You are not allowed to add products",
      });
    } else if (!req.file) {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        message: "Image file is required",
      });
    } else {
      const bufferStream = new Stream.PassThrough();
      bufferStream.end(req.file.buffer);

      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "products" },
        async (error, result) => {
          if (error) {
            res.status(500).json({
              error: "Cloudinary upload failed",
              detail: error,
            });
          } else if (!result?.secure_url) {
            res.status(500).json({ error: "Upload failed" });
          } else {
            const product = await prisma.product.create({
              data: {
                userId: userData.id,
                productName,
                productDescription,
                productImage: result.secure_url,
                productPrice: parseInt(productPrice),
                productQuantity: parseInt(productQuantity),
                productCategory,
              },
            });
            res.status(201).json({ success: true, product });
          }
        }
      );

      bufferStream.pipe(uploadStream);
    }
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Error adding product",
      error,
    });
  }
};
