import HttpStatusCode from '../exception/HttpStatusCode.js'
import { productRepositories } from '../repositories/index.js'

/**
 * @description: lấy tất cả các sách
 * @method get
 * @route /product/all
 */
const getAllBook = async (req, res) => {
    const { _page } = req.query

    try {
        const books = await productRepositories.getAllBook({ _page })

        return res.status(HttpStatusCode.OK).json({
            data: books,
            message: 'Đã lấy xong',
            statusCode: HttpStatusCode.OK,
        })
    } catch (error) {
        return res
            .status(error.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR)
            .json({
                message: error.message || 'Có lỗi xảy ra',
                statusCode: error.statusCode,
            })
    }
}

/**
 * @description: lấy thông tin chi tiết 1 quyển sách
 * @method get
 * @route /product/getDetail/:idProduct
 */
const getDetailBook = async (req, res) => {
    const { idProduct } = req.params

    try {
        const book = await productRepositories.getDetailBook({
            idProduct,
        })

        return res.status(HttpStatusCode.OK).json({
            data: book,
            message: 'Chi tiết sản phẩm',
            statusCode: HttpStatusCode.OK,
        })
    } catch (error) {
        return res
            .status(error.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR)
            .json({
                message: error.message || 'Có lỗi xảy ra',
                statusCode: error.statusCode,
            })
    }
}

/**
 * @description: lấy sách theo thể loại
 * @method get
 * @route /product/getProductsByType/:category
 */
const getProductsByType = async (req, res) => {
    const { category } = req.params
    const { _page } = req.query

    try {
        const result = await productRepositories.getProductsByType({
            category,
            _page,
        })

        return res.status(HttpStatusCode.OK).json({
            data: result,
            message: 'Lấy thành công',
            statusCode: HttpStatusCode.OK,
        })
    } catch (error) {
        return res
            .status(error.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR)
            .json({
                message: error.message || 'Có lỗi xảy ra',
                statusCode: error.statusCode,
            })
    }
}

/**
 * @description: lấy tất cả những quyển sách mà người bán đang bán
 * @method get
 * @route /product/getAllBooksSeller
 */
const getAllBooksSeller = async (req, res) => {
    const idSeller = req.data.id
    const { _page } = req.query

    try {
        const books = await productRepositories.getAllBooksSeller({
            idSeller,
            _page,
        })

        return res.status(HttpStatusCode.OK).json({
            data: {
                sellerInfo: books.sellerInfo,
                books: books.books,
            },
            message: 'Lấy thành công',
            statusCode: HttpStatusCode.OK,
        })
    } catch (error) {
        return res
            .status(error.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR)
            .json({
                message: error.message || 'Có lỗi xảy ra',
                statusCode: error.statusCode,
            })
    }
}

/**
 * @description: tìm kiếm sách theo tên sách, tên tác giả
 * @method get
 * @route /product/search
 */
const searchBook = async (req, res) => {
    const { searchString, _page } = req.query

    try {
        const searchResult = await productRepositories.searchBook({
            searchString,
            _page,
        })

        return res.status(HttpStatusCode.OK).json({
            data: searchResult,
            message: 'Tìm kiếm thành công',
            statusCode: HttpStatusCode.OK,
        })
    } catch (error) {
        return res
            .status(error.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR)
            .json({
                message: error.message || 'Có lỗi xảy ra',
                statusCode: error.statusCode,
            })
    }
}

/**
 * @description: người bán đăng bán sách
 * @method post
 * @route /product/add
 */
const bookForSale = async (req, res) => {
    const { name, price, description, author, category, reviews } = req.body

    const seller = req.data.id
    const images = req.files

    try {
        const book = await productRepositories.bookForSale({
            name,
            price,
            images,
            description,
            author,
            seller,
            category,
            reviews,
        })

        return res.status(HttpStatusCode.OK).json({
            data: book,
            message: 'Đăng bán thành công',
            statusCode: HttpStatusCode.OK,
        })
    } catch (error) {
        return res
            .status(error.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR)
            .json({
                message: error.message || 'Có lỗi xảy ra',
                statusCode: error.statusCode,
            })
    }
}

/**
 * @description: người bán chỉnh sửa thông tin về sách
 * @method patch
 * @route /product/update/:idProduct
 */
const updateProfileProduct = async (req, res) => {
    const { idProduct } = req.params
    const userId = req.data._id
    const { name, price, description, author, seller, category, reviews } =
        req.body
    const images = req.files

    try {
        const resultUpdate = await productRepositories.updateProfileProduct({
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
        })

        return res.status(HttpStatusCode.OK).json({
            data: resultUpdate,
            message: 'update sản phẩm thành công',
            statusCode: HttpStatusCode.OK,
        })
    } catch (error) {
        return res
            .status(error.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR)
            .json({
                message: error.message || 'Có lỗi xảy ra',
                statusCode: error.statusCode,
            })
    }
}

/**
 * @description: xóa sách, ngừng bán sản phẩm
 * @method delete
 * @route /product/deleteBookSale/:idProduct
 */
const deleteBookSale = async (req, res) => {
    const { idProduct } = req.params
    const idSeller = req.data.id

    try {
        const bookDelete = await productRepositories.deleteBookSale({
            idProduct,
            idSeller,
        })

        return res.status(HttpStatusCode.OK).json({
            data: bookDelete,
            message: 'Xóa sản phẩm thành công',
            statusCode: HttpStatusCode.OK,
        })
    } catch (error) {
        return res
            .status(error.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR)
            .json({
                message: error.message || 'Có lỗi xảy ra',
                statusCode: error.statusCode,
            })
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
