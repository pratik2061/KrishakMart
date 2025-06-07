import { api } from "../../authServices";

export const loginAuthAxios = async (email: string, password: string) => {
  try {
    const res = api.post("/auth/login", { email, password });
    return res;
  } catch (error) {
    return error;
  }
};
