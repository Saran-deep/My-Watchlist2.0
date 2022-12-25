const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const Validator = require("../middlewares/Validator");

const User = require("../model/User");
const Tokens = require("../model/Tokens");

const router = express.Router();

dotenv.config();

router.post("/signup", Validator("signup"), async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const emailExist = await User.findOne({ email: email });
    if (emailExist)
      return res
        .status(400)
        .json({ message: "Email already registerd.", status: false });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const newToken = new Tokens({
      userId: user._id,
      accessToken: generateToken(user),
      refreshToken: generateRereshToken(user),
    });

    const {
      _doc: { accessToken, refreshToken, userId },
    } = await newToken.save();

    res.header("Authorization", `Bearer ${accessToken}`).status(201).json({
      accessToken,
      refreshToken,
      userId,
      message: "User registerd successfully.",
      status: true,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, status: false });
  }
});

router.post("/login", Validator("login"), async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(401)
        .json({ message: "Incorrect email or password.", status: false });

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res
        .status(401)
        .json({ message: "Incorrect email or password.", status: false });

    const accessToken = generateToken(user);
    const refreshToken = generateRereshToken(user);

    const newToken = await updateToken({
      res,
      userId: user._id,
      refreshToken,
      accessToken,
    });

    res
      .header("Authorization", `Bearer ${newToken.accessToken}`)
      .status(200)
      .json({
        message: "User logged in successfully.",
        accessToken: newToken.accessToken,
        refreshToken: newToken.refreshToken,
        status: true,
      });
  } catch (err) {
    res.status(500).json({ message: err.message, status: false });
  }
});

router.get("/refresh-token", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res
      .status(401)
      .json({ message: "No refresh token found.", status: false });

  try {
    let user;
    try {
      user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      if (err.message === "invalid signature")
        return res
          .status(498)
          .json({ message: "Invalid Token", status: false });
      return res.status(498).json({ message: err.message, status: false });
    }

    const newAccessToken = generateToken(user);
    const newRefreshToken = generateRereshToken(user);

    const tokenInDB = await Tokens.findOne({
      $and: [{ userId: user.userId }, { refreshToken: refreshToken }],
    });

    if (!tokenInDB)
      return res.status(404).json({
        message: "User or Token doesn't exist in the DB",
        status: false,
      });

    const newToken = await updateToken({
      res,
      userId: user.userId,
      refreshToken: newRefreshToken,
      accessToken: newAccessToken,
    });

    res
      .header("Authorization", `Bearer ${newToken.accessToken}`)
      .status(201)
      .json({
        accessToken: newToken.accessToken,
        refreshToken: newToken.refreshToken,
        status: true,
      });
  } catch (err) {
    return res.status(500).json({ mesage: err.message, status: false });
  }
});

const updateToken = async ({ res, userId, accessToken, refreshToken }) => {
  try {
    const newToken = await Tokens.findOneAndUpdate(
      { userId: userId },
      { $set: { accessToken: accessToken, refreshToken: refreshToken } },
      { new: true }
    );

    if (!newToken)
      return res.status(404).json({
        message: "No Token found in the database for the user",
        status: false,
      });

    return newToken;
  } catch (err) {
    return res.status(503).json({ mesage: err.message, status: false });
  }
};

const generateToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "24h",
  });
};

const generateRereshToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "15d",
  });
};

module.exports = router;
