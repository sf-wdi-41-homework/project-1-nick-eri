// require mongoose and connect to database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/work_bettah');

var Software = require('./software');
var User = require('./user');
var WorkspaceItem = require('./workspace_item');

module.exports = {
  	Software: Software,
  	User: User,
  	WorkspaceItem: WorkspaceItem
};