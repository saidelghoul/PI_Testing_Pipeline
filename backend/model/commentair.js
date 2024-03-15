const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Commentaire = new Schema({
  contenu: String,
  DateCreation: { type: Date, default: Date.now },
 
});

module.exports = mongoose.model("commentaire", Commentaire);
