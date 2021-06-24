const { body } = require("express-validator");

const validateProfileUpdateSchema = [
  body("fullName")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Full name must be at least 6 characters long."),
  body("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Email must contain a valid email address."),
  body("gender")
    .exists({ checkFalsy: true })
    .withMessage("Gender must me valid."),
  body("phone")
    .exists({ checkFalsy: true })
    .isNumeric()
    .withMessage("Phone must contain numbers only."),
];
module.exports = validateProfileUpdateSchema;
