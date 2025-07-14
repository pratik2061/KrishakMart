import { api } from "../../authServices";

export const updateProduct = async (
  id: number,
  price: number,
  quantity: number
) => {
  try {
    const res = await api.post(`/farmer/product/update/${id}`, {
      productPrice: price,
      productQuantity: quantity,
    });
    return res;
  } catch (error) {
    return error;
  }
};

