const mongoose = require('mongoose');
// const mongooseDelete = require('mongoose-delete');

//Connect to DB
function connect() {
	mongoose
		.connect(
			process.env.cfg_db_server,
			// 'mongodb://localhost:27017/test',

			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		)
		.then(() => console.log('Database connected!'))
		.catch((err) => console.log(err));
}

module.exports = { connect };
