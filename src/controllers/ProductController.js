const Product = require('../models/Product')
const { SUCCESS, CREATED, NOT_FOUND } = require('../helpers/statusCode')
const NotFound = require('../errors/NotFound')

const methods = {
    async list (req, res, next) {
        try {
            let { sortBy = 'createdAt', search, limit, offset, descending = false } = req.query

            limit = limit > 30 ? 30 : limit
            const products = await Product.find(
                { title: { $regex: search ? `.*${search}.*` : '.*', $options: 'i'} },
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
            return res.json(products)
        } catch ({ message }) {
            next({ message, statusCode: NOT_FOUND })
        }
    },
    async create (req, res, next) {
        try {
            const { storeId, price, title, image, link, percentage } = req.body

            let product = await Product.findOne({ title })
            if (!product) {
                product = await Product.create({
                    storeId,
                    price,
                    title,
                    image,
                    link,
                    percentage
                })
            }

            res.status(CREATED)
            return res.json(product)
        } catch ({ message }) {
            next({ message, statusCode: NOT_FOUND })
        }
    },
    async update (req, res, next) {
        try {
            const id = req.params.id
            const { price, title, image, link, percentage } = req.body

            const product = await Product.findByIdAndUpdate(id, {
                price,
                title,
                image,
                link,
                percentage
            })

            if (!product) {
                throw new NotFound("This product doesn't exists")
            }

            res.status(SUCCESS)
            return res.json(product)
        } catch ({ message }) {
            next({ message, statusCode: NOT_FOUND })
        }
    },
    async show (req, res, next) {
        try {
            const id = req.params.id
            const product = await Product.findById(id)

            if (!product) {
                throw new NotFound("This product doesn't exists")
            }

            res.status(SUCCESS)
            return res.json(product)
        } catch ({ message }) {
            next({ message, statusCode: NOT_FOUND })
        }
    },
    async delete (req, res, next) {
        try {
            const id = req.params.id

            await Product.findByIdAndDelete(id)

            res.status(SUCCESS)
            return res.send()
        } catch ({ message }) {
            next({ message, statusCode: NOT_FOUND })
        }
    }
}

module.exports = methods