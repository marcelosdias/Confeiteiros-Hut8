const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const Confectionery = require('../models/Confectionery')
const Password = require('../models/Password')
const Address = require('../models/Address')
const Product = require('../models/Product')
const Unit = require('../models/Unit')
const Tag = require('../models/Tag')

const connection = new Sequelize(dbConfig)

Confectionery.init(connection)
Password.init(connection)
Address.init(connection)
Product.init(connection)
Unit.init(connection)
Tag.init(connection)

Confectionery.associate(connection.models)
Password.associate(connection.models)
Address.associate(connection.models)
Product.associate(connection.models)
Unit.associate(connection.models)
Tag.associate(connection.models)

module.exports = connection
