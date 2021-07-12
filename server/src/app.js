const express = require("express");
const userRouter = require("./routers/user");
const departmentRouter = require("./routers/department");
const employeeRouter = require("./routers/employee");
const projectRouter = require("./routers/project");
const timelogRouter = require("./routers/timelog");
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
app.use("/api/v1/department", departmentRouter);
app.use("/api/v1/employee", employeeRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/timelog", timelogRouter);

// Server Port
app.listen(port || 3000, () => {
  console.log(`Server running on port ${port}`);
});
