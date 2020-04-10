const mongoose = require('mongoose')

const storeSchema = new mongoose.Schema({
	name: String,
	logo: String,
	link: String
})

module.exports = mongoose.model('Store', storeSchema)
