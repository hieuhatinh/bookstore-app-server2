import express from 'express'
import routerAuth from './auth.js'
import routerProduct from './products.js'
import routerCart from './cart.js'

const router = express.Router()

router.use('/auth', routerAuth)
router.use('/product', routerProduct)
router.use('/cart', routerCart)

export default router
