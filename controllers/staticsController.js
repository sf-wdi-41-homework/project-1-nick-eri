var db = require('../models');

// Handle static page routes
function home(req, res) {  
	var q = db.User.find({}).limit(3);
	q.exec(function(err, users) {
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
  	home: home,
}