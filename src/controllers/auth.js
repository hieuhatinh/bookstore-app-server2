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
        return res.json({
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
        return res.json({
            message: error.message,
            statusCode: error.statusCode,
        })
    }
}

/**
 * @description: update thông tin người dùng
 * @method patch
 * @route /auth/update
 */
const updateProfile = async (req, res) => {
    const userId = req.data.id
    const { fullName } = req.body
    const avatar = req.file

    console.log(fullName, avatar)

    try {
        const result = await auth.updateProfile({
            userId,
            fullName,
            avatar,
        })

        return res.status(HttpStatusCode.OK).json({
            data: result,
            message: 'Chỉnh sửa thông tin thành công',
            statusCode: HttpStatusCode.OK,
        })
    } catch (error) {
        return res.json({
            message: error.message,
            statusCode: error.statusCode,
        })
    }
}

/**
 * @description: lấy thông tin người bán
 * @method get
 * @route /auth/profile
 */
const getProfileUser = async (req, res) => {
    const idUser = req.data.id

    console.log(idUser)

    try {
        const result = await auth.getProfileUser({ idUser })

        return res.status(HttpStatusCode.OK).json({
            data: result,
            message: 'lấy thông tin thành công',
            statusCode: HttpStatusCode.OK,
        })
    } catch (error) {
        return res.json({
            message: error.message,
            statusCode: error.statusCode,
        })
    }
}

export default {
    login,
    register,
    updateProfile,
    getProfileUser,
}
