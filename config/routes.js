const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const passport = require("passport");

let authenticatedUser = (req, res, next) => {
	// If the user is authenticated, then we can continue with next
	// https://github.com/jaredhanson/passport/blob/a892b9dc54dce34b7170ad5d73d8ccfba87f4fcf/lib/passport/http/request.js#L74
	if (req.isAuthenticated()) return next();

	// Otherwise
	req.flash('errorMessage', 'Login to access!');
	return res.redirect('/login');
}

let unAuthenticatedUser = (req, res, next) => {
  	if (!req.isAuthenticated()) return next();

  	// Otherwise
	req.flash('errorMessage', 'You are already logged in!');
	return res.redirect('/');
}

// Hoem page route
router.route('/')
  	.get(controllers.statics.home);

// Signup route 
router.route('/signup')
  	.get(unAuthenticatedUser, controllers.auth.getSignup)
  	.post(controllers.auth.postSignup);

// Route after signup POST 
router.route('/newprofile')
	.get(authenticatedUser, controllers.auth.newProfile);

// Route once new profile updated 
router.route('/newprofile/:id/complete')
	.post(authenticatedUser, controllers.auth.newProfileUpdate);

// Handles login get and post 
router.route('/login')
  	.get(unAuthenticatedUser, controllers.auth.getLogin)
	.post(controllers.auth.postLogin)

// Handles logout get 
router.route("/logout")
  	.get(controllers.auth.getLogout)

// Handles User List page
router.route('/users')
	.get(controllers.users.show);

// Handles user index page 
router.route('/users/:username')
	.get(controllers.users.index);

// Handles edit page for specific user 
router.route('/users/:username/edit')
	.get(controllers.users.edit)
	.post(controllers.users.update);

// Handles creating of list items
router.route('/workspaceitems/create')
	.post(controllers.workspaceItems.create);

// Handles deletion of certain list items 
router.route('/workspaceItems/:id')
	.delete(controllers.workspaceItems.destroy);

// Handles search function for AJAX calls 
router.route('/software/search/:software')
	.get(controllers.softwares.search);

module.exports = router;
