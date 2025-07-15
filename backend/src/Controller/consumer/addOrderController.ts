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
    // Call Khalti API to verify payment status
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

    // Check if payment status is completed
    if (paymentData.status !== "Completed") {
       res.status(STATUS_CODE.BAD_REQUEST).json({
        message: "Payment not completed",
      });
    }

    // Fetch cart items for the user
    const cartItem = await prisma.cartItem.findMany({
      where: { userId: userData.id },
    });


    if (cartItem.length === 0) {
       res.status(STATUS_CODE.BAD_REQUEST).json({
        message: "Cart is empty. Cannot create order.",
      });
    }

    // Wrap order creation and related DB calls in try-catch to handle DB errors
    try {
      // Create order record
      const order = await prisma.order.create({
        data: {
          userId: userData.id,
          totalPrice: paymentData.total_amount / 100, // convert paisa to Rs.
        },
      });

      // Create order items for each cart item
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

      // Create payment record
      await prisma.payment.create({
        data: {
          userId: userData.id,
          orderId: order.id,
          amount: paymentData.total_amount / 100,
          paymentStatus: "SUCCESS",
        },
      });

      // Clear user's cart after order creation
      await prisma.cartItem.deleteMany({
        where: { userId: userData.id },
      });

      // Respond success
       res.status(STATUS_CODE.CREATED).json({
        message: "Payment verified and order created",
        orderId: order.id,
      });
    } catch (dbError) {
      console.error("Error during DB operations:", dbError);
       res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        message: "Failed to create order or payment",
        error: dbError instanceof Error ? dbError.message : "Unknown error",
      });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
       res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Failed to verify payment and create order",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
