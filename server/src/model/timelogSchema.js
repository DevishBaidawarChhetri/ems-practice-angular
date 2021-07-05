const mongoose = require("mongoose");
const timelogSchema = new mongoose.Schema(
  {
    date: {
      type: String,
    },
    projectName: {
      type: String,
      trim: true,
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
    },
  },
  { timestamps: true }
);

const Timelog = mongoose.model("TIMELOG", timelogSchema);
module.exports = Timelog;
