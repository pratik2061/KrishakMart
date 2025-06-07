import jwt from "jsonwebtoken";
import { loginPayload } from "../types/Payload";

export const createToken = (payload: loginPayload) => {
  const token = jwt.sign(payload, `${process.env.JWT_SECRET_KEY}`, {
    expiresIn: "24h",
  });
  return token;
};
