const { body } = require("express-validator");

const validateLoginSchema = [
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("Email must contain a valid email address."),

  body("password")
    .exists({ checkFalsy: true })
    .withMessage("Password must be at least 5 characters long."),
];

module.exports = validateLoginSchema;
