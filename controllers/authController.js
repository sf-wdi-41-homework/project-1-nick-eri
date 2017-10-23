// Functions that control authentication 
const db = require('../models');
const passport = require("passport");

// GET /signup
let getSignup = (req, res) => {
    res.render('signup', { message: req.flash('errorMessage') })
}

// POST /signup
let postSignup = (req, res) => {
    let signupStrategy = passport.authenticate('local-signup', {
        successRedirect: "/newprofile",
        failureRedirect: "/signup",
        failureFlash: true
    });

    return signupStrategy(req, res);
}

// Page after User Signs up 
let newProfile = (req,res) => {
    res.render('newProfile');
}

// User updates information with username and basic info 
let newProfileUpdate = (req,res) => {
    db.User.findById(req.params.id, (err,foundUser) => {
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
let getLogin = (req, res) => { 
  res.render('login', { message: req.flash('errorMessage') })
}

// POST /login 
let postLogin = (req, res) => {
  let loginStrategy = passport.authenticate('local-login', {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  });

  return loginStrategy(req, res);
}

// GET /logout
let getLogout = (req, res) => {
  req.logout();
  res.redirect("/");
}

module.exports = {
    getSignup,
    postSignup,
    newProfile,
    newProfileUpdate,
    getLogin,
    postLogin,
    getLogout
}
