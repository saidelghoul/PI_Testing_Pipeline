const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Category = {
  PROJECT: "project",
  COURSE: "course",
  WORKSHOP: "workshop",
  EXAM: "exam",
};

const activitySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "activity name is required"],
    },
    category: {
      type: String,
      enum: Category,
    },
    approval: {
      type: Boolean,
      required: true,
    },
    startDate: {
      type: Date,
      required: [true, "start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "end date is required"],
    },
    description: String,
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);
