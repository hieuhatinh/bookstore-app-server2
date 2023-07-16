import mongoose from 'mongoose'

export const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Không tồn tại người dùng này'],
            ref: 'users',
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: [true, 'Không tồn tại quyển sách này'],
                    ref: 'products',
                },
                quantityProduct: {
                    type: Number,
                    required: true,
                    default: 1,
                },
                price: {
                    type: Number,
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    },
)

const CartModel = mongoose.model('carts', cartSchema)

export default CartModel
