import { api } from "../../authServices";

interface productsType {
  identity: string;
  name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export const initiatePayment = async (
  totalAmount: number,
  products: productsType[]
) => {
  try {
    const res = await api.post("/consumer/order/initiate-payment", {
      totalAmount,
      products,
    });
    return res;
  } catch (error) {
    return error;
  }
};
