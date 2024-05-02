const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Publication = new Schema({
  Contenue: String,
  DatePublication: { type: Date, default: Date.now },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  groupsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "groups",
  },
Like:{
  type:Number,
  default:0
},
dislike:{
  type:Number,
  default:0
},
LikedBy:[{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User"
}],
Dislikedby:[{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
}],

  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "CommentGroups", // Référence à un modèle de commentaire
    },
  ],
});

module.exports = mongoose.model("PubGroups", Publication);
