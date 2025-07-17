import { api } from "../../authServices";

export const updateOrderStatus = async (id: number, orderStatus: string) => {
  try {
    const res = await api.post(`/farmer/order/update/${id}`, {
      id,
      orderStatus,
    });
    return res;
  } catch (error) {
    return error;
  }
};
