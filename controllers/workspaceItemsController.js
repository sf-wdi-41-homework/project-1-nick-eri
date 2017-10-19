var db = require('../models');

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




