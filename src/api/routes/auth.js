import express from 'express'
import { authController } from '../../controllers/index.js'
import { uploadCloud, checkUserLogin } from '../../middleware/index.js'

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

/**
 * @description: update thông tin người dùng
 * @method patch
 * @route /auth/update
 */
routerAuth.patch(
    '/update',
    checkUserLogin,
    uploadCloud.single('avatar'),
    authController.updateProfile,
)

export default routerAuth
