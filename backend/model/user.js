const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    confirmedPassword:String,
    role: String,
    gouvernorat : String,
    socialSkills: [{
      type: Schema.Types.ObjectId,
      ref: "socialSkills"
    }],
    TechnicalSkills : [{type: Schema.Types.ObjectId, ref:"technicalSkill"}]
    //adresse: String,
    //telephone : String,
    //dateNaissance: Date,
    //gender: String,
    //enabled: Boolean,
   // departement: {
     //   type: mongoose.Schema.Types.ObjectId,
       // ref: 'Departement', // Référence au modèle Departement
      //},

})

const UserModel = mongoose.model('User',userSchema);

module.exports = UserModel;