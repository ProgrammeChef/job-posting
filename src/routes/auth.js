const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();


router.post("/googleRegister", async (req, res) => {
  const { gemail, gpassword } = req.body;
  const email = gemail;
  const password = gpassword

  // create new User object to be saved in Database
  const newUser = new User({
    email,
    password,
  });

  // Check if user already exist
  const user = await User.findOne({ email });
  if (user){
    jwt.sign(
      { userId: user.id },
      "sale",
      { expiresIn: 60 * 60 },
      (err, token) => {
        if (err) throw err;
        res.json({
          message: "success!",
          token,
          email,
        });
      }
    );
  }else{
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) throw err;
        // Add hashed password to new user object
        newUser.password = hash;
        //Save user to DB
        const user = await newUser.save();
        // create json web token and send it back to client side
        jwt.sign(
          { userId: user.id },
          "sale",
          { expiresIn: 60 * 60 },
          (err, token) => {
            if (err) throw err;
            res.json({
              message: "success!",
              token,
              email,
            });
          }
        );
      });
    });
  }
  // Generate Password Hash
  
});


router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (reg.test(email) === false)
    return res.status(400).json({ message: "Incorrect email format" });
  // Check user password length is more than 8 characters
  if (password.length < 6)
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });

  // create new User object to be saved in Database
  const newUser = new User({
    email,
    password,
  });

  // Check if user already exist
  const user = await User.findOne({ email });
  if (user)
    return res
      .status(400)
      .json({ message: "Email already registered. Please Login" });

  // Generate Password Hash
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) throw err;
      // Add hashed password to new user object
      newUser.password = hash;
      //Save user to DB
      const user = await newUser.save();
      // create json web token and send it back to client side
      jwt.sign(
        { userId: user.id },
        "sale",
        { expiresIn: 60 * 60 },
        (err, token) => {
          if (err) throw err;
          res.json({
            message: "success!",
            token,
            email,
          });
        }
      );
    });
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check user enters all fields
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Please enter enter email and password" });
  // Check for correct email
  const user = await User.findOne({ email });
  // if email not found
  if (!user)
    return res
      .status(400)
      .json({ message: "Email not found. Please register" });
  // if email found compare hashed password with incoming password
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) throw err;
    const match = result;
    if (!match) return res.status(401).json({ message: "Incorrect Password" });
    // create json web token and send it back to client side
    jwt.sign(
      { userId: user.id },
      "sale",
      { expiresIn: 60 * 60 },
      (err, token) => {
        if (err) throw err;
        res.json({
          message: "success!",
          token,
          email,
        });
      }
    );
  });
});

module.exports = router;
