const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const checkListSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    holder: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    done: Boolean,
    description: String,
    id_task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    archived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CheckList", checkListSchema);
