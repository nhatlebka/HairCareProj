const sitesRouter = require('./sites');

function routers(app) {
    app.use('/', sitesRouter);
}

module.exports = routers;
