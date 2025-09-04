import axios from "axios";
import { Request, Response } from "express";
import { loginPayload } from "../types/Payload";
import prisma from "../Db/db.config";
import { STATUS_CODE } from "../Constants";

interface ProductDetail {
  identity: string;
  name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export const initiateKhaltiPayment = async (req: Request, res: Response) => {
  const { totalAmount, products } = req.body as {
    totalAmount: number;
    products: ProductDetail[];
  };

  const userData = res.locals.user as loginPayload;

  try {
    const findUser = await prisma.user.findUnique({
      where: { id: userData.id },
    });

    if (findUser && findUser.role !== "CONSUMER") {
      res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ message: "User is Unauthorized for payment" });
    }

    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      {
        return_url: "http://localhost:5173/consumer/khalti-response",
        // return_url: "http://10.40.40.193:5173/consumer/khalti-response",
        website_url: "http://localhost:5173",
        // website_url: "http://10.40.40.193:5173",
        amount: totalAmount * 100, // convert to paisa
        purchase_order_id: "order_" + Date.now(),
        purchase_order_name: "KrishakMart Order",
        customer_info: {
          name: findUser?.name,
          email: findUser?.email,
          phone: findUser?.contact,
        },
        product_details: products, // 🔥 using incoming product array here
        merchant_username: "Pratik Sharma",
      },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { payment_url, pidx } = response.data;

    res.json({ payment_url, pidx });
  } catch (error) {
    console.error("Khalti payment error:", error);
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Failed to initiate payment",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
