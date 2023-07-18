import express from 'express'
import { orderController } from '../../controllers/index.js'
import checkUserExist from '../../middleware/checkUserExist.js'
import checkUserLogin from '../../middleware/checkUserLogin.js'

const routerOrder = express.Router()

/**
 * @description: thêm sách vào hóa đơn
 * @method post
 * @route /order/add/:idUser
 */
routerOrder.post(
    '/add/:idUser',
    checkUserLogin,
    checkUserExist,
    orderController.addProducts,
)

/**
 * @description: update thông tin của người dùng (sđt, địa chỉ giao hàng)
 * @method patch
 * @route /order/update/:idUser
 */
routerOrder.patch(
    '/update/:idUser',
    checkUserLogin,
    checkUserExist,
    orderController.updateProfileOrder,
)

export default routerOrder
