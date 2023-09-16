import express from 'express'
import { cartController } from '../../controllers/index.js'
import { checkProductExist, checkUserExist } from '../../middleware/index.js'
import checkUserLogin from '../../middleware/checkUserLogin.js'

const routerCart = express.Router()

/**
 * @description: lấy tất cả sách có trong giỏ hàng của 1 người dùng
 * @method get
 * @route /cart/getAllInCarts
 */
routerCart.get(
    '/getAllInCarts',
    checkUserLogin,
    cartController.getAllBooksInCart,
)

/**
 * @description: thêm 1 quyển sách vào giỏ hàng của người dùng
 * @method post
 * @route /cart/addToCart/:idProduct
 */
routerCart.post(
    '/addToCart/:idProduct',
    checkUserLogin,
    checkUserExist,
    checkProductExist,
    cartController.addToCart,
)

/**
 * @description: xóa 1 sách ra khỏi giỏ hàng của người dùng
 * @method delete
 * @route /cart/deleteOne/:idProduct
 */
routerCart.delete(
    '/deleteOne/:idProduct',
    checkUserLogin,
    checkUserExist,
    checkProductExist,
    cartController.deleteToCart,
)

/**
 * @description: thay đổi số lượng của 1 sản phẩm
 * @method patch
 * @route /cart/updateOne/:idProduct
 */
routerCart.delete(
    '/updateOne/:idProduct',
    checkUserLogin,
    checkUserExist,
    checkProductExist,
    cartController.updateQuantitiesProduct,
)
export default routerCart
