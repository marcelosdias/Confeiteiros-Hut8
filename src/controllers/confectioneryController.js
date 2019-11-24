//const bcrypt = require('bcrypt')

const Confectionery = require('../models/Confectionery')
const Tag = require('../models/Tag')
const Password = require('../models/Password')

module.exports = {
    
     async store(req, res) {
    //     const {
    //         confectionery_name, 
    //         responsible,
    //         cpf,
    //         email,
    //         phone,
    //         description,
    //         password 
    //     } = req.body
        
    //     await Confectionery.create({
    //         confectionery_name, 
    //         responsible,
    //         cpf,
    //         email,
    //         phone,
    //         description
    //     }).then(async conf => {
    //         const hash = await bcrypt.hashSync(password, 10)
    //         await Password.create({
    //             password: hash,
    //             confectionery_id: conf.id
    //         }).then(() => {
    //             return res.json({ message: 'Confectionery created' })
    //         }).catch(err => {
    //             console.log(err)
    //             return res.status(500).json({ error: 'Create password error' })
    //         })   
    //     }).catch(err => {
    //         console.log(err)
    //         return res.status(500).json({ error: 'Create confectionery error' })
    //     })
     },

    async getById(req, res) {
        const { conf_id } = req.params
        
        await Confectionery.findByPk(conf_id)
        .then(conf => {
            if (conf) {
                return res.json(conf)
            } else {
                return res.status(404).json({ error: 'Confectionery not found' })
            }
        }).catch(err => {
            console.log(err)
            return res.status(500).json({ error: 'Confectionery get error' })
        })
    },

     async edit(req, res) {
    //     const { conf_id } = req.params
        
    //     const {
    //         confectionery_name, 
    //         responsible,
    //         cpf,
    //         email,
    //         phone,
    //         description,
    //         password 
    //     } = req.body

    //     if (password) {
    //         const hash = await bcrypt.hashSync(password, 10)
    //         await Password.update({
    //             password: hash
    //         }, {
    //             where: { confectionery_id: conf_id }
    //         }).catch(err => {
    //             console.log(err)
    //             return res.status(500).json({ error: 'Update password error' })
    //         })
    //     }

    //     await Confectionery.update({
    //         confectionery_name, 
    //         responsible,
    //         cpf,
    //         email,
    //         phone,
    //         description
    //     }, { 
    //         where: { id: conf_id }
    //     }).then(() => {
    //         return res.json({ message: 'Confectionery updated' })
    //     }).catch(err => {
    //         console.log(err)
    //         return res.status(500).json({ error: 'Update confectionery error' })
    //     })        
     },

    async delete(req, res) {
        const { conf_id } = req.params

        await Confectionery.destroy({
            where: {id: conf_id}
        }).then(deleted => {
            return res.json({ message: `Success: ${deleted} records deleted` })
        }).catch(err => {
            console.log(err)
            return res.json({ error: 'Confectionery delete error' })
        })
    },

    async getAll(req, res) {
        await Confectionery.findAll()
        .then(confs => {
            return res.json(confs)
        }).catch(err => {
            console.log(err)
            return res.status(500).json({ error: 'Get confectioneries error' })
        })
    },

    async getAllByCity(req, res) {
        const { city } = req.params

        await Confectionery.findAll({
            include: {
                association: 'addresses',
                where: {
                    city
                }
            }
        }).then(confs => {
            return res.json(confs)
        }).catch(err => {
            console.log(err)
            return res.status(500).json({ error: 'Get confectioneries error' })
        })
    },

    async getTags(req, res) {
        const { conf_id } = req.params

        await Confectionery.findByPk(conf_id, {
            include: {
                association: 'tags'
            }
        }).then(conf => {
            return res.json({ conf })
        }).catch(err => {
            console.log(err)
            return res.status(500).json({ error: 'Get tags error' })
        })
    },

    async setTag(req, res) {
        const { conf_id } = req.params

        const conf = await Confectionery.findByPk(conf_id)
        
        if (!conf) {
            return res.status(404).json({ error: 'Confectionery not found' })
        }

        const { tag } = req.body

        const tag_selected = await Tag.findAll({
            where: {
                tag
            }
        })

        if (!tag_selected) {
            return res.status(404).json({ error: 'Tag not found' })
        }

        await conf.addTag(tag_selected).then(() => {
            return res.json({ message: 'Tag associated' })
        }).catch(err => {
            console.log(err)
            return res.status(500).json({ error: 'Tag association error' })
        })        
    }
}
