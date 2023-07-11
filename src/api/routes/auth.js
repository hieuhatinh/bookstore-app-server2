import express from 'express'
import { authController } from '../../controllers/index.js'

const routerAuth = express.Router()

routerAuth.get('/login', authController.login)
routerAuth.get('/register', authController.register)

export default routerAuth
