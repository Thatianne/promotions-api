const mongoose = require('mongoose')

const storeSchema = new mongoose.Schema({
	name: String,
	logo: String,
	link: String
}, {
	timestamps: {
		createdAt: 'createdAt',
		updatedAt: 'updatedAt'
	}
})

module.exports = mongoose.model('Store', storeSchema)
