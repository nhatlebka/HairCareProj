const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'lenn',
    api_key: '233245189486363',
    api_secret: '_euNp6CCQl9A34tIWq6wnEJlgDA',
});

module.exports = cloudinary;
