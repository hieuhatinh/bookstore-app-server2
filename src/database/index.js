import mongoose from 'mongoose'
import ErrorHandler from '../exception/ErrorHandler.js'
import { print, OutputType } from '../helpers/print.js'

async function connectDB() {
    try {
        let connection = await mongoose.connect(process.env.MONGODB_URI)
        print('Kết nối database thành công', OutputType.SUCCESS)

        return connection
    } catch (error) {
        throw new ErrorHandler('Không thể kết nối được với database', 500)
    }
}

export default connectDB
