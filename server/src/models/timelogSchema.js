const mongoose = require("mongoose");
const timelogSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    projectName: {
      type: String,
      trim: true,
      required: true,
    },
    durationInHours: {
      type: Number,
      default: 0,
    },
    durationInMinutes: {
      type: Number,
      default: 0,
    },
    taskSummary: {
      type: String,
      trim: true,
      required: true,
      maxLength: 200
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USER",
    },
  },
  { timestamps: true }
);

const Timelog = mongoose.model("TIMELOG", timelogSchema);
module.exports = Timelog;
