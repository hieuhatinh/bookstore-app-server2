import mongoose from 'mongoose'

import { cartSchema } from './Cart.js'

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'users',
        },
        orderProducts: [cartSchema],
        shippingInfo: {
            address: {
                type: String,
                required: true,
            },
            phoneNumber: {
                type: String,
                length: 10,
                required: [true, 'Số điện thoại cần 10 số'],
            },
        },
        orderStatus: {
            type: String,
            required: true,
            enum: [
                'Đã đặt hàng',
                'Chờ vận chuyển',
                'Đang vận chuyển',
                'Đã nhận hàng',
            ],
            default: 'Đã đặt hàng',
        },
        payment: {
            type: String,
            required: true,
            enum: ['Tiền mặt', 'Ví điện tử', 'Tài khoản ngân hàng'],
            default: 'Tiền mặt',
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
        deliveredAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    },
)

const OrderModel = mongoose.model('orders', orderSchema)

export default OrderModel
