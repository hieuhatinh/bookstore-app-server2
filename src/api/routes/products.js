import express from 'express'
import { productController } from '../../controllers/index.js'
import {
    checkRole,
    checkUserLogin,
    uploadCloud,
} from '../../middleware/index.js'

const routerProduct = express.Router()

/**
 * @description: lấy tất cả các sách
 * @method get
 * @route /product/all
 */
routerProduct.get('/all', productController.getAllBook)

/**
 * @description: lấy thông tin chi tiết 1 quyển sách
 * @method get
 * @route /product/getDetail/:idProduct
 */
routerProduct.get('/getDetail/:idProduct', productController.getDetailBook)

/**
 * @description: lấy sách theo thể loại
 * @method get
 * @route /product/getProductsByType/:category
 */
routerProduct.get(
    '/getProductsByType/:category',
    productController.getProductsByType,
)

/**
 * @description: lấy tất cả những quyển sách mà người bán đang bán
 * @method get
 * @route /product/getAllBooksSeller
 */
routerProduct.get(
    '/getAllBooksSeller',
    checkUserLogin,
    checkRole,
    productController.getAllBooksSeller,
)

/**
 * @description: tìm kiếm sách theo tên sách, tên tác giả
 * @method get
 * @route /product/search
 */
routerProduct.post('/search', productController.searchBook)

/**
 * @description: người bán đăng bán sách
 * @method post
 * @route /product/add
 */
routerProduct.post(
    '/add',
    checkUserLogin,
    checkRole,
    uploadCloud.array('files'),
    productController.bookForSale,
)

/**
 * @description: người bán chỉnh sửa thông tin về sách
 * @method patch
 * @route /product/update/:idProduct
 */
routerProduct.patch(
    '/update/:idProduct',
    checkUserLogin,
    checkRole,
    uploadCloud.array('files'),
    productController.updateProfileProduct,
)

/**
 * @description: xóa sách, ngừng bán sản phẩm
 * @method delete
 * @route /product/deleteBookSale/:idProduct
 */
routerProduct.delete(
    '/deleteBookSale/:idProduct',
    checkUserLogin,
    checkRole,
    productController.deleteBookSale,
)

export default routerProduct
