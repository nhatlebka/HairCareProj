const express = require('express');
const hairStyles = express.Router();
const gallery = require('../models/gallery');

hairStyles.post('/upload', async (req, res) => {
	try {
        let newPhoto = new gallery({
            img: req.body.img,
            type: req.body.type,
        });
        await newPhoto.save();
        gallery.find({}).then((photo) => {res.send(photo);}).catch((error) =>res.send(error));
    } catch (error) {
        console.error(error);
    }
});


hairStyles.get('/gallery', (req, res) => {
	res.render('hairstyles/galleryphoto');
});

hairStyles.get('/', (req, res) => {
	res.render('hairstyles/hairstyles');
});
module.exports = hairStyles;
