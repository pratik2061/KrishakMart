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

export const rejectFarmerController = async (req: Request, res: Response) => {
  try {
    const { id } = req.body; // id = userId

    // Delete dependent records first
    await prisma.product.deleteMany({ where: { userId: id } });
    await prisma.order.deleteMany({ where: { userId: id } });
    await prisma.cartItem.deleteMany({ where: { userId: id } });
    await prisma.payment.deleteMany({ where: { userId: id } });
    await prisma.farmer.delete({ where: { userId: id } });

    // Delete user
    await prisma.user.delete({ where: { id } });

    res
      .status(200)
      .json({ message: "Farmer rejected and deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error rejecting farmer" });
  }
};
