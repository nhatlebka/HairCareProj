const express = require('express');
const router = express.Router();
const SitesController = require('../controllers/sitesController');

router.get('/', SitesController.index);

module.exports = router;
