require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const session = require("express-session");
const connectDB = require("./config/dbConnection");
const homeRouter = require("./routes/home");
const signUpRouter = require("./routes/signup");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const postRouter = require("./routes/post");
const pollsRouter = require("./routes/polls");
const devApiRouter = require("./routes/devApi");
const checkAuthorized = require("./middlewares/checkAuth");
const passportSetup = require("./config/passportConfig");
const passport = require("passport");
app.use(express.static(path.join(__dirname, "..", "frontend", "public")));
app.use(express.static("public"));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/signup", signUpRouter);
app.use("/auth", authRouter);
app.use("/login", loginRouter);
app.use(checkAuthorized);

app.use("/", homeRouter)
app.use("/profile", profileRouter);
app.use("/logout", logoutRouter);
app.use("/post", postRouter);
app.use("/poll",pollsRouter);
app.use("/api/v1", devApiRouter);
(async () => {
  await connectDB(process.env.DB_URI);
})();

//use wildcard to catch all routes
app.get("*", (req, res) => {
  res.render("404");
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log("listening on port 80");
});
