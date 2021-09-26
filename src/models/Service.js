//booking models
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Service = new Schema(
	{
		service_name: String,
		service_introduce: String,
		service_desc: String,
		slug: String
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Service', Service);
