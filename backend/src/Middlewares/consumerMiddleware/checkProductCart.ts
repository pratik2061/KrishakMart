import { Request, Response, NextFunction } from "express";
import { loginPayload } from "../../types/Payload";
import prisma from "../../Db/db.config";
import { STATUS_CODE } from "../../Constants";
export const checkProductCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = res.locals.user as loginPayload;
    const productId = req.params.id;
    const checkProduct = await prisma.cartItem.findFirst({
      where: {
        userId: userData.id,
        productId: parseInt(productId),
      },
    });

    if (!checkProduct) {
      next();
    } else {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        message: "Product already in cart",
      });
    }
  } catch (error) {}
};
