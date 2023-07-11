import mongoose from 'mongoose'

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
        image: {
            type: String,
            required: [true, 'Không được để trống ảnh sách'],
        },
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
        type: [
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
