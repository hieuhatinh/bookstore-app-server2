import HttpStatusCode from '../exception/HttpStatusCode.js'
import { cartRepositories } from '../repositories/index.js'

const getAllBooksInCart = async (req, res) => { }

const addToCart = async (req, res) => {
    const { idProduct, idUser } = req.params
    const { quantity, price, name } = req.query

    try {
        const result = await cartRepositories.addToCart({ idProduct, idUser, quantity, price, name })

        return res.status(HttpStatusCode.INSERT_OK).json({
            data: result,
            message: 'Thêm vào giỏ hàng thành công',
            statusCode: HttpStatusCode.OK,
        })
    } catch (error) {
        return res
            .status(error.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR)
            .json({
                message: error.message || 'Có lỗi xảy ra',
                statusCode: error.statusCode,
            })
    }
}

export default {
    getAllBooksInCart,
    addToCart,
}
