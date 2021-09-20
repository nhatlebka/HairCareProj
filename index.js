const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const routers = require('./src/routers/index');
const db = require('./src/models');
const path = require('path');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'infinitycoder' }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());
//dev
// const morgan = require('morgan');
// app.use(morgan('dev')); // log tất cả request ra console log
//Ghi đè phương thức (override method)
app.use(methodOverride('_method'));

//Use ejs
app.set('view engine', 'ejs');

//Set views
app.set('views', path.join(__dirname, './src/views'));

//Set static file
app.use(express.static(path.join(__dirname, './src/public')));

//routers
routers(app);
//database
db.connect();

app.listen(PORT, () => console.log('Listening on port ' + PORT));
