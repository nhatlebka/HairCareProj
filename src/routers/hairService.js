const express = require('express');
const hairService = express.Router();
const Service = require('../models/Service');
const mongoose = require('mongoose');

hairService.get('/test', (req, res) => {
	res.render('hairService/hairService');
});
hairService.get('/option', (req, res) => {
	res.render('hairService/optionServices');
});
hairService.get('/data', (req, res, next) => {
	Service.find({})
		.then((services) => res.json(services))
		.catch(next);
});
hairService.get('/:slug', (req, res, next) => {
	Service.findOne({ slug: req.params.slug })
		.then((services) => {
			res.render('hairService/optionServices', {
				services: services,
			});
		})
		.catch(next);
});
hairService.get('/', (req, res) => {
	res.render('hairService/services');
});

module.exports = hairService;
