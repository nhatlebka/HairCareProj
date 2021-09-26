//booking models
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Service = new Schema(
	{
		service_name: String,
		service_introduce: String,
		service_image: String,
		service_desc: String,
		service_price: Number,
		service_title: String,
		slug: String,
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Service', Service);
