const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const validateTimelogSchema = require("../validationSchema/validateTimelogSchema");
const TimelogController = require("../controllers/timelogController");

/* ------------- Add Timelog Begins ------------ */
/**
 * @route POST /api/v1/timelog
 * @desc Add timelog
 * @access Private (User)
 */
router.post(
  "/",
  validateTimelogSchema,
  auth.checkAuth,
  auth.verifyUser,
  TimelogController.addTimelog
);
/* ------------- Add Timelog Ends ------------ */

/* ------------- Get All Timelog Begins ------------ */
/**
 * @route GET /api/v1/timelog
 * @desc Get all timelog
 * @access Private (Admin)
 */
router.get(
  "/",
  validateTimelogSchema,
  auth.checkAuth,
  auth.verifyAdmin,
  TimelogController.getAllTimelog
);
/* ------------- Get All Timelog Ends ------------ */

/* ------------- Get Self Timelog Begins ------------ */
/**
 * @route GET /api/v1/timelog/mylog
 * @desc Get all self logged timelog as per date
 * @access Private (User)
 */
router.get(
  "/mylog",
  validateTimelogSchema,
  auth.checkAuth,
  auth.verifyUser,
  TimelogController.getSelfTimelog
);
/* ------------- Get Self Timelog Ends ------------ */

/* ------------- Get one Self-Timelog Begins ------------ */
/**
 * @route GET /api/v1/timelog/mylog/:id
 * @desc Get one self logged timelog
 * @access Private (User)
 */
router.get(
  "/mylog/:id",
  auth.checkAuth,
  auth.verifyUser,
  TimelogController.getSelfSelectedTimelog
);
/* ------------- Get one Self-Timelog Ends ------------ */

/* ------------- Delete Timelog Begins ------------ */
/**
 * @route DELETE /api/v1/timelog/:id
 * @desc Delete timelog
 * @access Private (User)
 */
router.delete(
  "/:id",
  auth.checkAuth,
  auth.verifyUser,
  TimelogController.deleteSelectedTimelog
);
/* ------------- Delete Timelog Ends ------------ */

/* ------------- Update Timelog Begins ------------ */
/**
 * @route PATCH /api/v1/timelog/:id
 * @desc PATCH timelog
 * @access Private (User)
 */
router.patch(
  "/:id",
  auth.checkAuth,
  auth.verifyUser,
  TimelogController.updateSelfTimelog
);
/* ------------- Update Timelog Ends ------------ */

/* ------------- Add Self Weekly Timelog Begins ------------ */
/**
 * @route GET /api/v1/timelog/weekly-log/:id
 * @desc GET week's timelog of user
 * @params id
 * @query startdate, enddate
 * @access Private (Admin / User)
 */
router.get(
  "/weekly-log/:id",
  auth.checkAuth,
  TimelogController.getWeeklyLogSelf
);
/* ------------- Get Self Weekly Timelog Ends ------------ */

module.exports = router;
