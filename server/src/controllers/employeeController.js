const EmployeeProvider = require("../models/employeeSchema");

/* Add Employee */
exports.addEmployee = async (req, res) => {
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
};

/* Get All Employee */
exports.getAllEmployee = async (req, res) => {
  try {
    const currentPage = +req.query.currentPage;
    const pageSize = +req.query.pageSize;
    if (currentPage && pageSize) {
      const fetchedEmployees = await EmployeeProvider.find()
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize);
      const count = await EmployeeProvider.countDocuments();
      res.status(200).json({
        employees: fetchedEmployees,
        maxPosts: count,
        message: "Fetched Successfully",
      });
    } else {
      const employees = await EmployeeProvider.find({});
      res.status(200).json(employees);
    }
  } catch (err) {
    res.status(500).json({
      message: "Server Error!",
    });
  }
};

/* Delete Employee */
exports.deleteEmployee = async (req, res) => {
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
};

/* Update Employee (PUT) */
exports.updateEmployee = async (req, res) => {
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
};
