// Require Node Packages
const express = require('express');
const flash = require('connect-flash');
const ejsLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

// Require controllers and models
// FIXME: is this db instantiation ever used in this file?
const db = require('./models');
const controllers = require('./controllers');

// Initialise Express App
app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(ejsLayouts);
// TODO: change this secret key to be a unique secret
app.use(session({ secret: 'WDI-GENERAL-ASSEMBLY-EXPRESS' }));
app.use(flash());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// FIXME: use `req, res` or `request, response`  consistently for easier code reading
app.use(
  methodOverride((request, response) => {
    if (
      request.body &&
      typeof request.body === 'object' &&
      '_method' in request.body
    ) {
      let method = request.body._method;
      delete request.body._method;
      return method;
    }
  })
);

// Express settings
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

require('./config/passport')(passport);

const routes = require('./config/routes');

app.use((req, res, next) => {
  global.currentUser = req.user;
  next();
});

app.use(routes);

app.listen(process.env.PORT || 3000, () => {
  console.log('Express server is up and running on http://localhost:3000/');
});
