const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');
const Schema = mongoose.Schema; 

const UserSchema = new Schema({
	username: String,
	fName: String,
	lName: String,
	avatar: String,
	jobTitle: String,
	jobField: String,
	blurb: String,
	votes: Number,
	local : {
	    email        : String,
	    password     : String
  	}
})

UserSchema.statics.encrypt = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
}


const User = mongoose.model('User', UserSchema);
module.exports = User; 