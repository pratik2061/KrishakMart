import { Router } from "express";
import {
  userLogin,
  userLogout,
  userRegister,
} from "../../Controller/auth/userauth/auth";
import {
  farmerLogin,
  farmerLogout,
  farmerRegister,
} from "../../Controller/auth/farmerauth/farmerAuth";

const routes = Router();

//For admin and consumer
routes.post("/register", userRegister);
routes.post("/login", userLogin);
routes.post("/logout", userLogout);

//for Farmer
routes.post("/farmer/register", farmerRegister);
routes.post("/farmer/login", farmerLogin);
routes.post("/farmer/logout", farmerLogout);

export default routes;
