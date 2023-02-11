require("dotenv").config();
const create_newUser = require("./api/createUser");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const connectDB = require("./config/dbConnection");
app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

connectDB(process.env.DB_URI);

app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/create_user", (req, res) => {
  create_newUser();
  res.send("done");
});



const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log("listening on port 80");
});
