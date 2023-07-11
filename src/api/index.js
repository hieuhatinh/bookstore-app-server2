import router from './routes/index.js'

function api(app) {
    app.use('/api/v1', router)
}

export default api
