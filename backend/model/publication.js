const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Publication = new Schema({
  Sujet: String,
  Contenue: String,
  DatePublication: { type: Date, default: Date.now },
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
});

module.exports = mongoose.model("Publication", Publication);
