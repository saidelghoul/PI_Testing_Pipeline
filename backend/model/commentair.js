const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Commentaire = new Schema({
  contenu: String,
  DateCreation: { type: Date, default: Date.now },
  publicationId: { type: Schema.Types.ObjectId, ref: "Publication" },
  evenementId: { type: Schema.Types.ObjectId, ref: "Evenement" },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("commentaire", Commentaire);
