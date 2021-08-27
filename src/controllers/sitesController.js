class SitesController {
    // GET / home
    index(req, res) {
        res.render('sites/home');
    }
}

module.exports = new SitesController();
