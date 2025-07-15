import type { VerifyPaymentResponse } from "../../../components/VerifyingPaymentResponse";
import { api } from "../../authServices";

export const verifyKhaltiPayment = async (pidx: string) => {
  try {
    const res = api.post<VerifyPaymentResponse>("/consumer/order/verify-payment", { pidx });
    return res;
  } catch (error) {
    return error;
  }
};
