const mongoose = require('mongoose')
const {Schema} = mongoose

const departementSchema = new Schema({
   name: String,
   description: String,
   nbrUnite : {
    type : Number,
    required : true, 
   },
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Référence au modèle User
    required: true,
  },
  unites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unite', // Référence au modèle Unite
  }],
})

const DepartementModel = mongoose.model('Departement',departementSchema);

module.exports = DepartementModel;