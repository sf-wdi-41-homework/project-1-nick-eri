var express = require('express');
var router = express.Router();
var controllers = require('../controllers');
var passport = require("passport");

function authenticatedUser(req, res, next) {
	// If the user is authenticated, then we can continue with next
	// https://github.com/jaredhanson/passport/blob/a892b9dc54dce34b7170ad5d73d8ccfba87f4fcf/lib/passport/http/request.js#L74
	if (req.isAuthenticated()) return next();

	// Otherwise
	req.flash('errorMessage', 'Login to access!');
return res.redirect('/login');
}

function unAuthenticatedUser(req, res, next) {
  	if (!req.isAuthenticated()) return next();

  	// Otherwise
	req.flash('errorMessage', 'You are already logged in!');
	return res.redirect('/');
}

router.route('/')
  	.get(controllers.statics.home);

router.route('/signup')
  	.get(unAuthenticatedUser, controllers.users.getSignup)
  	.post(controllers.users.postSignup);

router.route('/newprofile')
	.get(authenticatedUser, controllers.users.newProfile);

router.route('/newprofile/:id/complete')
	.post(authenticatedUser, controllers.users.newProfileUpdate);

router.route('/login')
  .get(unAuthenticatedUser, controllers.users.getLogin)
  .post(controllers.users.postLogin)

router.route('/users')
	.get(controllers.users.show);

router.route('/users/:username')
	.get(controllers.users.index);

router.route('/users/:username/edit')
	.get(controllers.users.edit)
	.post(controllers.users.update);

router.route('/workspaceItems/:id')
	.delete(controllers.workspaceItems.destroy);

router.route('/software/search/:software')
	.get(controllers.softwares.search);

module.exports = router;
