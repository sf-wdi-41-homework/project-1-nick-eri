// controllers/usersContoller.js
var db = require('../models');
var passport = require("passport")

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
    show: show,
    index: index,
    edit: edit,
    update: update
};