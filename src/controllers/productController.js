const Product = require('../models/Product')
const Confectionery = require('../models/Confectionery')

module.exports = {
    
   // LISTAR TODOS OS PRODUTOS DO CONFEITEIRO
    async getProducts(req, res) {
       const { conf_id } = req.params
        
        await Confectionery.findByPk(conf_id, {
            include: {
                association: 'products'
            } 

        }).then(Conf => {
            if (Conf) 
                return res.json(Conf.products)
        
            else 
                return res.status(404).json({ error: 'Confectionery not found' })

        }).catch(() => {
            return res.status(500).json({ error: 'Confectionery get error' })
        })
    },

    // CRIAR UM PRODUTO
    async store(req, res) {
        const { conf_id } = req.params

        const {
            name,
            description,
            price
        } = req.body

        await Product.create({ 
            name: name, 
            description: description, 
            price: price, 
            confectionery_id: conf_id 

        }).then(() => {
             return res.json({ message: 'Product created' })

        }).catch(() => {
            return res.status(500).json({ error: 'Create product error' })
        })
    },

    // DELETAR UM PRODUTO
    async delete(req, res) {
        const { prod_id } = req.params

        await Product.destroy({
            where: {
                id: prod_id
            }

        }).then(() => {
            return res.json({message: 'Product deleted'})

        }).catch(() => {
            return res.json({ error: 'Delete product error' })
        })
    },

    // EDITAR O PRODUTO (ok)
    async edit(req, res) {
        const { prod_id } = req.params

        const {
            name,
            description,
            price
        } = req.body

        await Product.update({
            name,
            description,
            price
        }, {
            where: { 
                id: prod_id
            }

        }).then(() => {
            return res.json({ message: 'Product updated' })

        }).catch(err => {
            return res.status(500).json({ error: 'Update confectionery error' })
        })
    }
}