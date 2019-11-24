const Unit = require('../models/Unit')
const Product = require('../models/Product')
const Confectionery = require('../models/Confectionery')

module.exports = {
    
   // LISTAR TODOS OS PRODUTOS DO CONFEITEIRO
    async getProducts(req, res) {
        const { conf_id} = req.params

        await Product.findAll({
            where: {
                confectionery_id: conf_id
            },
            include: [
                {
                    model: Unit,
                    as: 'units',
                    through: { attributes: [] }
                }
            ]
        })
        .then((prod) => {
            res.json(prod)
        })
        .catch(() => {
            res.json({error: 'Confectionery not found'})
        })
    },

    // CRIAR UM PRODUTO
    async store(req, res) {
        const { conf_id } = req.params

        const {
             name,
             description,
             price,
             unit
         } = req.body

         await Product.create({ 
             name: name, 
             description: description, 
             price: price, 
             confectionery_id: conf_id 
         })

         .then(async(prod) => {
            const product = await Product.findByPk(prod.id)

            const unit_selected = await Unit.findAll({
                where: { unit: unit }
            })
        
            await product.addUnit(unit_selected)
        
            return res.json({ message: 'Product created' })
         })
         .catch(() =>{
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
            price,
            unit
        } = req.body

        await Product.update({
            name,
            description,
            price,
        }, {
            where: { 
                id: prod_id
            }

        }).then(async() => {
            const product = await Product.findByPk(prod_id)

            const unit_selected = await Unit.findAll({
                where: { unit: unit }
            })
            await product.addUnit(unit_selected)

            return res.json({ message: 'Product updated' })

        }).catch(()=> {
            return res.status(500).json({ error: 'Update product error' })
        })
    }
}