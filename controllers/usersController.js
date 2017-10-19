// controllers/usersContoller.js
var db = require('../models');

function show(req,res){
    res.render('users.ejs', {message: req.flash('errorMessage'), users: usersList });
}

function index(req,res){
    let username = req.params.username;
    db.User.findOne({username: username}, function (err, foundUser) {
        if (err) {
            console.log(err);
            return;
        }
        db.WorkspaceItem.find({_userId: foundUser._id})
            .populate('user')
            .populate('software')
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
    let userId = parseInt(req.params.id);
    console.log(req.body);
    for(let i = 0; i < usersList.length; i++){
        if(userId === usersList[i]._id){
            usersList[i].jobTitle = req.body.jobTitle;
            usersList[i].jobTitle = req.body.jobTitle;
            usersList[i].blurb = req.body.blurb;
            break;
        }
    }

    let userInfo = userData(userId);
    res.redirect(`/users/${userId}`);
}

    
module.exports = {
    show: show,
    index: index,
    edit: edit,
    update: update
};