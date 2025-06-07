import { Request, Response } from "express";
import { STATUS_CODE } from "../../Constants";
import prisma from "../../Db/db.config";
import { loginPayload } from "../../types/Payload";

export const showProductsController = async (req: Request, res: Response) => {
  try {
    const userData = res.locals.user as loginPayload;
    const products = await prisma.product.findMany({
      where: {
        userId: userData.id,
      },
    });
    const farmer_data = await prisma.farmer.findUnique({
      where: {
        userId: userData.id,
      },
    });
    if (farmer_data?.isVerified === true) {
      if (products.length === 0) {
        res.status(STATUS_CODE.NOT_FOUND).json({
          message: "No products found",
        });
      } else {
        res.status(STATUS_CODE.OK).json({
          message: "Products found",
          products: products,
        });
      }
    } else {
        res.status(STATUS_CODE.UNAUTHORIZED).json({
            message: "You are not verified",
        });
    }
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Error showing products",
      error: error,
    });
  }
};
