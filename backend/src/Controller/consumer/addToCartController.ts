import { Request, Response } from "express";
import { STATUS_CODE } from "../../Constants";
import { loginPayload } from "../../types/Payload";
import prisma from "../../Db/db.config";

export const addToCartController = async (req: Request, res: Response) => {
  try {
    const { quantity } = req.body;
    const userData = res.locals.user as loginPayload;
    const productId = req.params.id;
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(productId),
      },
    });
    if (!product) {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        message: "Product not found",
      });
    } else {
      const cartItem = await prisma.cartItem.create({
        data: {
          userId: userData.id,
          productId: parseInt(productId),
          quantity: quantity,
          price: product.productPrice,
        },
      });
      if (!cartItem) {
        res.status(STATUS_CODE.BAD_REQUEST).json({
          message: "Failed to add to cart",
        });
      } else {
        res.status(STATUS_CODE.CREATED).json({
          message: "Added to cart successfully",
          data: cartItem,
        });
      }
    }
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Error in adding to cart",
      error: error,
    });
  }
};
