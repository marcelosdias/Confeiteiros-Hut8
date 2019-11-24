
const express = require('express')

const confectioneryController = require('../controllers/confectioneryController')

const routes = express()

//routes.post('/conf', confectioneryController.store) //CRIAR
routes.get('/conf/all', confectioneryController.getAll) // BUSCAR TODOS
routes.get('/conf/all/:city', confectioneryController.getAllByCity) // BUSCAR TODOS POR CIDADE
routes.get('/conf/:conf_id', confectioneryController.getById) // BUSCAR POR ID
routes.put('/conf/:conf_id', confectioneryController.edit) // EDITAR
routes.delete('/conf/:conf_id', confectioneryController.delete) // DELETAR

routes.post('/conf/:conf_id/tags', confectioneryController.setTag) // ASSOCIAR TAG DE UMA CONFEITARIA
routes.get('/conf/:conf_id/tags', confectioneryController.getTags) // BUSCAR TAGS DAS CONFEITARIAS

module.exports = routes
