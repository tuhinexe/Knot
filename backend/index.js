require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const User = require("./models/Users");
const session = require("express-session");
const connectDB = require("./config/dbConnection");
const signUpRouter = require("./routes/signup");
const profileRouter = require("./routes/profile");
const loginRouter = require("./routes/login");
const passportSetup = require("./config/passportConfig");
const passport = require("passport");
app.use(express.static(path.join(__dirname, "..", "frontend", "public")));
app.use(express.static("public"));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// make a local mongoose strategy
passport.use(User.createStrategy());

//serialize and deserialize user
passport.serializeUser((user, done) => {
  console.log("serialized user");
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());


app.use("/signup", signUpRouter);
app.use("/auth", signUpRouter);
app.use("/profile", profileRouter);
app.use("/login", loginRouter);


(async () => {
  await connectDB(process.env.DB_URI);
})();

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log("listening on port 80");
});
