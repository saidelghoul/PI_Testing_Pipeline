const mongoose = require('mongoose')
const {Schema} = mongoose

const uniteSchema = new Schema({
   name: String, 
   departement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Departement', // Référence au modèle Departement
    },

   // user: {
   //    type: mongoose.Schema.Types.ObjectId,
   //    ref: 'User', // Référence au modèle User
   //    //required: true,
   //  },
     
})

const UniteModel = mongoose.model('Unite',uniteSchema);

module.exports = UniteModel;