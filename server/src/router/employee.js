const express = require("express");
const router = express.Router();

const EmployeeProvider = require("../model/employeeSchema");
const checkAuth = require("../middleware/auth");

/**
 * @route POST /api/employee
 * @desc Add Employee
 * @access Private
 */

router.post("/api/employee", checkAuth, async (req, res) => {
  const { fullName, email, department, gender } = req.body;
  if (!fullName || !email || !department || !gender) {
    return res.status(422).json({ message: `Don't leave fields empty.` });
  }

  try {
    const employeeExists = await EmployeeProvider.findOne({ email });
    if (employeeExists) {
      return res
        .status(422)
        .json({ message: `Employee's email already exist.` });
    } else {
      const employee = new EmployeeProvider({
        fullName,
        email,
        department,
        gender,
      });
      await employee.save();
      res.status(201).json({
        message: "Inserted Successfully.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error!",
    });
  }
});

/**
 * @route GET /api/employees
 * @desc Get all employees
 * @access Private
 */

router.get("/api/employees", checkAuth, async (req, res) => {
  try {
    const departments = await EmployeeProvider.find({});
    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json({
      message: "Server Error!",
    });
  }
});

/**
 * @route Delete /api/employee/:id
 * @desc Delete Employee
 * @access Private
 */

router.delete("/api/employee/:id", checkAuth, async (req, res) => {
  try {
    const empId = await EmployeeProvider.findOneAndDelete({
      _id: req.params.id,
    });
    if (empId) {
      return res.status(201).json({ message: `Employee deleted.` });
    } else {
      return res.status(422).json({ message: `Employee id not found.` });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error!",
    });
  }
});

/**
 * @route PUT /api/employee/:id
 * @desc Update employee details
 * @access Private
 */

router.put("/api/employee/:id", async (req, res) => {
  try {
    const empId = await EmployeeProvider.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    if (empId) {
      return res.status(201).json({ message: `Employee updated.` });
    } else {
      return res.status(422).json({ message: `Employee id not found.` });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error!",
    });
  }
});

module.exports = router;
