const express = require('express')
const bodyParser = require('body-parser')

require('dotenv').config()
require('./database/index')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(require('./routes'))

app.listen(process.env.PORT || 3000)