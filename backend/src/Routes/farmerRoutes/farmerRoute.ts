import {Router} from 'express'
import { isFarmer } from '../../Middlewares/farmerMiddleware/farmerMiddleware'
import { farmerLandingController } from '../../Controller/farmer/landingController'
import { addProductController } from '../../Controller/farmer/addProductController'
import { showProductsController } from '../../Controller/farmer/showProductsController'
import { showOrderController } from '../../Controller/farmer/showOrderController'
import { updateOrderStatusController } from '../../Controller/farmer/updateOrderStatusController'
import { updateProductController } from '../../Controller/farmer/updateProductController'
import { deleteProductController } from '../../Controller/farmer/deleteProductController'

const routes = Router()

routes.get('/', isFarmer,farmerLandingController)
//adding products
routes.post('/product/add',isFarmer,addProductController)
routes.get('/product',isFarmer,showProductsController)
routes.post('/product/update/:id',isFarmer,updateProductController)
routes.post('/product/delete/:id',isFarmer,deleteProductController)

//manages orders
routes.get('/orders',isFarmer,showOrderController)
routes.post('/order/update/:id',isFarmer,updateOrderStatusController)


export default routes