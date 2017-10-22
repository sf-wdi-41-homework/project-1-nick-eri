// Functions handling routing for user information
var db = require('../models');

// GET Shows a list of all users logged into the site 
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

// GET Displays the page of a user when given the username 
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
                    if(!currentUser || foundUser.username !== currentUser.username.toString()){
                        res.render(
                        'userProfile.ejs', 
                        {
                            message: req.flash('errorMessage'), 
                            user: foundUser, 
                            workspaceItems: workspaceItems
                        });
                    }else if(foundUser.username === currentUser.username.toString()){
                       res.render(
                        'currentUserUserProfile.ejs', 
                        {
                            message: req.flash('errorMessage'), 
                            user: foundUser, 
                            workspaceItems: workspaceItems
                        }); 
                    }
                });
        }else{
            res.send('user not found');
        }
    });
}

// GET Displays form page for updating basic profile information 
function edit(req,res){
    let username = req.params.username;
    if(username === currentUser.username.toString()){
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
    } else {
        res.redirect('/');
    }

}

// PUT Saves the updated information from the edit page. 
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