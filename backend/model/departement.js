const mongoose = require('mongoose')
const {Schema} = mongoose

const departementSchema = new Schema({
   name: String,
   description: String,
   nbrUnite : {
    type : Number,
    required : true, 
   },
  //  user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User', // Référence au modèle User
  //   required: false,
  // },

  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Référence au modèle User
    required: false,
  }],

  unites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unite', // Référence au modèle Unite
  }],
})

const DepartementModel = mongoose.model('Departement',departementSchema);

module.exports = DepartementModel;