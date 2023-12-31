import OrderModel from '../Model/Order.js'
import ErrorHandler from '../exception/ErrorHandler.js'
import HttpStatusCode from '../exception/HttpStatusCode.js'

/**
 * @description: thêm sách vào hóa đơn
 * @method post
 * @route /order/add
 */
const addProducts = async ({
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
}) => {
    const order = await OrderModel.create({
        user: idUser,
        orderProducts: {
            user: idUser,
            products: products.map((item) => ({
                product: item.idProduct,
                quantityProduct: item.quantity,
                price: item.price,
                name: item.name,
            })),
        },
        shippingInfo: {
            address,
            phoneNumber,
        },
        orderStatus,
        payment,
        shippingPrice,
        itemsPrice,
        totalPrice,
        paidAt,
        deliveredAt,
    })

    return { order }
}

/**
 * @description: update thông tin của người dùng (sđt, địa chỉ giao hàng)
 * @method patch
 * @route /order/update
 */
const updateProfileOrder = async ({ idUser, address, phoneNumber }) => {
    const existOrder = await OrderModel.findOne({ user: idUser })

    if (!existOrder) {
        throw new ErrorHandler(
            'Không tồn tại hóa đơn của khách hàng',
            HttpStatusCode.NOT_FOUND,
        )
    }

    const resultUpdate = await OrderModel.updateMany(
        { user: idUser },
        {
            shippingInfo: {
                address,
                phoneNumber,
            },
        },
    )

    return { resultUpdate }
}

export default {
    addProducts,
    updateProfileOrder,
}
