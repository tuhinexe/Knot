require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const connectDB = require("./config/dbConnection");
const signUpRouter = require("./routes/signup");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
  
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json())
app.use(express.static(path.join(__dirname, "..","frontend", "public")));
app.use("/login", loginRouter);
app.use("/signup", signUpRouter);
app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/auth", signUpRouter);

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
