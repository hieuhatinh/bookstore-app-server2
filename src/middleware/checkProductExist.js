import ProductModel from '../Model/Product.js'
import HttpStatusCode from '../exception/HttpStatusCode.js'

const checkProductExist = async (req, res, next) => {
    const { idProduct } = req.params
    const existProduct = await ProductModel.findOne({ _id: idProduct })

    if (!existProduct) {
        return res.status(HttpStatusCode.NOT_FOUND).json({
            message: 'Không tồn tại sách này',
            statuscode: HttpStatusCode.NOT_FOUND
        })
    }

    next()
}

export default checkProductExist