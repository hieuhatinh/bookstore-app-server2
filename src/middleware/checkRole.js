import HttpStatusCode from "../exception/HttpStatusCode.js"

function checkRole(req, res, next) {
    if (req.data.role === 'seller') {
        next()
    } else {
        return res.status().json({
            message: 'Bạn không phải người bán',
            statusCode: HttpStatusCode.NOT_FOUND
        })
    }
}

export default checkRole