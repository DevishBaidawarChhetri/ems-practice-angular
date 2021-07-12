const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const DepartmentController = require("../controllers/departmentController");

/**
 * @route POST /api/v1/department
 * @desc Add Department
 * @access Private
 */

router.post(
  "/",
  auth.checkAuth,
  auth.verifyAdmin,
  DepartmentController.addDepartment
);

/**
 * @route GET /api/v1/department
 * @desc GET all department
 * @access Private
 */

router.get(
  "/",
  auth.checkAuth,
  auth.verifyAdmin,
  DepartmentController.getAllDepartment
);

/**
 * @route Delete /api/v1/department/:id
 * @desc Delete department
 * @access Private
 */

router.delete(
  "/:id",
  auth.checkAuth,
  auth.verifyAdmin,
  DepartmentController.deleteOneDepartment
);

/**
 * @route PUT /api/v1/department/:id
 * @desc Update department
 * @access Private
 */

router.put(
  "/:id",
  auth.checkAuth,
  auth.verifyAdmin,
  DepartmentController.putDepartment
);

module.exports = router;
