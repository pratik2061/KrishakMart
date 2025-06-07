import {Router} from 'express'
import { isConsumer } from '../../Middlewares/consumerMiddleware/consumerMiddleware'
import { consumerLandingController } from '../../Controller/consumer/landingController'
import { showUniqueProductController } from '../../Controller/consumer/showUniqueProduct'
import { addToCartController } from '../../Controller/consumer/addToCartController'
import { showCartItemController } from '../../Controller/consumer/showCartItemController'
import { addOrderController } from '../../Controller/consumer/addOrderController'
import { checkProductCart } from '../../Middlewares/consumerMiddleware/checkProductCart'
import { showOrderController } from '../../Controller/consumer/showOrderController'
import { deleteCartItemController } from '../../Controller/consumer/deleteCartItemController'
import { updateCartItemController } from '../../Controller/consumer/updateCartItemController'

const routes = Router()

routes.get('/',isConsumer,consumerLandingController)
routes.get('/product/:id',isConsumer,showUniqueProductController)

// cart
routes.get('/cart',isConsumer,showCartItemController)
routes.post('/cart/add/:id',isConsumer,checkProductCart,addToCartController)
routes.post('/cart/delete/:id',isConsumer,deleteCartItemController)
routes.post('/cart/update/:id',isConsumer,updateCartItemController)

// orders
routes.post('/order/create',isConsumer,addOrderController)
routes.get('/order',isConsumer,showOrderController)




export default routes