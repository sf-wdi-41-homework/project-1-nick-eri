const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const SoftwareSchema = new Schema({
	name: String,
	tag: String
})

const Software = mongoose.model('Software', SoftwareSchema);
module.exports = Software; 