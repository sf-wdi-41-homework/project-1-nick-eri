var db = require('../models');

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