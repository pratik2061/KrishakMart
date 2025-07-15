import { Request, Response } from "express";
import { loginPayload } from "../../types/Payload";
import axios from "axios";
import { STATUS_CODE } from "../../Constants";
import prisma from "../../Db/db.config";

export const verifyPaymentAndCreateOrder = async (
  req: Request,
  res: Response
) => {
  const { pidx } = req.body;
  const userData = res.locals.user as loginPayload;

  try {
    const khaltiRes = await axios.post(
      "https://a.khalti.com/api/v2/epayment/lookup/",
      { pidx },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const paymentData = khaltiRes.data;

    if (paymentData.status !== "Completed") {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        message: "Payment not completed",
      });
    }

    const cartItem = await prisma.cartItem.findMany({
      where: { userId: userData.id },
    });

    if (cartItem.length === 0) {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        message: "Cart is empty. Cannot create order.",
      });
    }

    const order = await prisma.order.create({
      data: {
        userId: userData.id,
        totalPrice: paymentData.amount / 100, // divide by 100 if it's in paisa
      },
    });

    for (const item of cartItem) {
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        },
      });
    }

    await prisma.payment.create({
      data: {
        userId: userData.id,
        orderId: order.id,
        amount: paymentData.amount / 100,
        paymentStatus: "SUCCESS",
      },
    });

    await prisma.cartItem.deleteMany({
      where: { userId: userData.id },
    });

    res.status(STATUS_CODE.CREATED).json({
      message: "Payment verified and order created",
      orderId: order.id,
    });
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Failed to verify payment and create order",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
