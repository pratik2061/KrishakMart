import { Request, Response } from "express";
import { STATUS_CODE } from "../../Constants";
import prisma from "../../Db/db.config";

export const showAllConsumerController = async (
  req: Request,
  res: Response
) => {
  try {
    const consumers = await prisma.user.findMany({
      where: {
        role: "CONSUMER",
      },
    });
    if (consumers.length !== 0) {
      res.status(STATUS_CODE.OK).json({
        message: "Consumers fetched successfully",
        data: consumers,
      });
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: "No consumers found",
      });
    }
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Error fetching consumers",
    });
  }
};
