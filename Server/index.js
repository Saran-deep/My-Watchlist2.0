const express = require("express");
const connectToDb = require("./config/db");
const dotenv = require("dotenv");
const user = require("./routes/user");
const home = require("./routes/home");

dotenv.config();

const app = express();

connectToDb();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/user", user);

app.use("/", home);

app.get("/", (req, res) => {
  res.json({ status: 200, message: "API Working" });
});

app.listen(port, () => {
  console.log(`Server is up and running at port ${port}`);
});
