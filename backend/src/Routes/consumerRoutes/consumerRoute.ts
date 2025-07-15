import { Router } from "express";
import { isConsumer } from "../../Middlewares/consumerMiddleware/consumerMiddleware";
import { consumerLandingController } from "../../Controller/consumer/landingController";
import { showUniqueProductController } from "../../Controller/consumer/showUniqueProduct";
import { addToCartController } from "../../Controller/consumer/addToCartController";
import { showCartItemController } from "../../Controller/consumer/showCartItemController";
import { verifyPaymentAndCreateOrder } from "../../Controller/consumer/addOrderController";
import { checkProductCart } from "../../Middlewares/consumerMiddleware/checkProductCart";
import { showOrderController } from "../../Controller/consumer/showOrderController";
import { deleteCartItemController } from "../../Controller/consumer/deleteCartItemController";
import { updateCartItemController } from "../../Controller/consumer/updateCartItemController";
import { initiateKhaltiPayment } from "../../utils/initiateKhaltiPayment";

const routes = Router();

routes.get("/", isConsumer, consumerLandingController);
routes.get("/product/:id", isConsumer, showUniqueProductController);

// cart
routes.get("/cart", isConsumer, showCartItemController);
routes.post("/cart/add/:id", isConsumer, checkProductCart, addToCartController);
routes.post("/cart/delete/:id", isConsumer, deleteCartItemController);
routes.post("/cart/update/:id", isConsumer, updateCartItemController);

// orders
routes.get("/order", isConsumer, showOrderController);
routes.post("/order/initiate-payment", isConsumer, initiateKhaltiPayment);
routes.post("/order/verify-payment", isConsumer, verifyPaymentAndCreateOrder);

export default routes;
