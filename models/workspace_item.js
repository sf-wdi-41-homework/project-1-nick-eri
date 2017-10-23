const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const WorkspaceItemSchema = new Schema({
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

const WorkspaceItem = mongoose.model('WorkspaceItem', WorkspaceItemSchema);
module.exports = WorkspaceItem; 