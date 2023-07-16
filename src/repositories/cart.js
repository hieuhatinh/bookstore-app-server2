import CartModel from '../Model/Cart.js'
import ProductModel from '../Model/Product.js'
import UserModel from '../Model/User.js'
import ErrorHandler from '../exception/ErrorHandler.js'
import HttpStatusCode from '../exception/HttpStatusCode.js'

const getAllBooksInCart = async () => { }

const addToCart = async ({ idProduct, idUser, quantity, price, name }) => {
    const existUser = await UserModel.findOne({ _id: idUser })

    if (!existUser) {
        throw new ErrorHandler('User không tồn tại', HttpStatusCode.NOT_FOUND)
    }
    const cartUser = await CartModel.findOne({
        user: idUser
    })

    if (cartUser) {
        const existProduct = await ProductModel.findOne({ _id: idProduct })

        if (!existProduct) {
            throw new ErrorHandler('Không tồn tại sách này', HttpStatusCode.NOT_FOUND)
        }

        const indexProductItem = cartUser.products.findIndex(product => product.product == idProduct)

        if (indexProductItem > -1) {
            let productItem = cartUser.products[indexProductItem]
            productItem.quantityProduct = quantity
            productItem.price = price
            cartUser.products[indexProductItem] = productItem
        } else {
            cartUser.products.push({
                product: idProduct,
                quantityProduct: quantity,
                price,
                name
            })
        }

        const result = await cartUser.save()

        return {
            result
        }
    } else {
        const newCart = await CartModel.create({
            user: idUser,
            products: [{
                product: idProduct,
                quantityProduct: quantity,
                price: price,
                name: name
            }]
        })

        return { newCart }
    }
}

export default {
    getAllBooksInCart,
    addToCart,
}
