const mongoose = require("mongoose");

const docSchema = new mongoose.Schema({
  fileName: String,
  contentType: String,
  fileUrl: String,
  id_checklist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CheckList",
  },
});

module.exports = mongoose.model("Document", docSchema);
