import { Request, Response } from "express";
import { STATUS_CODE } from "../../Constants";
import { loginPayload } from "../../types/Payload";
import prisma from "../../Db/db.config";

export const showFarmerDetailController = async (
  req: Request,
  res: Response
) => {
  try {
    const farmerData = res.locals.user as loginPayload;

    const farmerDetail = await prisma.user.findUnique({
      where: {
        id: farmerData.id,
      },
      select: {
        farmer: true,
      },
    });

    res.status(STATUS_CODE.OK).json({
      message: "farmer details fetched successfully",
      data: farmerDetail,
    });
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Error while fetching data",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
