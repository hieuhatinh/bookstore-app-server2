import CartModel from '../Model/Cart.js'
import ErrorHandler from '../exception/ErrorHandler.js'
import HttpStatusCode from '../exception/HttpStatusCode.js'

/**
 * @description: lấy tất cả sách có trong giỏ hàng của 1 người dùng
 * @method get
 * @route /cart/:idUser
 */
const getAllBooksInCart = async ({ idUser }) => {
    const cartUser = await CartModel.findOne({ user: idUser })

    if (!cartUser) {
        throw new ErrorHandler(
            'Không tồn tại giỏ hàng của user này',
            HttpStatusCode.NOT_FOUND,
        )
    }

    return {
        result: cartUser,
    }
}

/**
 * @description: thêm 1 quyển sách vào giỏ hàng của người dùng
 * @method post
 * @route /cart/addToCart/:idUser/:idProduct
 */
const addToCart = async ({ idProduct, idUser, quantity, price, name }) => {
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
                    price: price,
                    name: name,
                },
            ],
        })

        return { newCart }
    }

    const indexProductItem = cartUser.products.findIndex(
        (product) => product.product == idProduct,
    )

    if (indexProductItem > -1) {
        let productItem = cartUser.products[indexProductItem]
        productItem.quantityProduct = quantity
        productItem.price = price
        cartUser.products[indexProductItem] = productItem

        const result = await cartUser.save()

        return {
            result
        }
    } else {
        const newProducts = await CartModel.updateOne(
            { user: idUser },
            {
                $push: {
                    products: {
                        product: idProduct,
                        quantityProduct: quantity,
                        price,
                        name,
                    },
                },
            },
        )

        return { newProducts }
    }

}

/**
 * @description: xóa 1 sách ra khỏi giỏ hàng của người dùng
 * @method delete
 * @route /cart/deleteOne/:idUser/:idProduct
 */
const deleteToCart = async ({ idUser, idProduct }) => {
    const newProducts = await CartModel.updateOne(
        { user: idUser },
        {
            $pull: {
                products: {
                    product: idProduct,
                },
            },
        },
    )

    return { newProducts }
}

export default {
    getAllBooksInCart,
    addToCart,
    deleteToCart,
}
