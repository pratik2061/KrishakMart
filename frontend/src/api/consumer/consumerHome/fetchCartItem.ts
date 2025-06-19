import { api } from "../../authServices";

export const fetchCartData = async () => {
  try {
    const res = await api.get("/consumer/cart");
    return res;
  } catch (error) {
    return error;
  }
};
