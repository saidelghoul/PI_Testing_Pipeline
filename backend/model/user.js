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
      type: mongoose.Schema.Types.ObjectId,
      ref: "socialSkills",
    },
  ],
  technicalSkills: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "technicalSkills",
    },
  ],
  isActive: {
    type: Boolean,
    default: true, // Le compte est activé par défaut
  },
  profileImage: String,
  coverImage: String,
  conversations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
  ],
  emailToken: {
    type: String,
    default: '',
  },
  
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  badges: [{ type: String }],
 
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
