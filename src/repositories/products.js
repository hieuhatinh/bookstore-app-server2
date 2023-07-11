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
const getDetailBook = async ({ idSeller, idProduct }) => {
    const book = await ProductModel.findOne({
        $and: [{ seller: idSeller }, { _id: idProduct }],
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
const getAllBooksSeller = async ({ idSeller }) => {
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
 * @route /product/getProductsByType/:type
 */
const getProductsByType = async ({ type, _page }) => {
    _page = parseInt(_page) || 1
    let skip = (_page - 1) * SIZE_LIMIT

    const booksByType = await ProductModel.find({ type: type })
        .skip(skip)
        .limit(SIZE_LIMIT)
        .exec()

    return {
        booksByType,
    }
}

/**
 * @description: người bán đăng bán sách
 * @method post
 * @route /product/all
 */
const bookForSale = async ({
    name,
    price,
    image,
    description,
    author,
    seller,
    type,
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
        image,
        description,
        author,
        seller,
        type,
        reviews,
    })

    return {
        ...newBook._doc,
        ...newBook._id,
    }
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
    deleteBookSale,
    getAllBook,
}
