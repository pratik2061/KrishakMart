import { Router } from "express";
import { isAdmin } from "../../Middlewares/adminMiddleware/adminMiddleware";
import { adminLandingController } from "../../Controller/admin/landingController";
import { showFarmersController } from "../../Controller/admin/showFarmerController";
import { verifyFarmerController } from "../../Controller/admin/verifyFarmerController";

const routes = Router();

routes.get("/", isAdmin, adminLandingController);
routes.get("/farmers", isAdmin, showFarmersController);

//Farmer verification route
routes.post("/verifyfarmer/:id", isAdmin, verifyFarmerController);

export default routes;
