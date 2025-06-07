import { Request, Response, Router } from "express";
import authRoute from "./authRoute/authRoute";
import adminRoute from "./adminRoutes/adminRoute";
import consumerRoute from "./consumerRoutes/consumerRoute";
import farmerRoute from "./farmerRoutes/farmerRoute";
import { checkToken } from "../utils/checkToken";
import { loginPayload } from "../types/Payload";

const routes = Router();

//for auth
routes.use("/api/auth", authRoute);

//for admin, consumer and farmer panel
routes.use("/api/admin", adminRoute);
routes.use("/api/consumer", consumerRoute);
routes.use("/api/farmer", farmerRoute);

// for checking session for all users

routes.get("/api/verify-session", (req: Request, res: Response) => {
  const token = req.cookies?.auth_token;

  if (!token) {
    res.status(401).json({ message: "Session expired or invalid token" });
  } else {
    try {
      const user = checkToken(token) as loginPayload;

      res.status(200).json({
        id: user.id,
        email: user.email,
        role: user.role,
      });
    } catch (err) {
      res.status(401).json({ message: "Session expired or invalid token" });
    }
  }
});

export default routes;
