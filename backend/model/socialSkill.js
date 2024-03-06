const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SocialSkill = new Schema({
  name: String,
  description: String,
  pointSocial: Number,
  
});


const SocialSkillModel = mongoose.model('SocialSkill',SocialSkill);

module.exports = mongoose.model("socialSkills", SocialSkill);
