const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");

const TimelogProvider = require("../model/timelogSchema");
const auth = require("../middleware/auth");
const validateTimelogSchema = require("../validationSchema/validateTimelogSchema");

/**
 * @route POST /api/timelog
 * @desc Add timelog
 * @access Private (User)
 */

router.post(
  "/api/timelog",
  validateTimelogSchema,
  auth.checkAuth,
  auth.verifyUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        date,
        projectName,
        durationInHours,
        durationInMinutes,
        taskSummary,
      } = req.body;

      const timelog = new TimelogProvider({
        date,
        projectName,
        durationInHours,
        durationInMinutes,
        taskSummary,
        userId: req.userData.userId,
      });

      const postTimelog = await timelog.save();
      if (postTimelog) {
        return res.status(201).json({
          message: "Time logged!",
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
);

/**
 * @route GET /api/timelog
 * @desc Get all timelog
 * @access Private (Admin)
 */

router.get(
  "/api/timelog",
  validateTimelogSchema,
  auth.checkAuth,
  auth.verifyAdmin,
  async (req, res) => {
    try {
      const getTimelog = await TimelogProvider.find();
      const totalTimelog = await TimelogProvider.countDocuments();
      if (getTimelog) {
        return res.status(200).json({
          message: "Fetched logged!",
          logs: getTimelog,
          counts: totalTimelog,
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
);

/**
 * @route GET /api/timelog/mylog
 * @desc Get all self logged timelog as per date
 * @access Private (User)
 */

router.get(
  "/api/timelog/mylog",
  validateTimelogSchema,
  auth.checkAuth,
  auth.verifyUser,
  async (req, res) => {
    try {
      const selectedDate = req.query.date;
      const getTimelog = await TimelogProvider.find({
        userId: req.userData.userId,
        date: selectedDate,
      });
      if (getTimelog) {
        return res.status(200).json({
          message: "Fetched logged!",
          logs: getTimelog,
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
);

/**
 * @route GET /api/timelog/mylog/:id
 * @desc Get one self logged timelog
 * @access Private (User)
 */

router.get(
  "/api/timelog/mylog/:id",
  auth.checkAuth,
  auth.verifyUser,
  async (req, res) => {
    try {
      const { id } = req.params;
      const getOneDetailedLog = await TimelogProvider.find({
        _id: id,
        userId: req.userData.userId,
      });
      if (getOneDetailedLog) {
        return res.status(200).json({
          message: "Fetched successfully!",
          log: getOneDetailedLog,
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
);

/**
 * @route DELETE /api/timelog/:id
 * @desc Delete timelog
 * @access Private (User)
 */

router.delete(
  "/api/timelog/:id",
  auth.checkAuth,
  auth.verifyUser,
  async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTimelog = await TimelogProvider.deleteOne({
        _id: id,
        userId: req.userData.userId,
      });
      if (deleteTimelog.n > 0) {
        return res.status(200).json({ message: "Delete Successful" });
      } else {
        return res.status(400).json({ message: "Something went wrong." });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Server Error!",
      });
    }
  }
);

/**
 * @route PATCH /api/timelog/:id
 * @desc PATCH timelog
 * @access Private (User)
 */

router.patch(
  "/api/timelog/:id",
  auth.checkAuth,
  auth.verifyUser,
  async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).json({ message: "User not found!" });
      }
      const {
        date,
        projectName,
        durationInHours,
        durationInMinutes,
        taskSummary,
      } = req.body;
      const patchTimelog = await TimelogProvider.updateOne(
        { _id: id },
        { date, projectName, durationInHours, durationInMinutes, taskSummary }
      );
      if (patchTimelog.n > 0) {
        return res
          .status(200)
          .json({ message: "Timelog updated successfully." });
      } else {
        return res.status(401).json({ message: "Something went wrong." });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Server Error!",
      });
    }
  }
);

/**
 * @route GET /api/weekly-log/:id
 * @desc GET week's timelog of user
 * @params id
 * @query startdate, enddate
 * @access Private (Admin / User)
 */

router.get("/api/weekly-log/:id", auth.checkAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { startdate, enddate } = req.query;
    const getWeeklyLog = await TimelogProvider.find({
      userId: id,
      date: {
        $gte: startdate,
        $lte: enddate,
      },
    }).sort({ date: "asc" });
    if (getWeeklyLog) {
      return res.status(200).json({
        message: "Successfully fetched!",
        weeklyLogs: getWeeklyLog,
      });
    } else {
      return res.status(401).json({ message: "Something went wrong." });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server Error!",
    });
  }
});

module.exports = router;
