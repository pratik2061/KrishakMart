import { Request, Response } from "express";
import { STATUS_CODE } from "../../Constants";
import prisma from "../../Db/db.config";
import { loginPayload } from "../../types/Payload";

export const showCartItemController = async (req: Request, res: Response) => {
  try {
    const userData = res.locals.user as loginPayload;
    const cartItem = await prisma.cartItem.findMany({
      where: {
        userId: userData.id,
      },
      select: {
        id: true,
        price: true,
        quantity: true,
        createdAt: true,
        productId: true, 
        product: {
          select: {
            id: true,
            productName: true,
            productImage: true,
            productQuantity: true,
            productCategory:true,
            productPrice:true
          },
        },
      },
    });
    if (cartItem.length === 0) {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: "No items in cart",
      });
    } else {
      res.status(STATUS_CODE.OK).json({
        message: "Cart items",
        cartItem: cartItem,
      });
    }
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
      error: error,
    });
  }
};
