const sitesRouter = require('./sites');

const HairRouter = require('./hair');
const hairProblems = require('./hairProblems');

function routers(app) {
    app.use('/hair-problems', hairProblems);
    app.use('/hair', HairRouter);
    app.use('/', sitesRouter);
}

module.exports = routers;
