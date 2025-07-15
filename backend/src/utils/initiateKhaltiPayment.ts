import axios from "axios";
import { Request, Response } from "express";
import { loginPayload } from "../types/Payload";
import prisma from "../Db/db.config";
import { STATUS_CODE } from "../Constants";

export const initiateKhaltiPayment = async (req: Request, res: Response) => {
  const { totalAmount } = req.body;
  const userData = res.locals.user as loginPayload;
  const findUser = await prisma.user.findUnique({ where: { id: userData.id } });

  try {
    if (findUser && findUser.role === "CONSUMER") {
      const response = await axios.post(
        "https://a.khalti.com/api/v2/epayment/initiate/",
        {
          return_url: "http://localhost:3000/khalti-response",
          website_url: "http://localhost:3000",
          amount: totalAmount * 100, // in paisa
          purchase_order_id: "order_" + Date.now(),
          purchase_order_name: "KrishakMart Order",
          customer_info: {
            name: findUser.name,
            email: findUser.email,
            phone: findUser.contact,
          },
          product_details: [],
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
    } else {
      res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ message: "User is Unauthorized for payment" });
    }
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Failed to initiate payment",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
