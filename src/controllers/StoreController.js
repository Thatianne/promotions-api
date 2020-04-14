const Store = require('../models/Store')
const { SUCCESS, CREATED, NOT_FOUND } = require('../helpers/statusCode')
const NotFound = require('../errors/NotFound')

const methods = {
    async list (req, res, next) {
        try {
            let { sortBy = 'createdAt', search, limit, offset, descending = false } = req.query

            limit = limit > 30 ? 30 : limit
            const stores = await Store.find(
                { name: { $regex: search ? `.*${search}.*` : '.*', $options: 'i'} },
                null,
                {
                    skip: parseInt(offset),
                    limit: parseInt(limit),
                    sort: {
                        [sortBy]: descending ? -1 : 1
                    }
                }
            )

            res.status(SUCCESS)
            return res.json(stores)
        } catch({ message }) {
            next({ message, statusCode: NOT_FOUND })
        }
	},
	async create (req, res, next) {
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
	async update (req, res, next) {
        try {
            const id = req.params.id
            const { name, logo, link } = req.body

            const store = await Store.findByIdAndUpdate(id, {
                name,
                logo,
                link
            })
            if (!store) {
                throw new NotFound("This store doesn't exists")
            }

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
            if (!store) {
                throw new NotFound("This store doesn't exists")
            }

            res.status(SUCCESS)
            return res.json(store)
        } catch ({ message }) {
            next({ message, statusCode: NOT_FOUND })
        }
    },
    async delete (req, res, next) {
        try {
            const id = req.params.id
            await Store.deleteOne({ _id: id })

            res.status(SUCCESS)
            res.send()
        } catch( { message }) {
            next({ message, statusCode: NOT_FOUND })
        }
    }
}

module.exports = methods
