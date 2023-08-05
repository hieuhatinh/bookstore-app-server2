/**
 * Required External Modules
 */
import express from 'express'
import * as dotenv from 'dotenv'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import passport from 'passport'
import cors from 'cors'

import api from './api/index.js'
import connectDB from './database/index.js'
import passportStragety from './passport/Google.js'

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

// cors
app.use(cors({ origin: process.env.URL_CLIENT }))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// database
connectDB()

// passport
passportStragety(passport)

// routes
api(app)

/**
 * Server Activation
 */

app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
})

// đăng nhập bằng google, facebook
