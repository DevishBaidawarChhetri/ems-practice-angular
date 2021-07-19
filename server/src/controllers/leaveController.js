const LeaveProvider = require("../models/leaveSchema");

/* Request Leave (POST) */
exports.requestLeave = async (req, res) => {
  try {
    const {startDate, endDate, leaveType, note} = req.body;

    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(startDate);
    const secondDate = new Date(endDate);
    const leaveDay = Math.round(Math.abs((firstDate - secondDate) / oneDay) +1);

    const leave = new LeaveProvider({
      startDate, endDate, leaveType, note, leaveDay, userId: req.userData.userId, name: req.userData.fullName
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

/* Get self requested leave logs */
exports.getSelfLeaveRequest = async (req, res) => {
  try {
    const getSelfLeave = await LeaveProvider.find({
      userId: req.userData.userId,
    });
    if (getSelfLeave) {
      return res.status(200).json({
        message: "Fetched successfully!",
        leaves: getSelfLeave,
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

/* Approve user leave request (Admin) */
exports.approveLeaveRequest = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await LeaveProvider.updateOne({ _id: id }, req.body);
    if (result.n > 0) {
      return res.status(200).json({
        message: "Leave approved!",
        leaveStatus: req.body.leaveStatus,
      });
    } else {
      return res.status(401).json({ message: "Not authorized!" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error!",
    });
  }
}

/* Delete leave request */
exports.deleteLeaveRequest = async(req, res) => {
  try {
    const { id } = req.params;
    const { leaveStatus } = await LeaveProvider.findOne({_id: id});
    if(leaveStatus === true){
      return res.status(403).json({ message: "Forbidden, Your request is already approved by admin!" });
    }
    const deleteLeave = await LeaveProvider.deleteOne({
      _id: id,
      userId: req.userData.userId,
    });
    if (deleteLeave.n > 0) {
      return res.status(200).json({ message: "Deleted Successful" });
    } else {
      return res.status(400).json({ message: "Something went wrong." });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server Error!",
    });
  }
}
