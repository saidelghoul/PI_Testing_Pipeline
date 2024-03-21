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
  commentaires: [{ type: Schema.Types.ObjectId, ref: "Commentaire" }], // Liste des commentaires associés à la publication
});

module.exports = mongoose.model("Evenement", Evenement);
