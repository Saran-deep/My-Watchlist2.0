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
      return res.status(400).json({ message: "Email already registerd." });

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

    res.header("Authorization", `Bearer ${accessToken}`).status(200).json({
      accessToken,
      refreshToken,
      userId,
      message: "User registerd successfully.",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", Validator("login"), async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(403).json({ message: "Incorrect email or password." });

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res.status(403).json({ message: "Incorrect email or password." });

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
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/refresh-token", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token found." });

  try {
    let user;
    try {
      user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      return res.status(498).json({ message: "Invalid Token" });
    }

    const newAccessToken = generateToken(user);
    const newRefreshToken = generateRereshToken(user);

    const tokenInDB = await Tokens.findOne({
      $and: [{ userId: user._id }, { refreshToken: refreshToken }],
    });

    if (!tokenInDB)
      return res
        .status(400)
        .json({ message: "User or Token doesn't exist in the DB" });

    const newToken = await updateToken({
      res,
      userId: user._id,
      refreshToken: newRefreshToken,
      accessToken: newAccessToken,
    });

    res
      .header("Authorization", `Bearer ${newToken.accessToken}`)
      .status(200)
      .json({
        accessToken: newToken.accessToken,
        refreshToken: newToken.refreshToken,
      });
  } catch (err) {
    return res.status(500).json({ mesage: err.message });
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
      return res
        .status(404)
        .json({ message: "No Token found in the database for the user" });

    return newToken;
  } catch (err) {
    return res.status(500).json({ mesage: err.message });
  }
};

const generateToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "24h",
  });
};

const generateRereshToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = router;
