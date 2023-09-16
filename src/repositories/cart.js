import CartModel from '../Model/Cart.js'
import ErrorHandler from '../exception/ErrorHandler.js'
import HttpStatusCode from '../exception/HttpStatusCode.js'

/**
 * @description: lấy tất cả sách có trong giỏ hàng của 1 người dùng
 * @method get
 * @route /cart/getAllInCarts
 */
const getAllBooksInCart = async ({ idUser }) => {
    const cartUser = await CartModel.findOne({ user: idUser }).populate(
        'products.product',
        'name images price',
    )

    if (!cartUser) {
        throw new ErrorHandler(
            'Không tồn tại giỏ hàng của user này',
            HttpStatusCode.NOT_FOUND,
        )
    }

    return cartUser
}

/**
 * @description: thêm 1 quyển sách vào giỏ hàng của người dùng
 * @method post
 * @route /cart/addToCart/:idProduct
 */
const addToCart = async ({ idProduct, idUser, quantity }) => {
    const cartUser = await CartModel.findOne({
        user: idUser,
    })

    if (!cartUser) {
        const newCart = await CartModel.create({
            user: idUser,
            products: [
                {
                    product: idProduct,
                    quantityProduct: quantity,
                },
            ],
        })

        return newCart
    }

    const indexProductItem = cartUser.products.findIndex(
        (product) => product.product == idProduct,
    )

    if (indexProductItem > -1) {
        const newProducts = await CartModel.updateOne(
            { user: idUser, 'products.product': idProduct },
            {
                $inc: {
                    'products.$.quantityProduct': quantity,
                },
            },
        )

        return newProducts
    } else {
        // return result
        const newProducts = await CartModel.updateOne(
            { user: idUser },
            {
                $push: {
                    products: {
                        product: idProduct,
                        quantityProduct: quantity,
                    },
                },
            },
        )

        return newProducts
    }
}

/**
 * @description: xóa 1 sách ra khỏi giỏ hàng của người dùng
 * @method delete
 * @route /cart/deleteOne/:idProduct
 */
const deleteToCart = async ({ idUser, idProduct }) => {
    const newProducts = await CartModel.updateOne(
        { user: idUser, 'products.product': idProduct },
        {
            $pull: {
                products: {
                    product: idProduct,
                },
            },
        },
    )

    return newProducts
}

/**
 * @description: thay đổi số lượng của 1 sản phẩm
 * @method patch
 * @route /cart/updateOne/:idProduct
 */
const updateQuantitiesProduct = async ({ idUser, idProduct, quantity }) => {
    const result = await CartModel.updateOne(
        { user: idUser, 'products.product': idProduct },
        {
            $set: {
                'products.$.quantityProduct': quantity,
            },
        },
    )

    return result
}

export default {
    getAllBooksInCart,
    addToCart,
    deleteToCart,
    updateQuantitiesProduct,
}
