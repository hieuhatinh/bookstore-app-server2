import express from 'express'
import { orderController } from '../../controllers/index.js'
import checkUserExist from '../../middleware/checkUserExist.js'

const routerOrder = express.Router()

routerOrder.post('/add/:idUser', checkUserExist, orderController.addProducts)
routerOrder.patch('/update/:idUser', checkUserExist, orderController.updateProfileOrder)

export default routerOrder