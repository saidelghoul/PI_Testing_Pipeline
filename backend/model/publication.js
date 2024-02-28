const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Publication = new Schema({
  Sujet: String,
  Contenue: String,
  DatePublication: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Publication", Publication);
