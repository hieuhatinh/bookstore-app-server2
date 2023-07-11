import express from 'express'
import routerAuth from './auth.js'
import routerProduct from './products.js'

const router = express.Router()

router.use('/auth', routerAuth)
router.use('/product', routerProduct)

export default router
