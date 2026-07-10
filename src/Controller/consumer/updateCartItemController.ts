import { Request, Response } from "express";
import { STATUS_CODE } from "../../Constants";
import { loginPayload } from "../../types/Payload";
import prisma from "../../Db/db.config";

export const updateCartItemController = async (req: Request, res: Response) => {
  try {
    const { quantity } = req.body;
    const userData = res.locals.user as loginPayload;
    const productId = req.params.id;
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(productId),
      },include:{
        cart:{
          where:{
            userId: userData.id,
            productId: parseInt(productId),
          }
        }
      }
    });
    if (!product) {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        message: "Product not found",
      });
    } else {
      const updatedCartItem = await prisma.cartItem.update({
        where: {
          id:product.cart[0].id
        },
        data: {
          quantity: quantity,
          price: quantity * product.productPrice,
        },
      });
      if (!updatedCartItem) {
        res.status(STATUS_CODE.BAD_REQUEST).json({
          message: "Failed to update to cart",
        });
      } else {
        res.status(STATUS_CODE.CREATED).json({
          message: "Cart item updated successfully",
          data: updatedCartItem,
        });
      }
    }
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Error in updating to cart",
      error: error,
    });
  }
};
