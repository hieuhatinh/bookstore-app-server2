import jwt from 'jsonwebtoken'

import UserModel from '../Model/User.js'
import ErrorHandler from '../exception/ErrorHandler.js'
import HttpStatusCode from '../exception/HttpStatusCode.js'
import CartModel from '../Model/Cart.js'

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

    const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.SECRET_TOKEN,
        {
            expiresIn: '24h',
        },
    )

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
        throw new ErrorHandler(
            'Tài khoản đã tồn tại || số điện thoại đã tồn tại',
            409,
        )
    }

    const newUser = await UserModel.create({
        email,
        password,
        phoneNumber,
    })

    await CartModel.create({
        user: newUser._id,
        products: [],
    })

    const token = jwt.sign(
        { id: newUser._id, email: newUser.email, role: newUser.role },
        process.env.SECRET_TOKEN,
        {
            expiresIn: '24h',
        },
    )

    return {
        ...newUser._doc,
        token,
        password: 'Not show',
    }
}

/**
 * @description: update thông tin người dùng
 * @method patch
 * @route /auth/update
 */
const updateProfile = async ({ userId, fullName, avatar }) => {
    const result = await UserModel.updateOne(
        {
            _id: userId,
        },
        {
            fullName,
            avatar,
        },
    )

    return result
}

/**
 * @description: lấy thông tin người bán
 * @method get
 * @route /auth/profile
 */
const getProfileUser = async ({ idUser }) => {
    const userProfile = await UserModel.findOne({ _id: idUser })

    if (!userProfile) {
        throw new ErrorHandler(
            'Không tồn tại người dùng này',
            HttpStatusCode.NOT_FOUND,
        )
    }

    return {
        ...userProfile._doc,
        password: 'Not show',
    }
}

export default {
    login,
    register,
    updateProfile,
    getProfileUser,
}
