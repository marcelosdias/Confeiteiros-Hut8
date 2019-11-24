const express = require('express')

const routes = express()

const Confectionery = require('../models/Confectionery')
const Address = require('../models/Address')
const Product = require('../models/Product')
const Tag = require('../models/Tag')
const Unit = require('../models/Unit')

//CRIANDO UMA CONFEITARIA
routes.post('/conf', async (req, res) => {
    const {
        confectionery_name, 
        responsible,
        cpf,
        email,
        phone,
        description,
        password 
    } = req.body

    await Confectionery.create({
        confectionery_name: confectionery_name, 
        responsible: responsible,
        cpf: cpf,
        email: email,
        phone: phone,
        description: description,
        password: password 
    })
    .then((conf) => {
        return res.send(conf)

    })
    .catch((error) => {
        console.log(error)
        return res.json({error: 'Foda'})
    })
})

//CRIANDO UM ENDEREÇO

routes.post('/conf/:conf_id/address', async (req, res) => {
    const { conf_id } = req.params

    const confectionery = await Confectionery.findByPk(conf_id)

    if (!confectionery) {
        return res.status(404).json({ error: 'Confetionery not found' })
    }

    const address_attributes = req.body
    address_attributes.confectionery_id = Number(conf_id)

    const address = await Address.create(address_attributes)

    return res.send(address)
})

//CRIANDO UM PRODUTO

// routes.post('/conf/:conf_id/products', async (req, res) => {
//     const { conf_id } = req.params

//     const confectionery = await Confectionery.findByPk(conf_id)

//     if (!confectionery) {
//         return res.status(404).json({ error: 'Confetionery not found' })
//     }

//     const product_attributes = req.body
//     product_attributes.confectionery_id = Number(conf_id)

//     const product = await Product.create(product_attributes)

//     return res.send(product)
// })

//CRIANDO UMA TAG

routes.post('/tags', async (req, res) => {
    const { tag, type } = req.body

    const tag_created = Tag.create({
        tag,
        type
    })

    return res.json(tag_created)
})

//ASSOCIANDO UMA TAG A UMA CONFEITARIA

routes.post('/conf/:conf_id/tags', async (req, res) => {
    const { conf_id } = req.params

    const { tag } = req.body

    const conf = await Confectionery.findByPk(conf_id)

    const tag_selected = await Tag.findAll({
        where: { tag: tag }
    })

    await conf.addTag(tag_selected)

    return res.json({ funfou: true })
})

//CRIANDO UMA UNIDADE

routes.post('/units', async (req, res) => {
    const { unit } = req.body

    const unit_created = Unit.create({
        unit
    })

    return res.json(unit_created)
})

//ASSOCIANDO UMA UNIDADE A UM PRODUTO

routes.post('/products/:prod_id/units', async (req, res) => {
    const { prod_id } = req.params

    const { unit } = req.body

    const product = await Product.findByPk(prod_id)

    // console.log(product)

    const unit_selected = await Unit.findAll({
        where: { unit: unit }
    })

    await product.addUnit(unit_selected)

    return res.json({ funfou: true })
})

module.exports = routes
