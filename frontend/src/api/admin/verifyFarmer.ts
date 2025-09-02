import axios from "axios";
import { api } from "../authServices";

export const verifyFarmerApi = async (id: number, isVerified: boolean) => {
  try {
    const res = await api.post(`/admin/verifyfarmer/${id}`, { id, isVerified });
    return { success: true, data: res.data?.message };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || "something went wrong",
        status: error.response?.status,
      };
    }
    return { success: false, message: "Unexpected error" };
  }
};


export const rejectFarmerApi = async(id: number)=>{
  try {
    const res = await api.post(`/admin/rejectfarmer/${id}`,{id});
    return { success: true, data: res.data?.message };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || "something went wrong",
        status: error.response?.status,
      };
    }
    return { success: false, message: "Unexpected error" };
  }
}
