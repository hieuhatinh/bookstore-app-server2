import express from 'express'
import { cartController } from '../../controllers/index.js'
import { checkProductExist, checkUserExist } from '../../middleware/index.js'
import checkUserLogin from '../../middleware/checkUserLogin.js'

const routerCart = express.Router()

routerCart.get('/:idUser', checkUserLogin, cartController.getAllBooksInCart)
routerCart.post(
    '/addToCart/:idUser/:idProduct',
    checkUserLogin,
    checkUserExist,
    checkProductExist,
    cartController.addToCart,
)
routerCart.delete(
    '/deleteOne/:idUser/:idProduct',
    checkUserLogin,
    checkUserExist,
    checkProductExist,
    cartController.deleteToCart,
)

export default routerCart
