/**
 * Required External Modules
 */
import express from 'express'
import * as dotenv from 'dotenv'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import api from './api/index.js'
import connectDB from './database/index.js'

dotenv.config()

/**
 * App Variables
 */
const PORT = process.env.PORT

if (!PORT) {
    process.exit(1)
}

const app = express()

/**
 *  App Configuration
 */
app.use(morgan('combined'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// database
connectDB()

// routes
api(app)

/**
 * Server Activation
 */

app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
})

// chỉnh sửa thông tin người dùng
// chỉnh sửa thông tin product
// tìm kiếm product

// cart người dùng
// lấy ra tất cả sản phẩm đã được thêm vào giỏ hàngs
// thêm product vào giỏ hàng
// xóa product khỏi giỏ hàng
// chỉnh sửa số lượng mua sảm phẩm của người dùng

// order
// thêm sản phẩm vào hóa đơn
// xóa sản phẩm khỏi hóa đơn
// chỉnh sửa thông tin số điện thoại của người dùng
