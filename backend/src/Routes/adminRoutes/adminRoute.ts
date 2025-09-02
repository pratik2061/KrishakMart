import { Router } from "express";
import { isAdmin } from "../../Middlewares/adminMiddleware/adminMiddleware";
import { adminLandingController } from "../../Controller/admin/landingController";
import { showFarmersController } from "../../Controller/admin/showFarmerController";
import {
  rejectFarmerController,
  verifyFarmerController,
} from "../../Controller/admin/verifyFarmerController";
import { showAllConsumerController } from "../../Controller/admin/showAllConsumerController";
import { ShowAllProductController } from "../../Controller/admin/showAllProductController";
import { showAdminDetailController } from "../../Controller/admin/showAdminDetailController";

const routes = Router();

routes.get("/", isAdmin, adminLandingController);
routes.get("/show/farmers", isAdmin, showFarmersController);
routes.get("/show/consumers", isAdmin, showAllConsumerController);
routes.get("/show/products", isAdmin, ShowAllProductController);

//Farmer verification route
routes.post("/verifyfarmer/:id", isAdmin, verifyFarmerController);
routes.post("/rejectfarmer/:id", isAdmin, rejectFarmerController);

//profile
routes.get("/profile", isAdmin, showAdminDetailController);

export default routes;
