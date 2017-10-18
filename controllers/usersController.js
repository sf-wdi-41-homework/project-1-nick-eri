var softwaresList = [
    {
        _id: 1,
        name: 'Contexts',
        tag: 'Productivity'
    },
    {
        _id: 2,
        name: 'Sublime Text',
        tag: 'Programming'
    },
    {
        _id: 3,
        name: 'Adobe Photoshop',
        tag: 'Design'
    },
    {
        _id: 4,
        name: 'SizeUp',
        tag: 'Utility'
    },
    {
        _id: 5,
        name: 'Stay',
        tag: 'Utility'
    },
    {
        _id: 6,
        name: 'Slack',
        tag: 'Communication'
    },
]

var usersList = [
    {
        _id:1,
        username: 'severejetlag',
        fName: 'Nick',
        lName: 'Lee',
        avatar: 'something.png',
        jobTitle: 'WDI Student', 
        jobField: 'Tech', 
        blurb: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat perspiciatis commodi, ex deleniti quas nostrum odit ab officia accusantium voluptates explicabo ullam doloribus assumenda sunt eum enim ipsum id sapiente!', 
        votes: 20
    }, 
    {
        _id:2,
        username: 'severejetlag2',
        fName: 'Nick2',
        lName: 'Lee',
        avatar: 'something.png',
        jobTitle: 'Front End Developer', 
        jobField: 'Tech', 
        blurb: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat perspiciatis commodi, ex deleniti quas nostrum odit ab officia accusantium voluptates explicabo ullam doloribus assumenda sunt eum enim ipsum id sapiente!', 
        votes: 30
    },
    {
        _id:3,
        username: 'severejetlag3',
        fName: 'Nick3',
        lName: 'Lee',
        avatar: 'something.png',
        jobTitle: 'Designer', 
        jobField: 'Tech', 
        blurb: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat perspiciatis commodi, ex deleniti quas nostrum odit ab officia accusantium voluptates explicabo ullam doloribus assumenda sunt eum enim ipsum id sapiente!', 
        votes: 40
    },
    {
        _id: 4,
        username: 'severejetlag4',
        fName: 'Nick4',
        lName: 'Lee',
        avatar: 'something.png',
        jobTitle: 'WDI Student', 
        jobField: 'Tech', 
        blurb: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat perspiciatis commodi, ex deleniti quas nostrum odit ab officia accusantium voluptates explicabo ullam doloribus assumenda sunt eum enim ipsum id sapiente!', 
        votes: 100
    }
]

var workspaceItemsList = [
    {
        _id:1,
        _userId:1,
        _softwareId:1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod ipsam necessitatibus quidem voluptates vel, voluptate ab, libero velit nobis eum, laborum accusamus et dicta similique! Quod, eum repudiandae optio corrupti!'
    },
    {
        _id:2,
        _userId:1,
        _softwareId:2,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod ipsam necessitatibus quidem voluptates vel, voluptate ab, libero velit nobis eum, laborum accusamus et dicta similique! Quod, eum repudiandae optio corrupti!'
    },
    {
        _id:3,
        _userId:1,
        _softwareId:3,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod ipsam necessitatibus quidem voluptates vel, voluptate ab, libero velit nobis eum, laborum accusamus et dicta similique! Quod, eum repudiandae optio corrupti!'
    },
    {
        _id:4,
        _userId:2,
        _softwareId:1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod ipsam necessitatibus quidem voluptates vel, voluptate ab, libero velit nobis eum, laborum accusamus et dicta similique! Quod, eum repudiandae optio corrupti!'
    },
    {
        _id:5,
        _userId:2,
        _softwareId:5,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod ipsam necessitatibus quidem voluptates vel, voluptate ab, libero velit nobis eum, laborum accusamus et dicta similique! Quod, eum repudiandae optio corrupti!'
    }
]

// controllers/usersContoller.js
var db = require('../models');

function users(req,res){
    res.render('users.ejs', {message: req.flash('errorMessage'), users: usersList });
}

function index(req,res){
    let userId = parseInt(req.params.id);
    for(let i=0; i < usersList.length; i++){
        if(usersList[i]._id === userId){
            res.render('userProfile.ejs', {message: req.flash('errorMessage'), user: usersList[i]})
            break;
        }
    }
}

module.exports = {
    users: users,
    index: index
};