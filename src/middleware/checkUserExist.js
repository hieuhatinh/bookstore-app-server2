import UserModel from '../Model/User.js'

const checkUserExist = async (req, res, next) => {
    const { idUser } = req.params
    const existUser = await UserModel.findOne({ _id: idUser })

    if (!existUser) {
        throw new ErrorHandler('User không tồn tại', HttpStatusCode.NOT_FOUND)
    }

    next()
}

export default checkUserExist