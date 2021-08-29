const express = require('express');
const bodyParser = require('body-parser');
const routers = require('./src/routers/index');
const path = require('path');
const methodOverride = require('method-override');

const PORT = process.env.port || 3000;
const app = express();

// User req.body    || req.params /home/:id    /home/fjghdjkghdfjkghdfgj    fjghdjkghdfjkghdfgj = req.params.id     req.querry  /home?id=23123123     req.query.id=23123123
app.use(bodyParser.urlencoded({extended: true})); // POST  sẽ nhận đc biến req.body khi submit form
app.use(bodyParser.json());

//Ghi đè phương thức (override method)
app.use(methodOverride('_method'));

//Use ejs
app.set('view engine', 'ejs');

//Set views
app.set('views', path.join(__dirname, './src/views'));

//Set static file
app.use(express.static(path.join(__dirname, './src/public')));

routers(app);

app.listen(PORT, () => console.log('Listening on port ' + PORT));
