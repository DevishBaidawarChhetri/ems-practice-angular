const mongoose = require("mongoose");
const leaveSchema = mongoose.Schema(
  {
    startDate:{
      type: String,
      required: true
    },
    endDate: {
      type: String,
      required: true,
    },
    leaveType: {
      type: String,
      required: true,
    },
    note:{
      type: String,
      trim: true,
      required: true,
      maxLength: 200,
    },
    leaveDay: {
      type: Number,
      trim: true,
    },
    leaveStatus: {
      type: Boolean,
      default: false
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USER"
    },
    name: {
      type: String
    }
  },
  {timestamps: true}
);

const Leave = mongoose.model("LEAVELOG", leaveSchema);
module.exports = Leave;
