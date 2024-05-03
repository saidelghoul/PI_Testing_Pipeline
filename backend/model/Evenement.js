const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Evenement = new Schema({
  Titre: String,
  Contenu: String,
  DatePublication: { type: Date, default: Date.now },
  DateDebut: { type: Date, required: true },
  DateFin: { type: Date, required: true },
  Capacite: { type: Number, required: true },
  Prix: Number,
  ImagePath: String,

  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "commentaire", // Référence à un modèle de commentaire
    },
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  deslikes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  reports: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  reservations: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Evenement", Evenement);
