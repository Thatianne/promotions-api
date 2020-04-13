const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store'},
    price: { type: Number, default: 0 },
    title: String,
    image: String,
    link: String,
    percentage: { type: Number, default: 0 }
})

module.exports = mongoose.model('Product', productSchema)