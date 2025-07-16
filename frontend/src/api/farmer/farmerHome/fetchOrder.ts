import { api } from "../../authServices";

export const fetchOrder = async () => {
  try {
    const res = await api.get("/farmer/orders");
    return res;
  } catch (error) {
    return error;
  }
};
