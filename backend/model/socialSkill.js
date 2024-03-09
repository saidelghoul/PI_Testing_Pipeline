const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SocialSkill = new Schema({
  name: String,
  description: String,
  pointSocial: Number,
  
});



module.exports = mongoose.model("socialSkills", SocialSkill);
