// controllers/usersContoller.js
var db = require('../models');

function show(req,res){
    res.render('users.ejs', {message: req.flash('errorMessage'), users: usersList });
}

function index(req,res){
    let username = req.params.username;
    // let userInfo = userData(userId);
    db.User.findOne({username: username}, function (err, foundUser) {
        console.log(`found user ${foundAuthor.username}`);
        res.json(foundUser)
        if (err) {
            console.log(err);
            return;
        }
    });
    // res.render(
    //     'userProfile.ejs', 
    //     {
    //         message: req.flash('errorMessage'), 
    //         user: userInfo.user, 
    //         workspaceItems: userInfo.softwareItems
    //     });
}

function edit(req,res){
    let userId = parseInt(req.params.id);
    let userInfo = userData(userId);
    res.render(
        'userProfileEdit.ejs', 
        {
            message: req.flash('errorMessage'), 
            user: userInfo.user, 
            workspaceItems: userInfo.softwareItems
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

// Function to grab user and software list to be reused
function userData(userId){
    let user;
    let workspaceItems = [];
    let softwareItems = [];
    for(let i=0; i < usersList.length; i++){
        if(usersList[i]._id === userId){
            user = usersList[i];
            break;
        }
    }

    workspaceItemsList.forEach(function(item,i){
        if(item._userId === userId){
            workspaceItems.push(item);
        }  
    })

    workspaceItems.forEach(function(workspaceItem){
        for(let i = 0; i < softwaresList.length; i++){
            if(workspaceItem._softwareId === softwaresList[i]._id){
                softwareItems.push({
                    _id:workspaceItem._id, 
                    _userId: workspaceItem._userId,
                    name: softwaresList[i].name,
                    tag: softwaresList[i].tag,
                    description: workspaceItem.description
                })
            }
        }
    })

    return {user: user, softwareItems: softwareItems};
}
    
module.exports = {
    show: show,
    index: index,
    edit: edit,
    update: update
};