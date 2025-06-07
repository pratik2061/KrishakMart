import { Request, Response } from "express";
import prisma from "../../Db/db.config";
import { STATUS_CODE } from "../../Constants";

export const showUniqueProductController = async (
  req: Request,
  res: Response
) => {
  try {
    const productId = req.params.id;
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(productId),
      },
    });
    res.status(STATUS_CODE.ACCEPTED).json({
      message: "unique product fetched successfully",
      data: product,
    });
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Error in fetching unique product",
      error: error,
    });
  }
};
