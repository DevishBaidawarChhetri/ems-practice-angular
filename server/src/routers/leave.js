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

/* ------------- GET Leave Request Begins ------------ */
/**
 * @route GET /api/v1/leave
 * @desc get all leave
 * @access Private (Admin & User)
 */
router.get(
  '/',
  // auth.checkAuth,
  LeaveController.getAllLeaveRequest
);
/* ------------- GET Leave Request Ends ------------ */

/* ------------- Post Leave Request Begins ------------ */
/**
 * @route POST /api/v1/leave/myrequest
 * @desc Get all self leave request
 * @access Private (User)
 */
router.get(
  '/myrequest',
  auth.checkAuth,
  auth.verifyUser,
  LeaveController.getSelfLeaveRequest
);
/* ------------- Post Leave Request Ends ------------ */

/* ------------- Approve Leave Request Begins ------------ */
/**
 * @route PATCH /api/v1/leave/approve/:id
 * @desc approve leave request
 * @access Private (Admin)
 */
router.patch(
  '/approve/:id',
  auth.checkAuth,
  auth.verifyAdmin,
  LeaveController.approveLeaveRequest
);
/* ------------- Approve Leave Request Ends ------------ */

/* ------------- Delete Leave Request Begins ------------ */
/**
 * @route Delete /api/v1/leave/delete/:id
 * @desc delete leave request
 * @access Private (User)
 */
router.delete(
  '/delete/:id',
  auth.checkAuth,
  auth.verifyUser,
  LeaveController.deleteLeaveRequest
);
/* ------------- Delete Leave Request Ends ------------ */

module.exports = router;
