// require mongoose and connect to database
const mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/work_better');

module.exports = {
  	Software: require('./software'),
  	User: require('./user'),
  	WorkspaceItem: require('./workspace_item')
};