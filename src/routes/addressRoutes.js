const express = require('express')

const routes = express()

const addressController = require('../controllers/addressController')

routes.post('/conf/:conf_id/addresses', addressController.store)
routes.get('/conf/:conf_id/addresses', addressController.getAddresses)
routes.delete('/conf/addresses/:add_id', addressController.delete)
routes.put('/conf/addresses/:add_id', addressController.edit) 

module.exports = routes