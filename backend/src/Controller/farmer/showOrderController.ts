import { Request, Response } from "express";
import { STATUS_CODE } from "../../Constants";
import { loginPayload } from "../../types/Payload";
import prisma from "../../Db/db.config";

export const showOrderController = async (req: Request, res: Response) => {
  try {
    const userData = res.locals.user as loginPayload;
    const findProduct = await prisma.product.findMany({
      where: {
        userId: userData.id,
      },
    });

    if (findProduct.length === 0) {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        message: "No products found for this farmer",
      });
    } else {
      const productIds = findProduct.map((product) => product.id);

      const orderItems = await prisma.orderItem.findMany({
        where: {
          productId: { in: productIds },
        },
        include: {
          product: true,
          order: {
            include: {
              user: true,
            },
          },
        },
      });
      if (orderItems.length === 0) {
        res.status(STATUS_CODE.NOT_FOUND).json({
          message: "No orders found for this farmer",
        });
      } else {
        res.status(STATUS_CODE.OK).json({
          message: "Orders fetched successfully",
          orders: orderItems.map((item) => {
            return {
              orderId: item.order.id,
              productId: item.product.id,
              productName: item.product.productName,
              productImage: item.product.productImage,
              quantity: item.quantity,
              totalprice: item.price,
              consumerName: item.order.user.name,
              consumerEmail: item.order.user.email,
              status: item.order.orderStatus,
            };
          }),
        });
      }
    }
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Error in showing orders",
      error: error,
    });
  }
};
