import UserModel from '../Model/User.js'
import HttpStatusCode from '../exception/HttpStatusCode.js'

const checkUserExist = async (req, res, next) => {
    const idUser = req.data.id
    const existUser = await UserModel.findOne({ _id: idUser })

    if (!existUser) {
        return res.status(HttpStatusCode.NOT_FOUND).json({
            message: 'User không tồn tại',
            statuscode: HttpStatusCode.NOT_FOUND,
        })
    }

    next()
}

export default checkUserExist
