const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../model/userSchema");
const validateRegisterSchema = require("../validationSchema/validateRegisterSchema");
const validateLoginSchema = require("../validationSchema/validateLoginSchema");

/**
 * @route POST /api/register
 * @desc Registration
 * @access Public
 */

router.post("/api/signup", validateRegisterSchema, async (req, res) => {
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
    if (password !== confirmPassword) {
      return res
        .status(422)
        .json({ error: `Password and confirm password not matched.` });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fullName,
      email,
      gender,
      phone,
      password: hashPassword,
      confirmPassword: hashPassword,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({
      message: "Server Error!",
    });
  }
});

/**
 * @route POST /api/user/login
 * @desc User Login
 * @access Public
 */

router.post("/api/login", validateLoginSchema, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials!",
      });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(401).json({
        message: "Invalid Credentials!",
      });
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      message: `Loggedin Successful`,
      token,
      expiresIn: 3600,
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error!",
    });
  }
});

/**
 * @route GET /api/user
 * @desc User Login
 * @access Private
 */

router.get("/api/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "User not found!" });
    }
    const user = await User.findById({ _id: id });
    res.status(401).json({ message: "User found!", user });
  } catch (error) {
    res.status(500).json({
      message: "Server Error!",
    });
  }
});

module.exports = router;
