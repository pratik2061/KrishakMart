import { Request, Response, NextFunction } from "express";
import { STATUS_CODE } from "../../Constants";
import { checkToken } from "../../utils/checkToken";
import { loginPayload } from "../../types/Payload";

export const isConsumer = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.auth_token;
  try {
    if (!token) {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        message: "Token not found || please login",
      });
    } else {
      const verifyToken = checkToken(token);
      if (!verifyToken) {
        res.status(STATUS_CODE.UNAUTHORIZED).json({
          message: "Unauthorized",
        });
      } else {
        const userData = verifyToken as loginPayload;
        if (userData.role === "CONSUMER") {
          res.locals.user = userData
          next();
        } else {
          res.status(STATUS_CODE.UNAUTHORIZED).json({
            message: "Unauthorized",
          });
        }
      }
    }
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Error while checking token",
      error: error,
    });
  }
};
