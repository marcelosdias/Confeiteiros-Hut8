const express = require('express')
const Confectionery = require('../models/Confectionery')

const routes = express()

const ProductController = require('../controllers/productController')

routes.get('/', (req, res) => {
    Confectionery.findAll({});
})

routes.get('/conf/:conf_id/products', ProductController.getProducts)
routes.post('/conf/:conf_id/products', ProductController.store)
routes.delete('/conf/products/:prod_id', ProductController.delete)
routes.put('/conf/products/:prod_id/', ProductController.edit) 

module.exports = routes