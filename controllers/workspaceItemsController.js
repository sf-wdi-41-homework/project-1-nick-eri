// Functions to handle the bridge workspace item model 
var db = require('../models');

// Handles user removing list items from their profile 
function destroy(req,res){
	let workspaceItem_id = parseInt();

	db.WorkspaceItem.findById(req.params.id, function(err,foundWorkspaceItem){
        res.json(foundWorkspaceItem);
		foundWorkspaceItem.remove()
	});
}

module.exports = {
    destroy: destroy
};




