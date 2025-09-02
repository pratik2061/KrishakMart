import { api } from "../authServices";

export const getAdminProfile = async () => {
  try {
    const res = await api.get("/admin/profile");
    return res;
  } catch (error) {
    return error;
  }
};
