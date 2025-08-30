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
import upload from "../../utils/upload";

const routes = Router();

//For admin and consumer
routes.post("/register",upload.single("image"), userRegister);
routes.post("/login", userLogin);
routes.post("/logout", userLogout);

//for Farmer
routes.post("/farmer/register",upload.single('image'), farmerRegister);
routes.post("/farmer/login", farmerLogin);
routes.post("/farmer/logout", farmerLogout);

export default routes;
