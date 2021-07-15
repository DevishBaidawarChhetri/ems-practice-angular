const express = require("express");
const LeaveController = require("../controllers/leaveController");
const router = express.Router();

const auth = require("../middleware/auth");

/* ------------- Post Leave Request Begins ------------ */
/**
 * @route POST /api/v1/leave
 * @desc Request leave
 * @access Private (User)
 */
router.post(
  '/',
  auth.checkAuth,
  auth.verifyUser,
  LeaveController.requestLeave
);
/* ------------- Post Leave Request Ends ------------ */

/* ------------- Post Leave Request Begins ------------ */
/**
 * @route POST /api/v1/leave
 * @desc Request leave
 * @access Private (User)
 */
router.get(
  '/',
  auth.checkAuth,
  LeaveController.getAllLeaveRequest
);
/* ------------- Post Leave Request Ends ------------ */

module.exports = router;
