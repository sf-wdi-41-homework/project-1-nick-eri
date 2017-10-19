var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var WorkspaceItemSchema = new Schema({
	_userId: {
	    type: Schema.Types.ObjectId,
	    ref: 'User'
  	},
  	_softwareId: {
	    type: Schema.Types.ObjectId,
	    ref: 'Software'
  	}, 
  	description: String
})

var WorkspaceItem = mongoose.model('WorkspaceItem', WorkspaceItemSchema);
module.exports = WorkspaceItem; 