const express = require('express');
const bodyParser = require('body-parser');
const routers = require('./src/routers/index');
const path = require('path');
const methodOverride = require('method-override');
const db = require('./src/models');
var mongoose = require('mongoose');

const PORT = process.env.port || 3000;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//dev
const morgan = require('morgan');
app.use(morgan('dev')); // log tất cả request ra console log
//Ghi đè phương thức (override method)
app.use(methodOverride('_method'));

//Use ejs
app.set('view engine', 'ejs');

//Set views
app.set('views', path.join(__dirname, './src/views'));

//Set static file
app.use(express.static(path.join(__dirname, './src/public')));

routers(app);
//database
db.connect();

app.listen(PORT, () => console.log('Listening on port ' + PORT));
