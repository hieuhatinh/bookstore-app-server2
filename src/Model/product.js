import mongoose from 'mongoose'

export const imgSchema = new mongoose.Schema({
    fieldname: {
        type: String,
    },
    originalname: {
        type: Buffer,
    },
    encoding: {
        type: String,
    },
    mimetype: {
        type: String,
    },
    path: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
    },
    filename: {
        type: String,
    },
})

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Tên sách không được để trống'],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, 'Giá sách không được để trống'],
            default: 0.0,
        },
        images: [imgSchema],
        description: {
            type: String,
            required: false,
            default: '',
        },
        author: {
            type: String,
            required: [true, 'Tên tác giả không được để trống'],
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'users',
        },
        category: [
            {
                type: String,
                required: [true, 'Thể loại sách không được bỏ trống'],
                enum: {
                    values: [
                        'economy',
                        'domestic_literature',
                        'foreign_literature',
                        'educational_psychology',
                        'philosophy',
                        'religion',
                        'comic',
                        'history_geography',
                        'science',
                    ],
                    message: 'Chọn đúng thể loại sách',
                },
            },
        ],
        reviews: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'users',
                },
                rating: {
                    type: Number,
                    required: true,
                    default: 5,
                },
                comment: {
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

const ProductModel = mongoose.model('products', productSchema)

export default ProductModel
