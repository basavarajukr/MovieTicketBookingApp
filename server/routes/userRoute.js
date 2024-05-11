const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

const User = require("../model/userModel");

// Route for register

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      res.send({
        success: false,
        message: "User Already Exists",
      });
    }

    // Hash password

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const newUser = await User(req.body);

    await newUser.save(); // save the data in db

    res.send({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

// Login route

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.send({
        success: false,
        message: "User not found, please register",
      });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      res.send({
        success: false,
        message: "Sorry Invalid password",
      });
    }

    const token = jwt.sign({ userId: user._id }, `${process.env.SECRET_KEY}`, {
      expiresIn: "1d",
    });

    res.send({
      success: true,
      user: user,
      message: "User logged In",
      token: token,
    });
  } catch (error) {}
});

router.get("/get-current-user", authMiddleware, async (req, res) => {
  const user = await User.findById(req.body.userId).select("-password");

  console.log(user);
  res.send({
    success: true,
    data: user,
    message: "User Authorized",
  });
});

module.exports = router;
