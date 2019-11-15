const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const Confectionery = require('../models/Confectionery')
const Address = require('../models/Address')
const Product = require('../models/Product')

const connection = new Sequelize(dbConfig)

Confectionery.init(connection)
Address.init(connection)
Product.init(connection)

Confectionery.associate(connection.models)
Address.associate(connection.models)
Product.associate(connection.models)

module.exports = connection