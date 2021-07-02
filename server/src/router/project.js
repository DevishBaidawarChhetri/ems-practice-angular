const express = require("express");
const router = express.Router();

const ProjectProvider = require("../model/projectSchema");
const auth = require("../middleware/auth");

/**
 * @route POST /api/project
 * @desc Add Project
 * @access Private (Admin)
 */

router.post(
  "/api/project",
  auth.checkAuth,
  auth.verifyAdmin,
  async (req, res) => {
    try {
      const { projectName } = req.body;
      if (!projectName) {
        return res.status(422).json({ message: "Do not leave fields empty." });
      }
      const projectExists = await ProjectProvider.findOne({ projectName });
      if (projectExists) {
        return res.status(422).json({ message: "Project already exist." });
      } else {
        const name = new ProjectProvider({ projectName });
        const success = await name.save();
        if (success) {
          return res.status(201).json({ message: "Inserted Successfully" });
        } else {
          return res.status(400).json({ message: "Something went wrong" });
        }
      }
    } catch (error) {
      return res.status(500).json({
        message: "Server Error!",
      });
    }
  }
);

/**
 * @route GET /api/project
 * @desc GET all project
 * @access Private
 */

router.get(
  "/api/project",
  auth.checkAuth,
  auth.verifyAdmin,
  async (req, res) => {
    try {
      const projects = await ProjectProvider.find({});
      const count = await ProjectProvider.countDocuments();
      if (projects) {
        return res.status(200).json({
          message: "Fetched Successfully",
          projects,
          totalProjects: count,
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
 * @route Delete /api/project/:id
 * @desc Delete project
 * @access Private (Admin)
 */

router.delete(
  "/api/project/:id",
  auth.checkAuth,
  auth.verifyAdmin,
  async (req, res) => {
    try {
      const deleteProject = await ProjectProvider.findOneAndDelete({
        _id: req.params.id,
      });
      if (deleteProject) {
        return res.status(200).json({ message: "Project Deleted!" });
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
 * @route PUT /api/project/:id
 * @desc Update project
 * @access Private (Admin)
 */

router.put(
  "/api/project/:id",
  auth.checkAuth,
  auth.verifyAdmin,
  async (req, res) => {
    try {
      const updateProject = await ProjectProvider.findByIdAndUpdate(
        { _id: req.params.id },
        req.body
      );
      if (updateProject) {
        return res.status(200).json({ message: "Project Updated!" });
      } else {
        return res.status(400).json({ message: "Something went wrong." });
      }
    } catch (error) {
      return res.status(500).json({ message: "Server Error!" });
    }
  }
);

module.exports = router;
