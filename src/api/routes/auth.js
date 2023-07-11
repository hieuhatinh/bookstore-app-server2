import express from 'express'
import { authController } from '../../controllers/index.js'

const routerAuth = express.Router()

routerAuth.post('/login', authController.login)
routerAuth.post('/register', authController.register)

export default routerAuth
