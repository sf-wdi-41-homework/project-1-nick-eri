var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var UserSchema = new Schema({
	username: String,
	fName: String,
	lName: String,
	avatar: String,
	jobTitle: String,
	jobField: String,
	blurb: String,
	votes: Number
})

var User = mongoose.model('User', UserSchema);
module.exports = User; 