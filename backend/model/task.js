const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Status = {
  ACTIVE: "active",
  COMPLETE: "complete",
  PLANNED: "planned",
};
const Priority = {
  HIGH: "high",
  LOW: "low",
  MEDIUM: "medium",
};

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    initDate: {
      type: Date,
      required: [true, "init date is required"],
    },
    dueDate: {
      type: Date,
      required: [true, "due date is required"],
    },
    status: {
      type: String,
      enum: Status,
      default: Status.PLANNED,
    },
    priority: {
      type: String,
      enum: Priority,
      default: Priority.LOW,
    },
    tags: [],
    collaborators: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    checkList: [
      {
        type: Schema.Types.ObjectId,
        ref: "CheckList",
      },
    ],
    description: String,
    id_activity: {
      type: Schema.Types.ObjectId,
      ref: "Activity",
    },
    archived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
