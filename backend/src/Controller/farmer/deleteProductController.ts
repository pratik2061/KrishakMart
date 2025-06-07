import { Request, Response } from "express";
import { STATUS_CODE } from "../../Constants";
import { loginPayload } from "../../types/Payload";
import prisma from "../../Db/db.config";

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const userData = res.locals.user as loginPayload;
    const productId = req.params.id;

    const findProduct = await prisma.product.findUnique({
      where: {
        id: parseInt(productId),
        userId: userData.id,
      },
    });
    if (!findProduct) {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message:
          "Product not found or you are not authorized to delete this product",
      });
    } else {
      await prisma.product.delete({
        where: {
          id: parseInt(productId),
          userId: userData.id,
        },
      });
      res.status(STATUS_CODE.OK).json({
        message: "Product deleted successfully",
      });
    }
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Error in deleting product",
      error: (error as Error).message,
    });
  }
};
