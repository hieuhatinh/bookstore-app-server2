import ProductModel from '../Model/Product.js'
import UserModel from '../Model/User.js'
import { SIZE_LIMIT } from '../constants/index.js'
import ErrorHandler from '../exception/ErrorHandler.js'
import HttpStatusCode from '../exception/HttpStatusCode.js'

/**
 * @description: lấy tất cả các sách
 * @method get
 * @route /product/all
 */
const getAllBook = async ({ _page }) => {
    _page = parseInt(_page) || 1
    let skip = (_page - 1) * SIZE_LIMIT
    const books = await ProductModel.find().skip(skip).limit(SIZE_LIMIT)

    return { books }
}

/**
 * @description: lấy thông tin chi tiết 1 quyển sách
 * @method get
 * @route /product/getDetail/:idSeller/:idProduct
 */
const getDetailBook = async ({ idProduct }) => {
    const book = await ProductModel.findOne({
        _id: idProduct,
    }).exec()

    if (!book) {
        throw new ErrorHandler('Không tìm thấy sách', HttpStatusCode.NOT_FOUND)
    }

    return { book }
}

/**
 * @description: lấy tất cả những quyển sách mà người bán đang bán
 * @method get
 * @route /product/getAllBooksSeller/:idSeller
 */
const getAllBooksSeller = async ({ idSeller, _page }) => {
    _page = parseInt(_page) || 1
    let skip = (_page - 1) * SIZE_LIMIT

    const sellerInfo = await UserModel.findOne({ _id: idSeller }).exec()
    const books = await ProductModel.find({ seller: idSeller })
        .skip(skip)
        .limit(SIZE_LIMIT)
        .exec()

    if (!sellerInfo) {
        throw new ErrorHandler(
            'Không tồn tại người bán này',
            HttpStatusCode.NOT_FOUND,
        )
    }

    return {
        sellerInfo,
        books,
    }
}

/**
 * @description: lấy sách theo thể loại
 * @method get
 * @route /product/getProductsByType/:category
 */
const getProductsByType = async ({ category, _page }) => {
    _page = parseInt(_page) || 1
    let skip = (_page - 1) * SIZE_LIMIT

    const booksByType = await ProductModel.find({ category: category })
        .skip(skip)
        .limit(SIZE_LIMIT)
        .exec()

    return {
        booksByType,
    }
}

/**
 * @description: tìm kiếm sách theo tên sách, tên tác giả
 * @method get
 * @route /product/search
 */
const searchBook = async ({ searchString, _page }) => {
    _page = parseInt(_page) || 1
    let skip = (_page - 1) * SIZE_LIMIT

    const result = await ProductModel.aggregate([
        {
            $match: {
                $or: [
                    {
                        name: {
                            $regex: `.*${searchString}.*`,
                            $options: 'i', // ignore case
                        },
                    },
                    {
                        author: {
                            $regex: `.*${searchString}.*`,
                            $options: 'i', // ignore case
                        },
                    },
                ],
            },
        },
    ])
        .skip(skip)
        .limit(SIZE_LIMIT)

    return result
}

/**
 * @description: người bán đăng bán sách
 * @method post
 * @route /product/add
 */
const bookForSale = async ({
    name,
    price,
    images,
    description,
    author,
    seller,
    category,
    reviews,
}) => {
    const existBook = await ProductModel.find({
        $and: [{ name: name }, { auhtor: author }, { seller: seller }],
    })

    if (existBook.length > 0) {
        throw new ErrorHandler('Sách đã tồn tại', 409)
    }

    const newBook = await ProductModel.create({
        name,
        price,
        images,
        description,
        author,
        seller,
        category,
        reviews,
    })

    return {
        ...newBook._doc,
        ...newBook._id,
    }
}

/**
 * @description: người bán chỉnh sửa thông tin về sách
 * @method patch
 * @route /product/update/:idProduct
 */
const updateProfileProduct = async ({
    idProduct,
    userId,
    name,
    price,
    images,
    description,
    author,
    seller,
    category,
    reviews,
}) => {
    const product = await ProductModel.updateMany(
        {
            $and: [{ seller: userId }, { _id: idProduct }],
        },
        {
            name,
            price,
            images,
            description,
            author,
            seller,
            category,
            reviews,
        },
    )

    return { product }
}

/**
 * @description: xóa sách, ngừng bán sản phẩm
 * @method delete
 * @route /product/deleteBookSale/:idSeller/:idProduct
 */
const deleteBookSale = async ({ idSeller, idProduct }) => {
    const book = await ProductModel.find({
        $and: [{ seller: idSeller }, { _id: idProduct }],
    })

    if (!book) {
        throw new ErrorHandler(
            'Không tồn tại sách trong hệ thống',
            HttpStatusCode.NOT_FOUND,
        )
    }

    const bookDelete = await ProductModel.deleteOne({
        $and: [{ seller: idSeller }, { _id: idProduct }],
    })

    return {
        ...bookDelete._doc,
    }
}

export default {
    getDetailBook,
    bookForSale,
    getAllBooksSeller,
    getProductsByType,
    searchBook,
    updateProfileProduct,
    deleteBookSale,
    getAllBook,
}
