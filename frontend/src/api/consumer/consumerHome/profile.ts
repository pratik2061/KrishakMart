import { api } from "../../authServices";

export const getConsumerProfile = async () => {
  try {
    const res = await api.get("/consumer/profile");
    return res;
  } catch (error) {
    return error;
  }
};
