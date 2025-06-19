import axios from "axios";
import { api } from "../../authServices";

export const addToCart = async (id: number) => {
  try {
    const res = await api.post(`/consumer/cart/add/${id}`, { id });
    return { success: true, data: res.data?.message  };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || "Something went wrong",
        status: error.response?.status,
      };
    }
    return { success: false, message: "Unexpected error" };
  }
};