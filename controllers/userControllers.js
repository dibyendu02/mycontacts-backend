const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//desc register
//route GET /api/user/register
//access public

const userRegister = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandetory");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  // console.log("hashed password is " + hashedPassword);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  res.status(201).send(user);
});

//desc login
//route GET /api/user/login
//access public

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("email and password are mandetory");
  } else {
    const user = await User.findOne({ email });
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      console.log("logged in succesfully");
      res.status(200).json({ token });
    } else {
      console.log("wrong credentials");
      res.status(400);
      throw new Error("wrong credentials");
    }
  }
});

//desc get current user data
//route GET /api/user/current
//access private

const currentUser = asyncHandler(async (req, res) => {
  const userData = req.user;
  res.status(200).send(userData);
});

module.exports = { userRegister, userLogin, currentUser };
