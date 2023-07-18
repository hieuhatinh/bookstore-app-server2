import express from 'express'
import { cartController } from '../../controllers/index.js'
import { checkProductExist, checkUserExist } from '../../middleware/index.js'
import checkUserLogin from '../../middleware/checkUserLogin.js'

const routerCart = express.Router()

/**
 * @description: lấy tất cả sách có trong giỏ hàng của 1 người dùng
 * @method get
 * @route /cart/:idUser
 */
routerCart.get('/:idUser', checkUserLogin, cartController.getAllBooksInCart)

/**
 * @description: thêm 1 quyển sách vào giỏ hàng của người dùng
 * @method post
 * @route /cart/addToCart/:idUser/:idProduct
 */
routerCart.post(
    '/addToCart/:idUser/:idProduct',
    checkUserLogin,
    checkUserExist,
    checkProductExist,
    cartController.addToCart,
)

/**
 * @description: xóa 1 sách ra khỏi giỏ hàng của người dùng
 * @method delete
 * @route /cart/deleteOne/:idUser/:idProduct
 */
routerCart.delete(
    '/deleteOne/:idUser/:idProduct',
    checkUserLogin,
    checkUserExist,
    checkProductExist,
    cartController.deleteToCart,
)

export default routerCart
