import express from 'express'
import { cartController } from '../../controllers/index.js'
import { checkProductExist, checkUserExist } from '../../middleware/index.js'

const routerCart = express.Router()

routerCart.get('/:idUser', cartController.getAllBooksInCart)
routerCart.post('/addToCart/:idUser/:idProduct', checkUserExist, checkProductExist, cartController.addToCart)
routerCart.delete('/deleteOne/:idUser/:idProduct', checkUserExist, checkProductExist, cartController.deleteToCart)

export default routerCart
