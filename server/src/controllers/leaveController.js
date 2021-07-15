const LeaveProvider = require("../models/leaveSchema");

/* Request Leave (POST) */
exports.requestLeave = async (req, res) => {
  try {
    const {startDate, endDate, leaveType, note} = req.body;
    const leave = new LeaveProvider({
      startDate, endDate, leaveType, note, userId: req.userData.userId
    })
    const requestLeave = await leave.save();
    if(requestLeave){
      return res.status(201).json({
        message: "Requested for leave.",
      });
    } else {
      return res.status(400).json({ message: "Something went wrong." });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server Error!",
    });
  }
}

/* View all leave request (GET) */
exports.getAllLeaveRequest = async (req, res) => {
  try {
    const getLeaves = await LeaveProvider.find();
    if(getLeaves) {
      return res.status(200).json({
        message: "Fetched leaves!",
        leaves: getLeaves,
      });
    } else {
      return res.status(400).json({ message: "Something went wrong." });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server Error!",
    });
  }
}
