import { Request, Response } from "express";
import { STATUS_CODE } from "../../Constants";
import prisma from "../../Db/db.config";

export const ShowAllProductController = async (
  req: Request,
  res: Response
) => {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        productName: true,
        productDescription: true,
        productImage: true,
        productPrice: true,
        productCategory: true,
        productQuantity: true,
        createdAt: true,
      },
    });
    if (!products) {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: "No product found",
      });
    } else {
      res.status(STATUS_CODE.OK).json({
        message: "Product found",
        data: products,
      });
    }
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Error while fetching ",
      error: error,
    });
  }
};
