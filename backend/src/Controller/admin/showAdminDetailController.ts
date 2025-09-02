import { Request, Response } from "express";
import { STATUS_CODE } from "../../Constants";
import { loginPayload } from "../../types/Payload";
import prisma from "../../Db/db.config";

export const showAdminDetailController = async (
  req: Request,
  res: Response
) => {
  try {
    const adminData = res.locals.user as loginPayload;

    const adminDetail = await prisma.user.findUnique({
      where: {
        id: adminData.id,
      },
    });

    res.status(STATUS_CODE.OK).json({
      message: "admin details fetched successfully",
      data: adminDetail,
    });
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Error while fetching data",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
