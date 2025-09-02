import { api } from "../authServices";

export const fetchProductList = async () => {
  try {
    const res = await api.get("/admin/show/products");
    return res;
  } catch (error) {
    return error;
  }
};
