var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var WorkspaceItemSchema = new Schema({
	_userId: {
	    type: Schema.Types.ObjectId,
	    ref: 'user'
  	},
  	_softwareId: {
	    type: Schema.Types.ObjectId,
	    ref: 'software'
  	}, 
  	description: String
})

var WorkspaceItem = mongoose.model('WorkspaceItem', WorkspaceItemSchema);
module.exports = WorkspaceItem; 