import { Request, Response } from "express";
import prisma from "../../Db/db.config";
import { STATUS_CODE } from "../../Constants";

export const verifyFarmerController = async (req: Request, res: Response) => {
  try {
    const farmerId = req.params.id;
    const findFarmer = await prisma.user.findUnique({
      where: {
        id: parseInt(farmerId),
      },
      include: {
        farmer: true,
      },
    });
    if (!findFarmer) {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: "Farmer not found",
      });
    } else {
      const { isVerified } = req.body;
      await prisma.farmer.update({
        where: {
          userId: parseInt(farmerId),
        },
        data: {
          isVerified: isVerified,
        },
      });
      res.status(STATUS_CODE.OK).json({
        message: "Farmer verified successfully",
      });
    }
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Error verifying farmer",
      error: error,
    });
  }
};
