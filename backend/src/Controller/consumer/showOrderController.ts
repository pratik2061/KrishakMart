import { Request, Response } from "express";
import { STATUS_CODE } from "../../Constants";
import { loginPayload } from "../../types/Payload";
import prisma from "../../Db/db.config";

export const showOrderController = async (req: Request, res: Response) => {
  try {
    const userData = res.locals.user as loginPayload;
    const order = await prisma.order.findMany({
      where: {
        userId: userData.id,
      },
      include: {
        orderItems: true,
      },
    });
    if (order.length === 0 ) {
        res.status(STATUS_CODE.NOT_FOUND).json({
            message: "No orders found for this user.",
        });
        
    } else {
        res.status(STATUS_CODE.OK).json({
            message: "Orders fetched successfully",
            data: order,
        })
    }
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Error while fetching order",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
