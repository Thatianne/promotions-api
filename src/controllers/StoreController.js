const Store = require('../models/Store')

const methods = {
    async list (req, res) {
        try {
            const stores = await Store.find()

            res.status(200)
            return res.json(stores)
        } catch(ex) {
            res.status(400)
            return res.json(ex)
        }
	},
	async create (req, res) {
		try {
            const { name, logo, link } = req.body
            let store = await Store.findOne({ name })
            if (!store) {
                store = await Store.create({
                    name,
                    logo,
                    link
                })
            }

			res.status(201)
			return res.json(store)
		} catch (ex) {
			res.status(400)
			return res.json(ex)
		}
	},
	async update (req, res) {
        try {
            const id = req.params.id
            const { name, logo, link } = req.body

            const store = await Store.findByIdAndUpdate(id, {
                name,
                logo,
                link
            })

            res.status(200)
            return res.json(store)
        } catch(ex) {
            res.status(400)
            return res.send(ex)
        }
    },
    async delete (req, res) {
        try {
            const id = req.params.id
            const store = await Store.deleteOne({ _id: id })

            res.status(200)
            return res.send()
        } catch(ex) {
            res.status(400)
            return res.send(ex)
        }
    }
}

module.exports = methods
