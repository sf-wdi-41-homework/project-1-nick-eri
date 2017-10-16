var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var SoftwareSchema = new Schema({
	name: String,
	tag: String
})

var Software = mongoose.model('Software', SoftwareSchema);
module.exports = Software; 