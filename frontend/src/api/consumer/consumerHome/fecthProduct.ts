import { api } from "../../authServices";

export const fetchProduct = async () => {
  try {
    const res = api.get("/consumer");
    return res;
  } catch (error) {
    return error;
  }
};

export const fetchProductForAllConsumer = async () => {
  try {
    const res = api.get("/consumer/all");
    return res;
  } catch (error) {
    return error;
  }
};
