import express from 'express'
import { orderController } from '../../controllers/index.js'
import checkUserExist from '../../middleware/checkUserExist.js'
import checkUserLogin from '../../middleware/checkUserLogin.js'

const routerOrder = express.Router()

/**
 * @description: thêm sách vào hóa đơn
 * @method post
 * @route /order/add
 */
routerOrder.post(
    '/add',
    checkUserLogin,
    checkUserExist,
    orderController.addProducts,
)

/**
 * @description: update thông tin của người dùng (sđt, địa chỉ giao hàng)
 * @method patch
 * @route /order/update
 */
routerOrder.patch(
    '/update',
    checkUserLogin,
    checkUserExist,
    orderController.updateProfileOrder,
)

export default routerOrder
