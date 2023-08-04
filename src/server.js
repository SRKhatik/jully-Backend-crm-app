const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config() //allways dotenv import on the top of configs either it goes error
const authRoutes = require("./Routes/authRoutes");
const userRoutes = require("./Routes/userRoutes");
const { DB_URL } = require("./Configs/db.configs");
const serverConfigs = require("./Configs/server.configs");


const app = express();
app.use(bodyParser.json());

console.log(process.env)
//db URL attach
mongoose
  .connect(DB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to DB successfully");
  })
  .catch((err) => {
    console.log("Couldn't connect to the database", err);
  });

authRoutes(app);
userRoutes(app);

app.listen(serverConfigs.PORT, () => {
  console.log(`Server is running on PORT ${serverConfigs.PORT}`);
});
