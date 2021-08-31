const sitesRouter = require('./sites');
const bookingRouter = require('./booking');
const HairRouter = require('./hair');
const hairProblems = require('./hairProblems');
const hairService = require('./hairService');

function routers(app) {
	app.use('/services', hairService);
	app.use('/hair-problems', hairProblems);
	app.use('/hair', HairRouter);
	app.use('/booking', bookingRouter);
	app.use('/', sitesRouter);
}

module.exports = routers;
