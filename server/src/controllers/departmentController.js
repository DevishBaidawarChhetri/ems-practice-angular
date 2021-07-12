const DepartmentProvider = require("../models/departmentSchema");

/* Adding New Department */
exports.addDepartment = async (req, res) => {
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
};

/* Get All departments */
exports.getAllDepartment = async (req, res) => {
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
};

/* Delete individual department */
exports.deleteOneDepartment = async (req, res) => {
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
};

/* Update Department (PUT) */
exports.putDepartment = async (req, res) => {
  try {
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
};
