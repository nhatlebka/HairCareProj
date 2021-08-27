const express = require('express');
const bodyParser = require('body-parser');
const router = require('./src/routers/index');
const path = require('path');

const PORT = process.env.port || 3000;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Use ejs
app.set('view engine', 'ejs');

//Set views
app.set('views', path.join(__dirname, './src/views'));

//Set static file
app.use(express.static(path.join(__dirname, './src/public')));



app.use('/', router);

app.listen(PORT, () => console.log('Listening on port ' + PORT));
