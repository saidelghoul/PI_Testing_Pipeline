const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Publication = new Schema({
  Sujet: String,
  Contenue: String,
  DatePublication: { type: Date, default: Date.now },
  creator: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User' 
    },
});


module.exports = mongoose.model("Publication", Publication);
