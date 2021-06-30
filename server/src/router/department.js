const express = require("express");
const router = express.Router();

const DepartmentProvider = require("../model/departmentSchema");
const checkAuth = require("../middleware/auth");

/**
 * @route POST /api/department
 * @desc Add Department
 * @access Private
 */

router.post("/api/department", checkAuth, async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(422).json({ message: `Don't leave fields empty.` });
  }

  try {
    const departmentExists = await DepartmentProvider.findOne({ name });
    if (departmentExists) {
      return res.status(422).json({ message: "Department already exist." });
    } else {
      const departmentName = new DepartmentProvider({ name });
      await departmentName.save();
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
 * @route GET /api/departments
 * @desc GET all department
 * @access Private
 */

router.get("/api/departments", async (req, res) => {
  const currentPage = +req.query.currentPage;
  const pageSize = +req.query.pageSize;
  if (currentPage && pageSize) {
    const fetchedDepartments = await DepartmentProvider.find()
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
    const count = await DepartmentProvider.countDocuments();
    res.status(200).json({
      departments: fetchedDepartments,
      maxPosts: count,
      message: "Fetched Successfully.",
    });
  } else {
    const departments = await DepartmentProvider.find({});
    res.status(200).json(departments);
  }
});

/**
 * @route Delete /api/department/:id
 * @desc Delete department
 * @access Private
 */

router.delete("/api/department/:id", checkAuth, async (req, res) => {
  try {
    const depId = await DepartmentProvider.findOneAndDelete({
      _id: req.params.id,
    });
    if (depId) {
      return res.status(201).json({ message: `Department deleted.` });
    } else {
      return res.status(422).json({ message: `Department id not found.` });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error!",
    });
  }
});

/**
 * @route PUT /api/department/:id
 * @desc Update department
 * @access Private
 */

router.put("/api/department/:id", checkAuth, async (req, res) => {
  try {
    const departmentExists = await DepartmentProvider.findById({
      _id: req.params.id,
    });
    if (departmentExists) {
      return res.status(422).json({ message: "Department already exist." });
    }
    const depId = await DepartmentProvider.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    if (depId) {
      return res.status(201).json({ message: `Department updated.` });
    } else {
      return res.status(422).json({ message: `Department id not found.` });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error!",
    });
  }
});

module.exports = router;
