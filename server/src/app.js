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
const basePath = "/api/v1";
app.use(`${basePath}/user`, userRouter);
app.use(`${basePath}/department`, departmentRouter);
app.use(`${basePath}/employee`, employeeRouter);
app.use(`${basePath}/project`, projectRouter);
app.use(`${basePath}/timelog`, timelogRouter);

// Server Port
app.listen(port || 3000, () => {
  console.log(`Server running on port ${port}`);
});
