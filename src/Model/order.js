import mongoose from 'mongoose'

import { cartSchema } from './cart.js'

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    shippingInfo: {
        address: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
    },
    orderProducts: [cartSchema],
    orderStatus: {
        type: String,
        required: true,
        enum: ['Đã đặt hàng', 'Chờ vận chuyển', 'Đã nhận hàng'],
    },
    payment: {
        type: String,
        required: true,
        enum: ['Tiền mặt', 'Ví điện tử', 'Tài khoản ngân hàng'],
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    paidAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    deliveredAt: {
        type: Date,
    },
})

const OrderModel = mongoose.model('orders', orderSchema)

export default OrderModel
