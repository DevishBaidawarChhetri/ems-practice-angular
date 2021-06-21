const express = require("express");
const userRouter = require("./router/user");
const departmentRouter = require("./router/department");
const employeeRouter = require("./router/employee");
const cors = require("cors");

require("dotenv").config();
require("./db/conn");

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/", userRouter);
app.use("/", departmentRouter);
app.use("/", employeeRouter);

// Server Port
app.listen(port || 3000, () => {
  console.log(`Server running on port ${port}`);
});
