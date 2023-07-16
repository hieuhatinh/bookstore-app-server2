import express from 'express'
import { cartController } from '../../controllers/index.js'

const routerCart = express.Router()

routerCart.get('', cartController.getAllBooksInCart)
routerCart.post('/addToCart/:idUser/:idProduct', cartController.addToCart)

export default routerCart
