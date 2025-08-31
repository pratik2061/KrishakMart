import { Request, Response } from "express";
import prisma from "../../Db/db.config";
import { STATUS_CODE } from "../../Constants";

export const showFarmersController = async (req: Request, res: Response) => {
  try {
    const farmers = await prisma.user.findMany({
      where: {
        role: "FARMER",
      },
      include: {
        farmer: true,
      },
    });
    if (farmers.length === 0) {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: "No farmers found",
      });
    } else {
      res.status(STATUS_CODE.OK).json({
        message: "Farmers found",
        data: {
          farmers: farmers.map((farmer) => ({
            id: farmer.id,
            name: farmer.name,
            email: farmer.email,
            contact: farmer.contact,
            address: farmer.address,
            image: farmer.image,
            farmName: farmer.farmer?.farmName,
            farmAddress: farmer.farmer?.farmAddress,
            isVerified: farmer.farmer?.isVerified,
          })),
        },
      });
    }
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
      error: error,
    });
  } finally {
    await prisma.$disconnect();
  }
};
