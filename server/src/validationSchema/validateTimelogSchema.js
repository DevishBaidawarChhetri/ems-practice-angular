const { body } = require("express-validator");

const validateRegisterSchema = [
  body("date")
    .exists({ checkFalsy: true })
    .withMessage("Date should not be empty."),
  body("projectName")
    .exists({ checkFalsy: true })
    .withMessage("Project name should not be empty"),
  body("taskSummary")
    .exists({ checkFalsy: true })
    .withMessage("Task summary should not be empty"),
];
module.exports = validateRegisterSchema;
