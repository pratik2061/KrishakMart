import { api } from "../authServices";

export const fetchConsumerList = async () => {
  try {
    const res = await api.get("/admin/show/consumers");
    return res;
  } catch (error) {
    return error;
  }
};
