import jwt from 'jsonwebtoken'
import HttpStatusCode from '../exception/HttpStatusCode.js'

function checkUserLogin(req, res, next) {
    const token = req.headers?.authorization?.split(' ')[1]

    try {
        const tokenVerify = jwt.verify(token, process.env.SECRET_TOKEN)
        const isExpired = tokenVerify.exp * 1000 < Date.now()

        if (isExpired) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: 'Đã hết phiên đăng nhập',
                statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
            })
        }

        req.data = {
            ...tokenVerify,
        }

        next()
    } catch (error) {
        return res
            .status(error.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR)
            .json({
                message: error.message,
                statusCode: error.statusCode,
            })
    }
}

export default checkUserLogin
