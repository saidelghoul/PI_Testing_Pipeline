const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Evenement = new Schema({
  Titre: String,
  Contenu: String,
  DatePublication: { type: Date, default: Date.now },
  DateDebut: { type: Date, required: true },
  DateFin: {type: Date,required: true,},
  Capacite: { type: Number, required: true },
  Prix: Number,
  creator: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User' 
    },
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'commentaire' // Référence à un modèle de commentaire
    }]
});

module.exports = mongoose.model("Evenement", Evenement);
