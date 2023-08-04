const express = require("express");
const mongoose = require("mongoose");
const validator = require("validator");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const authRoutes = require("./Routes/authRoutes");
const userRoutes = require("./Routes/userRoutes");

const app = express();
 
app.use(bodyParser.json());

//db URL attach
const dbURL =
  "mongodb+srv://shubhamkhatik:shubham123@cluster0.3suw6bo.mongodb.net/?retryWrites=true&w=majority ";

mongoose
  .connect(dbURL, { userNewUrlParser: true })
  .then(() => {
    console.log("Connected to DB successfully");
  })
  .catch((err) => {
    console.log("Couldn't connect to the database", err);
  });

authRoutes(app);
userRoutes(app);

app.listen(3000, () => {
  console.log("Server is running on PORT 3000");
});
