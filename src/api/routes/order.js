import express from 'express'
import { orderController } from '../../controllers/index.js'
import checkUserExist from '../../middleware/checkUserExist.js'
import checkUserLogin from '../../middleware/checkUserLogin.js'

const routerOrder = express.Router()

routerOrder.post(
    '/add/:idUser',
    checkUserLogin,
    checkUserExist,
    orderController.addProducts,
)
routerOrder.patch(
    '/update/:idUser',
    checkUserLogin,
    checkUserExist,
    orderController.updateProfileOrder,
)

export default routerOrder
