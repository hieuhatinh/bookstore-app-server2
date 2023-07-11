import express from 'express'
import { authController } from '../../controllers/index.js'

const routerAuth = express.Router()

/**
 * @description: đăng nhập
 * @method post
 * @route /auth/login
 */
routerAuth.post('/login', authController.login)

/**
 * @description: đăng ký
 * @method post
 * @route /auth/register
 */
routerAuth.post('/register', authController.register)

export default routerAuth
