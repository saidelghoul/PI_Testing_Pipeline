const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Commentaire = new Schema({
  contenue: String,
  publicationId: { type: Schema.Types.ObjectId,
     ref: "PubGroups" },
  
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
},
{timestamps:true});

module.exports = mongoose.model("CommentGroups", Commentaire);
