// require mongoose and connect to database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/work_bettah');

module.exports = {
  	Software: require('./software'),
  	User: require('./user'),
  	WorkspaceItem: require('./workspace_item')
};