import { Request, Response } from "express";
import { STATUS_CODE } from "../../Constants";
import { loginPayload } from "../../types/Payload";
import prisma from "../../Db/db.config";

export const updateProductController = async (req: Request, res: Response) => {
  try {
    const userData = res.locals.user as loginPayload;
    const productId = req.params.id;
    const { productPrice, productQuantity } = req.body;

    const findProduct = await prisma.product.findUnique({
      where: {
        id: parseInt(productId),
        userId: userData.id,
      },
    });

    if (!findProduct) {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        message:
          "Product not found or you are not authorized to update this product",
      });
    } else {
      await prisma.product.update({
        where: {
          id: parseInt(productId),
          userId: userData.id,
        },
        data: {
          productPrice: productPrice ? productPrice : findProduct.productPrice,
          productQuantity: productQuantity
            ? productQuantity
            : findProduct.productQuantity,
        },
      });
      res.status(STATUS_CODE.OK).json({
        message: "Product updated successfully",
      });
    }
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Error in updating product",
      error: (error as Error).message,
    });
  }
};
