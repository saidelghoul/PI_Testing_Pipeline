const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Evenement = new Schema({
  Titre: String,
  Contenu: String,
  DatePublication: { type: Date, default: Date.now },
  DateDebut: Date,
  DateFin: Date,
  Capacite: Number,
  Prix: Number,
});

module.exports = mongoose.model("Evenement", Evenement);
