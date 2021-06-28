const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mailgun = require("mailgun-js");
const DOMAIN = "sandboxda700bbe2400498aa2a57df518c7edfe.mailgun.org";
const mg = mailgun({
  apiKey: "05ba591affee72d43523c46bd9e50071-aff8aa95-faf83779",
  // apiKey: process.env.MAILGUN_API_KEY,
  domain: DOMAIN,
});

const User = require("../model/userSchema");
const validateRegisterSchema = require("../validationSchema/validateRegisterSchema");
const validateLoginSchema = require("../validationSchema/validateLoginSchema");
const validateProfileUpdateSchema = require("../validationSchema/validateProfileUpdateSchema");
const checkAuth = require("../middleware/auth");

/**
 * @route POST /api/register
 * @desc Registration for email signup
 * @access Public
 */

router.post("/api/signup", validateRegisterSchema, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, gender, email, phone, password, confirmPassword, image } =
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
    const token = jwt.sign(
      {
        fullName,
        email,
        phone,
        gender,
        password: hashPassword,
        confirmPassword: hashPassword,
        image,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    const data = {
      from: "noreply@emsDevish.com",
      to: email,
      subject: "Account Activation Link",
      html: `
        <h2>Please click on given link to activate your account.</h2>
        <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
      `,
    };
    mg.messages().send(data, function (error, body) {
      if (error) {
        return res.json({ message: error.message });
      }
      return res.json({
        message: "Email has been sent to your email, activate it.",
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error!",
    });
  }
});

/**
 * @route POST /api/email-activate
 * @desc Activate Account through provided link in email
 * @access Public
 */

router.post("/api/email-activate", async (req, res) => {
  try {
    const { token } = req.body;
    if (token) {
      const validToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (!validToken) {
        return res.status(400).json({ message: "Incorrect or expired link" });
      }
      const { fullName, email, phone, gender, password, confirmPassword } =
        validToken;
      const userExists = await User.findOne({ email: email });
      if (userExists) {
        return res.status(422).json({ error: `Email already exist.` });
      }
      const user = new User({
        fullName,
        email,
        gender,
        phone,
        password,
        confirmPassword: password,
      });
      await user.save();
      return res.status(201).json({ message: "User registered successfully." });
    }
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
 * @desc Get user profile
 * @access Private
 */

router.get("/api/user/:id", checkAuth, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "User not found!" });
    }
    const user = await User.findById({ _id: id });
    res.status(200).json({ message: "User found!", user });
  } catch (error) {
    res.status(500).json({
      message: "Server Error!",
    });
  }
});

/**
 * @route Patch /api/user
 * @desc Update user profile
 * @access Private
 */

router.patch(
  "/api/user/:id",
  checkAuth,
  validateProfileUpdateSchema,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "User not found!" });
    }
    try {
      const { fullName, gender, email, phone, image } = req.body;
      const result = await User.updateOne(
        { _id: id },
        { fullName, email, gender, phone, image }
      );
      if (result.n > 0) {
        return res
          .status(200)
          .json({ message: "User profile updated successfully." });
      } else {
        return res.status(401).json({ message: "Not authorized!" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Server Error!",
      });
    }
  }
);

/**
 * @route Patch /api/user/password
 * @desc Update user password
 * @access Private
 */

router.patch("/api/user/:id/password", checkAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { password, confirmPassword } = req.body;
    if (!id) {
      return res.status(404).json({ message: "User not found!" });
    }
    if (password !== confirmPassword) {
      return res
        .status(422)
        .json({ message: `Password and confirm password not matched.` });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await User.updateOne(
      { _id: id },
      { password: hashPassword, confirmPassword: hashPassword }
    );
    if (result.n > 0) {
      return res
        .status(200)
        .json({ message: "Password updated successfully." });
    } else {
      return res.status(401).json({ message: "Not authorized!" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error!",
    });
  }
});

module.exports = router;
