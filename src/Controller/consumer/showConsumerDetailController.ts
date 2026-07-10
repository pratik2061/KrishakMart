import { Request, Response } from "express";
import { STATUS_CODE } from "../../Constants";
import { loginPayload } from "../../types/Payload";
import prisma from "../../Db/db.config";

export const showConsumerDetailController = async (
  req: Request,
  res: Response
) => {
  try {
    const userData = res.locals.user as loginPayload;

    const consumerDetail = await prisma.user.findUnique({
      where: {
        id: userData.id,
      },
    });

    res.status(STATUS_CODE.OK).json({
      message: "consumer details fetched successfully",
      data: consumerDetail,
    });
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Error while fetching data",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
