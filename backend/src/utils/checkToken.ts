import jwt from "jsonwebtoken";

export const checkToken = (token: string) => {
  const verifiedToken = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
  return verifiedToken;
};
