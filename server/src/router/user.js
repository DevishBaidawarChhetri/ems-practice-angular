const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");

const User = require("../model/userSchema");
const validateRegisterSchema = require("../validationSchema/validateRegisterSchema");

router.post("/api/register", validateRegisterSchema, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, gender, email, phone, password, confirmPassword } =
    req.body;

  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(422).json({ error: `Email already exist.` });
    }
    const phoneExists = await User.findOne({ phone: phone });
    if (phoneExists) {
      return res.status(422).json({ error: `Phone already exist.` });
    }
    const user = new User({
      fullName,
      email,
      gender,
      phone,
      password,
      confirmPassword,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
