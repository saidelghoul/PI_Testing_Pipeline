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
    doneDate: {
      type: Date,
      default: null,
    },
    score: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    hasFile: {
      type: Boolean,
      default: false,
    },
    description: String,
    feedback: {
      type: String,
      default: "",
    },
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
