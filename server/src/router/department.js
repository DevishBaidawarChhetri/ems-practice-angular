const express = require("express");
const router = express.Router();

const DepartmentProvider = require("../model/departmentSchema");

router.post("/api/department", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(422).json({ error: `Don't leave fields empty.` });
  }

  try {
    const departmentExists = await DepartmentProvider.findOne({ name });
    if (departmentExists) {
      return res.status(422).json({ error: "Department already exist." });
    } else {
      const departmentName = new DepartmentProvider({ name });
      await departmentName.save();
      res.status(201).json({
        message: "Inserted Successfully.",
      });
    }
  } catch (error) {
    console.error(error);
  }
});

router.get("/api/departments", async (req, res) => {
  try {
    const departments = await DepartmentProvider.find({});
    res.status(200).json(departments);
  } catch (err) {
    console.error(err);
  }
});

router.delete("/api/department/:id", async (req, res) => {
  try {
    const depId = await DepartmentProvider.findOneAndDelete({
      _id: req.params.id,
    });
    if (depId) {
      return res.status(201).json({ message: `Department deleted.` });
    } else {
      return res.status(422).json({ error: `Department id not found.` });
    }
  } catch (error) {
    console.error(error);
  }
});

router.put("/api/department/:id", async (req, res) => {
  try {
    const depId = await DepartmentProvider.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    if (depId) {
      return res.status(201).json({ message: `Department updated.` });
    } else {
      return res.status(422).json({ error: `Department id not found.` });
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
