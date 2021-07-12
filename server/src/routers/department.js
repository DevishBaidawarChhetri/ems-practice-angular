const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const DepartmentController = require("../controllers/departmentController");

/* ------------- Add Department Begins ------------ */
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
/* ------------- Add Department Ends ------------ */

/* ------------- Get Department Begins ------------ */
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
/* ------------- Get Department Ends ------------ */

/* ------------- Delete Department Begins ------------ */
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
/* ------------- Delete Department Ends ------------ */

/* ------------- Update Department Begins ------------ */
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
/* ------------- Update Department Ends ------------ */

module.exports = router;
