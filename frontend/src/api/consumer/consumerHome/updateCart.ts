import { api } from "../../authServices";

export const updateCartProductQuantity = async (id: number,quantity : number) => {
  try {
    const res = await api.post(`/consumer/cart/update/${id}`, { id ,quantity});
    return res;
  } catch (error) {
    return error;
  }
};
