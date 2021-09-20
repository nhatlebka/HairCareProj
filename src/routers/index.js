const sitesRouter = require('./sites');
const bookingRouter = require('./booking');
const manager = require('./manager');
const hairProblems = require('./hairProblems');
const hairService = require('./hairService');
const products = require('./products');
const hairStyles = require('./hairStyles');

function routers(app) {
	app.use('/hair-styles', hairStyles);
	app.use('/products', products);
	app.use('/services', hairService);
	app.use('/hair-problems', hairProblems);
	app.use('/booking', bookingRouter);
	app.use('/manager', manager);
	app.use('/', sitesRouter);
}

module.exports = routers;
