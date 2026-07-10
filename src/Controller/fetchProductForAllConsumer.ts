import { Request, Response } from "express";
import { STATUS_CODE } from "../Constants";
import prisma from "../Db/db.config";

export const fetchProductForAllConsumer = async (
  req: Request,
  res: Response
) => {
  try {
    const products = await prisma.product.findMany({});
    res.status(STATUS_CODE.OK).json({
      data: products,
      message: "Products fetched successfully",
    });
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};
