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
  ],
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Référence à l'utilisateur qui a attribué
    required: false,
  },
    
});



module.exports = mongoose.model("socialSkills", SocialSkill);
