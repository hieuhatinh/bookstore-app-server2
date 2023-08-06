import jwt from 'jsonwebtoken'

import UserModel from '../Model/User.js'
import ErrorHandler from '../exception/ErrorHandler.js'
import HttpStatusCode from '../exception/HttpStatusCode.js'

/**
 * @description: đăng nhập
 * @method post
 * @route /auth/login
 */
const login = async ({ email, password, phoneNumber }) => {
    const user = await UserModel.findOne({
        $or: [{ email: email }, { phoneNumber: phoneNumber }],
    })

    if (!user) {
        throw new ErrorHandler(
            'Tài khoản hoặc mật khẩu sai',
            HttpStatusCode.NOT_FOUND,
        )
    }

    const isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched) {
        throw new ErrorHandler(
            'Tài khoản hoặc mật khẩu sai',
            HttpStatusCode.NOT_FOUND,
        )
    }

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.SECRET_TOKEN, {
        expiresIn: '24h',
    })

    return {
        ...user._doc,
        token,
        password: 'Not show',
    }
}

/**
 * @description: đăng ký
 * @method post
 * @route /auth/register
 */
const register = async ({ email, password, phoneNumber }) => {
    const exisUser = await UserModel.count({
        $or: [{ email: email }, { phoneNumber: phoneNumber }],
    })

    if (exisUser > 0) {
        throw new ErrorHandler('Tài khoản đã tồn tại', 409)
    }

    const newUser = await UserModel.create({
        email,
        password,
        phoneNumber,
    })

    return {
        ...newUser._doc,
        password: 'Not show',
    }
}

/**
 * @description: update thông tin người dùng
 * @method patch
 * @route /auth/update
 */
const updateProfile = async ({ userId, fullName, password, avatar }) => {
    const user = await UserModel.findOne({ _id: userId })

    user.password = password

    user.save()

    const result = await UserModel.updateOne({
        _id: userId,
    }, {
        fullName,
        avatar
    })

    return result
}

/**
 * @description: lấy thông tin người bán
 * @method get
 * @route /auth/:idSeller
 */
const getProfileSeller = async ({ idSeller }) => {
    const sellerProfile = await UserModel.findOne({ _id: idSeller })

    if (!sellerProfile || sellerProfile.role.trim().toLowerCase() !== 'seller') {
        throw new ErrorHandler(
            'Không tồn tại nhà cung cấp này',
            HttpStatusCode.NOT_FOUND,
        )
    }

    return {
        ...sellerProfile._doc,
        password: 'Not show'
    }
}

export default {
    login,
    register,
    updateProfile,
    getProfileSeller
}
