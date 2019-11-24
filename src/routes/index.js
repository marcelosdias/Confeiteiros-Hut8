const express = require('express')

const routes = express()


routes.use(require('./addressRoutes'))
routes.use(require('./productRoutes'))
//routes.use(require('./confectioneryRoutes'))
routes.use(require('./routes'))

module.exports = routes   
