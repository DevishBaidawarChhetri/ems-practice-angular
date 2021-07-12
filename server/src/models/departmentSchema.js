const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Department = mongoose.model("DEPARTMENT", departmentSchema);
module.exports = Department;
