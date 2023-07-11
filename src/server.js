/**
 * Required External Modules
 */
import express from 'express'
import * as dotenv from 'dotenv'
import morgan from 'morgan'
import bodyParser from 'body-parser'

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

// routes
// routes(app)

/**
 * Server Activation
 */

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
})
