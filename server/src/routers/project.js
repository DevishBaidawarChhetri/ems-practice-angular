const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const ProjectController = require("../controllers/projectController");

/* ------------- Add Project Begins ------------ */
/**
 * @route POST /api/v1/project
 * @desc Add Project
 * @access Private (Admin)
 */

router.post(
  "/",
  auth.checkAuth,
  auth.verifyAdmin,
  ProjectController.addProject
);
/* ------------- Add Project Ends ------------ */

/* ------------- Get Project Begins ------------ */
/**
 * @route GET /api/v1/project
 * @desc GET all project
 * @access Private
 */

router.get("/", auth.checkAuth, ProjectController.getProjects);
/* ------------- Get Project Ends ------------ */

/* ------------- Delete Project Begins ------------ */
/**
 * @route Delete /api/v1/project/:id
 * @desc Delete project
 * @access Private (Admin)
 */

router.delete(
  "/:id",
  auth.checkAuth,
  auth.verifyAdmin,
  ProjectController.deleteProject
);
/* ------------- Delete Project Ends ------------ */

/* ------------- Update Project Begins ------------ */
/**
 * @route PUT /api/v1/project/:id
 * @desc Update project
 * @access Private (Admin)
 */

router.put(
  "/:id",
  auth.checkAuth,
  auth.verifyAdmin,
  ProjectController.updateProject
);
/* ------------- Update Project Ends ------------ */

module.exports = router;
