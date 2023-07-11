import mongoose from 'mongoose'

export const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'products',
            },
            quantityProduct: {
                type: Number,
                required: true,
                default: 1,
            },
        },
    ],
})

const CartModel = mongoose.model('carts', cartSchema)

export default CartModel
