var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var WorkspaceItemSchema = new Schema({
	user_id: {
	    type: Schema.Types.ObjectId,
	    ref: 'user'
  	},
  	software_id: {
	    type: Schema.Types.ObjectId,
	    ref: 'software'
  	}, 
  	description: String
})

var WorkspaceItem = mongoose.model('WorkspaceItem', WorkspaceItemSchema);
module.exports = WorkspaceItem; 