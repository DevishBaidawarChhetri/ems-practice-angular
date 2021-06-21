const express = require("express");
const { findByIdAndUpdate } = require("../model/employeeSchema");
const router = express.Router();

const EmployeeProvider = require("../model/employeeSchema");

router.post("/api/employee", async (req, res) => {
  const { fullName, email, department, gender } = req.body;
  if (!fullName || !email || !department || !gender) {
    return res.status(422).json({ error: `Don't leave fields empty.` });
  }

  try {
    const employeeExists = await EmployeeProvider.findOne({ email });
    if (employeeExists) {
      return res.status(422).json({ error: `Employee's email already exist.` });
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
    console.error(error);
  }
});

router.get("/api/employees", async (req, res) => {
  try {
    const departments = await EmployeeProvider.find({});
    res.status(200).json(departments);
  } catch (err) {
    console.error(err);
  }
});

router.delete("/api/employee/:id", async (req, res) => {
  try {
    const empId = await EmployeeProvider.findOneAndDelete({
      _id: req.params.id,
    });
    if (empId) {
      return res.status(201).json({ message: `Employee deleted.` });
    } else {
      return res.status(422).json({ error: `Employee id not found.` });
    }
  } catch (error) {
    console.error(error);
  }
});

router.put("/api/employee/:id", async (req, res) => {
  try {
    const empId = await EmployeeProvider.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    if (empId) {
      return res.status(201).json({ message: `Employee updated.` });
    } else {
      return res.status(422).json({ error: `Employee id not found.` });
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
