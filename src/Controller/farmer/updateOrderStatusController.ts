import { Request, Response } from "express";
import { STATUS_CODE } from "../../Constants";
import prisma from "../../Db/db.config";

export const updateOrderStatusController = async (
  req: Request,
  res: Response
) => {
  try {
    const orderId = req.params.id;
    const { orderStatus } = req.body;

    const findOrder = await prisma.order.findUnique({
      where: {
        id: parseInt(orderId),
      },
    });
    if (!findOrder) {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: "Order not found",
      });
    } else {
      await prisma.order.update({
        where: {
          id: parseInt(orderId),
        },
        data: {
          orderStatus: orderStatus,
        },
      });
      res.status(STATUS_CODE.OK).json({
        message: "Order status updated successfully",
      });
    }
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Error in updating order status",
      error: (error as Error).message,
    });
  }
};
