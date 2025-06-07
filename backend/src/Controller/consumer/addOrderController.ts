import { Request, Response } from "express";
import { STATUS_CODE } from "../../Constants";
import { loginPayload } from "../../types/Payload";
import prisma from "../../Db/db.config";

export const addOrderController = async (req: Request, res: Response) => {
  try {
    const { totalprice } = req.body;
    const userData = res.locals.user as loginPayload;
    const cartItem = await prisma.cartItem.findMany({
      where: {
        userId: userData.id,
      },
    });
    if (cartItem.length === 0) {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        message:
          "Cart is empty, please add items to the cart before placing an order.",
      });
    } else {
      const order = await prisma.order.create({
        data: {
          userId: userData.id,
          totalPrice: totalprice,
        },
      });
      for (const item of cartItem) {
        await prisma.orderItem.create({
          data: {
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          },
        });
      }

      await prisma.cartItem.deleteMany({
        where: {
          userId: userData.id,
        },
      });

      res.status(STATUS_CODE.CREATED).json({
        message: "Order placed successfully",
      });
    }
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Error while setting order",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
