// Functions that control authentication 
var db = require('../models');
var passport = require("passport");

// GET /signup
function getSignup(req, res) {
    res.render('signup', { message: req.flash('errorMessage') })
}

// POST /signup
function postSignup(req, res) {
    var signupStrategy = passport.authenticate('local-signup', {
        successRedirect: "/newprofile",
        failureRedirect: "/signup",
        failureFlash: true
    });

    return signupStrategy(req, res);
}

// Page after User Signs up 
function newProfile(req,res){
    res.render('newprofile.ejs');
}

// User updates information with username and basic info 
function newProfileUpdate(req,res){
    db.User.findById(req.params.id, function(err,foundUser){
        if (err) {
            console.log(err);
            return;
        }
        foundUser.username = req.body.username;
        foundUser.jobTitle = req.body.jobTitle;
        foundUser.jobField = req.body.jobField;
        foundUser.blurb = req.body.blurb;
        foundUser.save(function(err, saved) {
            console.log('Updated ', foundUser.username);
            res.redirect(`/users/${foundUser.username}`);
        });
    });
}

// GET /login
function getLogin(req, res) { 
  res.render('login', { message: req.flash('errorMessage') })
}

// POST /login 
function postLogin(req, res) {
  var loginStrategy = passport.authenticate('local-login', {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  });

  return loginStrategy(req, res);
}

// GET /logout
function getLogout(req, res) {
  req.logout();
  res.redirect("/");
}

module.exports = {
    getSignup: getSignup,
    postSignup: postSignup,
    newProfile: newProfile,
    newProfileUpdate: newProfileUpdate,
    getLogin: getLogin,
    postLogin: postLogin,
    getLogout: getLogout
}
