const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Publication = new Schema({
  Sujet: String,
  Contenue: String,
  DatePublication: { type: Date, default: Date.now },
  commentaires: [{ type: Schema.Types.ObjectId, ref: "Commentaire" }], // Liste des commentaires associés à la publication
});

module.exports = mongoose.model("Publication", Publication);
