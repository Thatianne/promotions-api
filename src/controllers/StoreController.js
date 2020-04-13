const Store = require('../models/Store')
const { SUCCESS, CREATED, NOT_FOUND } = require('../helpers/statusCode')

const methods = {
    async list (req, res) {
        try {
            const stores = await Store.find()

            res.status(SUCCESS)
            return res.json(stores)
        } catch(error) {
            next({
                message: error.message,
                statusCode: NOT_FOUND
            })
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

			res.status(CREATED)
			return res.json(store)
		} catch ({ message }) {
			next({ message,  statusCode: NOT_FOUND })
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

            res.status(SUCCESS)
            return res.json(store)
        } catch({ message }) {
            next({ message, statusCode: NOT_FOUND })
        }
    },
    async show (req, res, next) {
        try {
            const id = req.params.id
            const store = await Store.findById(id)

            res.status(SUCCESS)
            return res.json(store)
        } catch ({ message }) {
            next({ message, statusCode: NOT_FOUND })
        }
    },
    async delete (req, res) {
        try {
            const id = req.params.id
            const store = await Store.deleteOne({ _id: id })

            res.status(SUCCESS)
            return res.json()
        } catch( { message }) {
            next({ message, statusCode: NOT_FOUND })
        }
    }
}

module.exports = methods
