const Address = require('../models/Address')
const Confectionery = require('../models/Confectionery')

module.exports = {

    async store(req, res) {
        const { conf_id } = req.params

        const {
            zipcode,
            state,
            city,
            neighborhood,
            street,
            number,
            complement
        } = req.body

        const confectionery = await Confectionery.findByPk(conf_id)

        if (!confectionery) {
            return res.status(404).json({ error: 'Confectionery not found' })
        }

        await Address.create({
            zipcode,
            state,
            city,
            neighborhood,
            street,
            number,
            complement,
            confectionery_id: conf_id
        }).then(() => {
            return res.json({ message: 'Address created' })
        }).catch(err => {
            console.log(err)
            return res.status(500).json({ error: 'Create address error' })
        })
},
        
    async getAddresses(req, res) {
        const { conf_id } = req.params

        await Confectionery.findByPk(conf_id, {
            include: {association: 'addresses'}
        }).then( conf => {
            return res.json(conf)
        }).catch(err => {
            console.log(err)
            return res.status(500).json({error: 'Get addresses error'})
        })
},

    async delete(req, res) {
        const { add_id } = req.params

        const address_id = await Address.findByPk(add_id)

        if(!address_id) {
            return res.status(404).json({ error: 'Address not found'})
        }

        await Address.destroy({
            where: {id: add_id}
        }).then( () => {
            return res.json({ message: 'Address deleted' })
        }).catch(err => {
            console.log(err)
            return res.json({ error: 'Address delete error' })
        })
},

    
    async edit(req, res) {
        const { add_id } = req.params

        const {
            zipcode,
            state,
            city,
            neighborhood,
            street,
            number,
            complement
        } = req.body

        const address_id = await Address.findByPk(add_id)

        if(!address_id) {
            return res.status(404).json({ error: 'Address not found'})
        }

        await Address.update({
            zipcode,
            state,
            city,
            neighborhood,
            street,
            number,
            complement
        }, { 
            where: { id: add_id }
        }).then(() => {
            return res.json({ message: 'Address updated' })
        }).catch(err => {
            console.log(err)
            return res.status(500).json({ error: 'Update address error' })
        })
}
}