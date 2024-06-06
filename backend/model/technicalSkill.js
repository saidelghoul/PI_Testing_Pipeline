const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const technicalSkillSchema = new Schema({
  technology: { type: mongoose.Schema.Types.ObjectId, ref: 'Technology', required: true },
  users: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      niveau: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] },
      yearsOfExperience: { type: Number, min: 0, max: 15 }
    }
  ]
});

module.exports = mongoose.model('TechnicalSkill', technicalSkillSchema);
