import mongoose from 'mongoose'

const sellerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    shopName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    avatar: {
        url: {
            type: String,
            required: false,
        },
    },
})

const SellerSchema = mongoose.model('sellers', sellerSchema)

export default SellerSchema
