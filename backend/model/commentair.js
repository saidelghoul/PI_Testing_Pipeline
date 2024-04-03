const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Commentaire = new Schema({
  contenu: String,
  DateCreation: { type: Date, default: Date.now },
  publicationId: { type: Schema.Types.ObjectId, ref: "Publication" },
  evenementId: { type: Schema.Types.ObjectId, ref: "Evenement" },
  Creator: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User' 
    },
});

module.exports = mongoose.model("commentaire", Commentaire);
