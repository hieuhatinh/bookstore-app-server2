import UserModel from '../Model/User.js'
import ErrorHandler from '../exception/ErrorHandler.js'
import HttpStatusCode from '../exception/HttpStatusCode.js'

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

    return {
        ...user._doc,
        password: 'Not show',
    }
}

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

export default {
    login,
    register,
}
