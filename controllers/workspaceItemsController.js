// Functions to handle the bridge workspace item model 
var db = require('../models');

// Handles users adding new workspace item to their list
function create(req,res){
	db.WorkspaceItem.create(req.body, function(err, workspaceItem) {
	    if (err) { console.log('error', err); }
	    workspaceItem._userId = req.body.userId;
	    workspaceItem._softwareId = req.body.id;
	    workspaceItem.description = req.body.description;
	    workspaceItem.save(function(err, savedWorkspaceItem) {
	      	if (err) { console.log('Saving workspace item failed'); }
	      	res.redirect(`/users/${currentUser.username}`); 
	    });
  	});
}

// Handles user removing list items from their profile 
function destroy(req,res){
	let workspaceItem_id = parseInt();

	db.WorkspaceItem.findById(req.params.id, function(err,foundWorkspaceItem){
        res.json(foundWorkspaceItem);
		foundWorkspaceItem.remove()
	});
}

module.exports = {
	create: create,
    destroy: destroy
};




