import { api } from "../../authServices";

// 👇 Accept FormData instead of individual params
export const addProduct = async (formData: FormData) => {
  try {
    const res = await api.post("/farmer/product/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};
