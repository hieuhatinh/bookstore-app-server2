import ProductModel from '../Model/Product.js'

const checkProductExist = async (req, res, next) => {
    const { idProduct } = req.params
    const existProduct = await ProductModel.findOne({ _id: idProduct })

    if (!existProduct) {
        throw new ErrorHandler(
            'Không tồn tại sách này',
            HttpStatusCode.NOT_FOUND,
        )
    }

    next()
}

export default checkProductExist