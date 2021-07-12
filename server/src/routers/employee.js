const express = require("express");
const EmployeeController = require("../controllers/employeeController");
const router = express.Router();

const auth = require("../middleware/auth");

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

module.exports = router;
