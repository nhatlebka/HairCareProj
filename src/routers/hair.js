const express = require('express');
const HairRouter = express.Router();

HairRouter.get('/', function (req, res) {
    res.render('hair/hair');
});

module.exports = HairRouter;
