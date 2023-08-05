import express from 'express'
import passport from 'passport'

import { authController } from '../../controllers/index.js'
import { uploadCloud, checkUserLogin } from '../../middleware/index.js'

const routerAuth = express.Router()

/**
 * @description: chuyển hướng người dùng - đăng nhập bằng google
 * @method get
 * @route /auth/google
 */
// routerAuth.get('/login/federated/google', passport.authenticate('google'))
routerAuth.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }),
)

routerAuth.get(
    '/google/callback', (req, res, next) => {
        passport.authenticate('google', function (err, profile) {
            req.user = profile,
                next()
        })(req, res, next)
    },
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect(`${process.env.URL_CLIENT}/login-success/${req.user?.id}`)
    },
)

routerAuth.get('', (req, res) => res.json({ message: 'hello' }))

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

/**
 * @description: lấy thông tin người bán
 * @method get
 * @route /auth/:idSeller
 */
routerAuth.get('/:idSeller', authController.getProfileSeller)

export default routerAuth
