import express from 'express'
import routerAuth from './auth.js'
import routerProduct from './products.js'
import routerCart from './cart.js'
import routerOrder from './order.js'

const router = express.Router()

router.use('/auth', routerAuth)
router.use('/product', routerProduct)
router.use('/cart', routerCart)
router.use('/order', routerOrder)

export default router
