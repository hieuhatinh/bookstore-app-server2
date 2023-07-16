import HttpStatusCode from '../exception/HttpStatusCode.js'
import { cartRepositories } from '../repositories/index.js'

const getAllBooksInCart = async (req, res) => {
    const { idUser } = req.params

    try {
        const result = await cartRepositories.getAllBooksInCart({ idUser })

        return res.status(HttpStatusCode.OK).json({
            data: result,
            message: 'Lấy thành công các sản phẩm trong giỏ hàng',
            statusCode: HttpStatusCode.OK
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

const deleteToCart = async (req, res) => {
    const { idUser, idProduct } = req.params

    try {
        const result = await cartRepositories.deleteToCart({ idUser, idProduct })

        return res.status(HttpStatusCode.OK).json({
            data: result,
            message: 'Xóa thành công sản phẩm ra khỏi giỏ hàng',
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
    deleteToCart
}
