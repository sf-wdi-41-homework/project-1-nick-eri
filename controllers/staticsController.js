const db = require('../models');

// Handle static page routes
let home = (req, res) => {  
	let q = db.User.find({}).limit(3);
	q.exec((err, users) => {
     	if(err){
            console.log(err);
            return; 
        }
        res.render(
            'index.ejs',
            {
                message: req.flash('errorMessage'),
                users: users
            })
	});
}

module.exports = {
  	home
}