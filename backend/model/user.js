const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmedPassword: String,
  role: String,
  addresse: {
    type: String,
    required: false, // Adresse n'est pas obligatoire
  },
  gouvernorat: {
    type: String,
    required: false,
  },
  telephone: {
    type: String,
    required: false,
  },
  dateNaissance: {
    type: Date,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  departement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Departement", // Référence au modèle Departement
  },
  unite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Unite", // Référence au modèle Unite
  },
  socialSkills: [
    {
      type: Schema.Types.ObjectId,
      ref: "socialSkills",
    },
  ],
  technicalSkills: [
    {
      type: Schema.Types.ObjectId,
      ref: "technicalSkills",
    },
  ],
  departement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Departement", // Référence au modèle Departement
    required: false,
  },
  unite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Unite", // Référence au modèle Unite
    required: false,
  },
  conversations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation'
  }],
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
