import { Request, Response } from "express";
import { STATUS_CODE } from "../../Constants";
import { loginPayload } from "../../types/Payload";
import prisma from "../../Db/db.config";

export const deleteCartItemController = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const userData = res.locals.user as loginPayload;
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        userId: userData.id,
        productId: parseInt(productId),
      },
    });
    if (!cartItem) {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: "Cart item not found",
      });
    } else {
      await prisma.cartItem.delete({
        where: {
          id: cartItem.id,
          userId: userData.id,
          productId: parseInt(productId),
        },
      });
      res.status(STATUS_CODE.OK).json({
        message: "Cart item deleted successfully",
      });
    }
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Error in deleting cart item",
      error: error,
    });
  }
};
