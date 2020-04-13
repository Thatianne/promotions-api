const Product = require('../models/Product')
const { SUCCESS, CREATED, NOT_FOUND } = require('../helpers/statusCode')

const methods = {
    async list (req, res) {
        try {
            const products = await Product.find()
            res.status(SUCCESS)
            return res.json(products)
        } catch ({ message }) {
            next({ message, statusCode: NOT_FOUND })
        }
    },
    async create (req, res) {
        try {
            const { storeId, price, title, image, link, percentage } = req.body

            const product = await Product.findOne({ title })
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
            return res.json(store)
        } catch ({ message }) {
            next({ message, statusCode: NOT_FOUND })
        }
    },
    async update (req, res) {
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

            res.status(SUCCESS)
            return res.json(product)
        } catch ({ message }) {
            next({ message, statusCode: NOT_FOUND })
        }
    },
    async show (req, res) {
        try {
            const id = req.params.id
            const product = await Product.findById(id)

            res.status(SUCCESS)
            return res.json(product)
        } catch ({ message }) {
            next({ message, statusCode: NOT_FOUND })
        }
    },
    async delete (req, res) {
        try {
            const id = req.params.id

            await Product.findByIdAndDelete(id)

            res.status(SUCCESS)
            return res.json()
        } catch ({ message }) {
            next({ message, statusCode: NOT_FOUND })
        }
    }
}

module.exports = methods