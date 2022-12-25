const jwt = require("jsonwebtoken");

module.exports = validateToken = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];

  if (!token) return res.status(401).send("Access denied. No token found.");

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid Token", status: false });
  }
};
