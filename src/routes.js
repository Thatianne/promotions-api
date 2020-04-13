const { Router } = require('express')
const StoreController = require('./controllers/StoreController')
const ProductController = require('./controllers/ProductController')

const routes = Router()

routes.get('/stores', StoreController.list)
routes.post('/stores', StoreController.create)
routes.put('/stores/:id', StoreController.update)
routes.get('/stores/:id', StoreController.show)
routes.delete('/stores/:id', StoreController.delete)

routes.get('/products', ProductController.list)
routes.post('/products', ProductController.create)
routes.put('/products/:id', ProductController.update)
routes.get('/products/:id', ProductController.show)
routes.delete('/products/:id', ProductController.delete)

module.exports = routes
