const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SocialSkill = new Schema({
  name: String,
  pointSocial: Number,
  dateAttribution: Date,
  
});



module.exports = mongoose.model("socialSkills", SocialSkill);
