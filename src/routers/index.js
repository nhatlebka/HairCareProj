const sitesRouter = require('./sites');

const HairRouter = require('./hair');
function routers(app) {
    app.use('/hair', HairRouter);
    app.use('/', sitesRouter);
}

module.exports = routers;
