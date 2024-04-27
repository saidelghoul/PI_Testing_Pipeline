const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SocialSkill = new Schema({
  name: String,
  pointSocial: Number,
  niveau: {
    type: String,
    enum: ["bas", "intermédiaire", "élevé"],
  },
  dateAttribution: { type: Date , required: false},
  description: { type: String , required: false},
  users:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ]
    
});



module.exports = mongoose.model("socialSkills", SocialSkill);
