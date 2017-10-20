// controllers/usersContoller.js
var db = require('../models');
var passport = require("passport")

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

function newProfile(req,res){
    res.render('newprofile.ejs');
}

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


function show(req,res){
    db.User.find({}).exec(function(err, users){
        if(err){
            console.log(err);
            return; 
        }
        res.render(
            'users.ejs',
            {
                message: req.flash('errorMessage'),
                users: users
            })
    })
}

function index(req,res){
    let username = req.params.username;
    db.User.findOne({username: username}, function (err, foundUser) {
        if (err) {
            console.log(err);
            return;
        }
        if(foundUser){  
            db.WorkspaceItem.find({_userId: foundUser._id})
                .populate('_userId')
                .populate('_softwareId')
                .exec(function(err, workspaceItems){
                    if(err){
                        res.status(500).send(err);
                        return;
                    }
                    res.render(
                        'userProfile.ejs', 
                        {
                            message: req.flash('errorMessage'), 
                            user: foundUser, 
                            workspaceItems: workspaceItems
                        });
                });
        }else{
            res.send('user not found');
        }
    });
}

function edit(req,res){
    let username = req.params.username;
    db.User.findOne({username: username}, function (err, foundUser) {
        if (err) {
            console.log(err);
            return;
        }
        res.render(
            'userProfileEdit.ejs', 
            {
                message: req.flash('errorMessage'), 
                user: foundUser
            });
    });

}

function update(req,res){
    let username = req.params.username;
    db.User.findOne({username: username}, function (err, foundUser) {
        if (err) {
            console.log(err);
            return;
        }
        foundUser.jobTitle = req.body.jobTitle;
        foundUser.jobField = req.body.jobField;
        foundUser.blurb = req.body.blurb;
        foundUser.save(function(err, saved) {
            console.log('Updated ', foundUser.username);
            res.redirect(`/users/${foundUser.username}`);
        });
    });
}

    
module.exports = {
    getSignup: getSignup,
    postSignup: postSignup,
    newProfile: newProfile,
    newProfileUpdate: newProfileUpdate,
    getLogin: getLogin,
    postLogin: postLogin,
    getLogout: getLogout,
    show: show,
    index: index,
    edit: edit,
    update: update
};