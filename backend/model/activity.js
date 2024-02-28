const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Activity = new Schema({
  Name: String,
  Category: String,
  Approval: Boolean,
  StartDate: Date,
  EndDate: Date,
  Description: String,
});

module.exports = mongoose.model("activities", Activity);
