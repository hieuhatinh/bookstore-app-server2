import HttpStatusCode from '../exception/HttpStatusCode.js'
import { auth } from '../repositories/index.js'

/**
 * @description: đăng nhập
 * @method post
 * @route /auth/login
 */
const login = async (req, res) => {
    const { email, password, phoneNumber } = req.body

    try {
        const user = await auth.login({ email, password, phoneNumber })

        return res.status(HttpStatusCode.OK).json({
            data: user,
            message: 'Đăng nhập thành công',
            statusCode: HttpStatusCode.OK,
        })
    } catch (error) {
        return res
            .status(error.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR)
            .json({
                message: error.message,
                statusCode: error.statusCode,
            })
    }
}

/**
 * @description: đăng ký
 * @method post
 * @route /auth/register
 */
const register = async (req, res) => {
    const { email, password, phoneNumber } = req.body

    try {
        const newUser = await auth.register({ email, password, phoneNumber })

        return res.status(HttpStatusCode.OK).json({
            data: newUser,
            message: 'Đăng ký tài khoản thành công',
            statusCode: HttpStatusCode.OK,
        })
    } catch (error) {
        return res
            .status(error.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR)
            .json({
                message: error.message,
                statusCode: error.statusCode,
            })
    }
}

export default {
    login,
    register,
}
