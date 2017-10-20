// Require Node Packages 
var express = require('express');
var flash = require('connect-flash');
var ejsLayouts = require("express-ejs-layouts");
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override'); 

// Require controllers and models 
var db = require('./models');
var controllers = require('./controllers');

// Initialise Express App
app = express();

app.use(function(req, res, next) {
  	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	next();
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(ejsLayouts);
app.use(session({ secret: 'WDI-GENERAL-ASSEMBLY-EXPRESS' }));
app.use(flash());

// Express settings
app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");

var routes = require("./config/routes");
app.use(routes);

app.listen(process.env.PORT || 3000, function () {
  	console.log('Express server is up and running on http://localhost:3000/');
});
