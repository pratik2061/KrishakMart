import { Request, Response } from "express";
import { STATUS_CODE } from "../../Constants";
import prisma from "../../Db/db.config";
import { loginPayload } from "../../types/Payload";
import { productSchema } from "../../zod/productSchema";

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
      productImage,
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
    } else {
      if (farmer_data?.isVerified === true) {
        await prisma.product.create({
          data: {
            userId: userData.id,
            productName,
            productDescription,
            productImage,
            productPrice,
            productQuantity,
            productCategory,
          },
        });
        res.status(STATUS_CODE.CREATED).json({
          message: "Product added successfully",
        });
      } else {
        res.status(STATUS_CODE.FORBIDDEN).json({
          message: "You are not allowed to add products",
        });
      }
    }
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Error adding product",
      error: error,
    });
  }
};
