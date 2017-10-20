// Functions to handle the Software Model 
var db = require('../models');

// Meant for client side ajax call to return software search results 
function search(req,res){
	db.Software.find({name: { "$regex": req.params.software, "$options": "i" }})
        .exec(function(err, softwares){
            if(err){
                res.status(500).send(err);
                return;
            }
            res.json(softwares);
        });
}

module.exports = {
	search: search
}