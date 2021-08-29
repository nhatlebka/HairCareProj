class SitesController {
    //GET / search
    search(req, res) {
        res.render('sites/search');
    }

    // GET / home
    index(req, res) {
        res.render('sites/home');
    }
}

module.exports = new SitesController();
