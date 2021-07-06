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

      const addTimelog = await timelog.save();
      if (addTimelog) {
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

module.exports = router;
