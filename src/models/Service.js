//booking models
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Service = new Schema(
	{
		service_name: String,
		service_introduce: String,
<<<<<<< HEAD
		service_desc: String,
		slug: String
=======
		service_image: String,
		service_desc: String,
		service_price: Number,
		service_title: String,
		slug: String,
>>>>>>> 2c8640626bbfbfab05bda2216ade939309e78174
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Service', Service);
