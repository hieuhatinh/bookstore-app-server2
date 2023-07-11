import { print, OutputType } from '../helpers/print.js'

class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
        print(message, OutputType.ERROR)
    }
}

export default ErrorHandler
