import axios from "axios";

export const api = axios.create({
  // baseURL:'http://10.40.40.193:3000/api',
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});
