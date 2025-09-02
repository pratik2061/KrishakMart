import { api } from "../../authServices";

export const getFarmerProfile = async () => {
  try {
    const res = await api.get("/farmer/profile");
    return res;
  } catch (error) {
    return error;
  }
};
