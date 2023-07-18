import HttpStatusCode from '../exception/HttpStatusCode.js'
import { orderRepositories } from '../repositories/index.js'

/**
 * @description: thêm sách vào hóa đơn
 * @method post
 * @route /order/add/:idUser
 */
const addProducts = async (req, res) => {
    const { idUser } = req.params
    const {
        products,
        address,
        phoneNumber,
        orderStatus,
        payment,
        shippingPrice,
        itemsPrice,
        totalPrice,
        paidAt,
        deliveredAt,
    } = req.body

    try {
        const result = await orderRepositories.addProducts({
            idUser,
            products,
            address,
            phoneNumber,
            orderStatus,
            payment,
            shippingPrice,
            itemsPrice,
            totalPrice,
            paidAt,
            deliveredAt,
        })

        return res.status(HttpStatusCode.INSERT_OK).json({
            data: result,
            message: 'Thêm vào hóa đơn thành công',
            statusCode: HttpStatusCode.INSERT_OK,
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
 * @description: update thông tin của người dùng (sđt, địa chỉ giao hàng)
 * @method patch
 * @route /order/update/:idUser
 */
const updateProfileOrder = async (req, res) => {
    const { idUser } = req.params
    const {
        address,
        phoneNumber
    } = req.body

    try {
        const result = await orderRepositories.updateProfileOrder({
            idUser,
            address,
            phoneNumber,
        })

        return res.status(HttpStatusCode.OK).json({
            data: result,
            message: 'Chỉnh sửa thông tin thành công',
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
    addProducts,
    updateProfileOrder
}
