require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const connectDB = require("./config/dbConnection");
const loginRouter = require("./routes/login");
const signUpRouter = require("./routes/signup");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/login", loginRouter);
app.use("/signup", signUpRouter);

(async () => {
  await connectDB(process.env.DB_URI);
})();


app.get("/create_user", (req, res) => {
  // create_newUser();
  res.send("done");
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log("listening on port 80");
});
