const Product = require('../models/Product')
const Confectionery = require('../models/Confectionery')

module.exports = {
   // LISTAR TODOS OS PRODUTOS DO CONFEITEIRO
    async getProducts(req, res) {
        const { conf_id } = req.params

        const  confectionery_id = await Confectionery.findByPk(conf_id)

        if (!confectionery_id) {
            return res.status(404).json({ error: 'Confetionery not found' })
        }

        Product.findAll({
            where: {
                confectionery_id: conf_id
            }
        }).then(product => {
            return res.send(JSON.stringify(product, null, 4));
        })
    },

    // CRIAR UM PRODUTO
    async store(req, res) {
        const { conf_id } = req.params

        const confectionery = await Confectionery.findByPk(conf_id)

        if (!confectionery) {
            return res.status(404).json({ error: 'Confetionery not found' })
        }

        const product_attributes = req.body

        product_attributes.confectionery_id = Number(conf_id) 

        const product = await Product.create(product_attributes)

        return res.send(product)
    },

    // DELETAR UM PRODUTO
    async delete(req, res) {
        const { prod_id } = req.params
    
        const product_id = await Product.findByPk(prod_id)

        if (!product_id) 
            return res.status(404).json({ error: 'Product not found' }) 

        Product.destroy({
            where: {
                id: prod_id
            }
        })
        return res.send({message: 'Done'})
    },

    // EDITAR O PRODUTO
    async edit(req, res) {
        const { prod_id } = req.params

        const produto_id = await Product.findByPk(prod_id)

        if (!produto_id) 
            return res.status(404).json({ error: 'Product not found' })

        Product.update(
            { name: req.body.name, 
              description: req.body.description,
              price: req.body.price }, 
            {
                where: {
                    id: prod_id
                }
            }
        ).then(() => {
            return res.json({message: 'Done'})
        })
    }
}