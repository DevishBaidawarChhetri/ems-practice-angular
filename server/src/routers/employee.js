const express = require("express");
const EmployeeController = require("../controllers/employeeController");
const router = express.Router();

const auth = require("../middleware/auth");

/* ------------- Add Employee Begins ------------ */
/**
 * @route POST /api/v1/employee
 * @desc Add Employee
 * @access Private
 */

router.post(
  "/",
  auth.checkAuth,
  auth.verifyAdmin,
  EmployeeController.addEmployee
);
/* ------------- Add Employee Ends ------------ */

/* ------------- Get Employee Begins ------------ */
/**
 * @route GET /api/v1/employee
 * @desc Get all employee
 * @access Private
 */

router.get(
  "/",
  auth.checkAuth,
  auth.verifyAdmin,
  EmployeeController.getAllEmployee
);
/* ------------- Get Employee Ends ------------ */

/* ------------- Delete Employee Begins ------------ */
/**
 * @route Delete /api/v1/employee/:id
 * @desc Delete Employee
 * @access Private
 */

router.delete(
  "/:id",
  auth.checkAuth,
  auth.verifyAdmin,
  EmployeeController.deleteEmployee
);
/* ------------- Delete Employee Ends ------------ */

/* ------------- Update Employee Begins ------------ */
/**
 * @route PUT /api/employee/:id
 * @desc Update employee details
 * @access Private
 */

router.put(
  "/:id",
  auth.checkAuth,
  auth.verifyAdmin,
  EmployeeController.updateEmployee
);
/* ------------- Update Employee Ends ------------ */

module.exports = router;
