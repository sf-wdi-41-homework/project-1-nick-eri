const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: Tags can be extracted into a join table. Tag is one full model, with software_tag being a join.  This way a tag can exist for multiple entities without duplication
const SoftwareSchema = new Schema({
  name: String,
  tag: String
});

const Software = mongoose.model('Software', SoftwareSchema);
module.exports = Software;
