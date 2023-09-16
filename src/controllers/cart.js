import HttpStatusCode from '../exception/HttpStatusCode.js'
import { cartRepositories } from '../repositories/index.js'

/**
 * @description: lấy tất cả sách có trong giỏ hàng của 1 người dùng
 * @method get
 * @route /cart/getAllInCarts
 */
const getAllBooksInCart = async (req, res) => {
    const idUser = req.data.id

    try {
        const result = await cartRepositories.getAllBooksInCart({ idUser })

        return res.status(HttpStatusCode.OK).json({
            data: result,
            message: 'Lấy thành công các sản phẩm trong giỏ hàng',
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

/**
 * @description: thêm 1 quyển sách vào giỏ hàng của người dùng
 * @method post
 * @route /cart/addToCart/:idProduct
 */
const addToCart = async (req, res) => {
    const idUser = req.data.id
    const { idProduct } = req.params
    const { quantity } = req.query

    try {
        const result = await cartRepositories.addToCart({
            idProduct,
            idUser,
            quantity,
        })

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

/**
 * @description: xóa 1 sách ra khỏi giỏ hàng của người dùng
 * @method delete
 * @route /cart/deleteOne/:idProduct
 */
const deleteToCart = async (req, res) => {
    const idUser = req.data.id
    const { idProduct } = req.params

    try {
        const result = await cartRepositories.deleteToCart({
            idUser,
            idProduct,
        })

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

/**
 * @description: thay đổi số lượng của 1 sản phẩm
 * @method patch
 * @route /cart/updateOne/:idProduct
 */
const updateQuantitiesProduct = async (req, res) => {
    const idUser = req.data.id
    const { idProduct } = req.params
    const { quantity } = req.query

    try {
        const result = await cartRepositories.updateQuantitiesProduct({
            idUser,
            idProduct,
            quantity,
        })

        return res.status(HttpStatusCode.OK).json({
            data: result,
            message: 'update thành công ra khỏi giỏ hàng',
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
    deleteToCart,
    updateQuantitiesProduct,
}
