const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TechnicalSkill = new Schema({
  name: String,
  description: String,
  experience: String,
  domaine: String,
  pointTechnical: Number,
  dateAttribution: Date,
});

module.exports = mongoose.model("technicalSkills", TechnicalSkill);