const express = require('express')

const routes = express()

const ProductController = require('../controllers/productController')

routes.get('/conf/:conf_id/products', ProductController.getProducts)
routes.post('/conf/:conf_id/store', ProductController.store)
routes.delete('/conf/:conf_id/del_product/:prod_id', ProductController.delete)
routes.put('/conf/:conf_id/:prod_id/edit', ProductController.edit) 

module.exports = routes