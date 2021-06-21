const express = require("express");
const router = express.Router();

const User = require("../model/userSchema");

router.post("/api/register", async (req, res) => {
  const {
    fullName,
    gender,
    email,
    username,
    phone,
    password,
    confirmPassword,
  } = req.body;
  if (
    !fullName ||
    !gender ||
    !email ||
    !username ||
    !phone ||
    !password ||
    !confirmPassword
  ) {
    return res.status(422).json({ error: `Don't leave fields empty.` });
  }

  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(422).json({ error: `Email already exist.` });
    } else {
      const user = new User({
        fullName,
        gender,
        email,
        username,
        phone,
        password,
        confirmPassword,
      });
      await user.save();
      res.status(201).json({ message: "User registered successfully." });
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
