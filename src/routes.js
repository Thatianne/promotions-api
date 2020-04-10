const { Router } = require('express')
const StoreController = require('./controllers/StoreController')

const routes = Router()

routes.get('/stores', StoreController.list)
routes.post('/stores', StoreController.create)
routes.put('/stores/:id', StoreController.update)
routes.delete('/stores/:id', StoreController.delete)

module.exports = routes
