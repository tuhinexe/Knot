require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const path = require("path");
const flash = require("connect-flash");
const app = express();
const session = require("express-session");
const connectDB = require("./config/dbConnection");
const homeRouter = require("./routes/home");
const signUpRouter = require("./routes/signup");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const forgotPasswordRouter = require("./routes/forgotpassword");
const postRouter = require("./routes/post");
const followersRouter = require("./routes/followers");
const pollsRouter = require("./routes/polls");
const challengesRouter = require("./routes/challenges");
const devApiRouter = require("./routes/devApi");
const pointsRouter = require("./routes/points");
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
app.use(flash());
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
app.get("/inactive", (req, res) => {
  res.send("ok");
});
app.use("/signup", signUpRouter);
app.use("/auth", authRouter);
app.use("/login", loginRouter);
app.use("/forgotpassword", forgotPasswordRouter);
app.use(checkAuthorized);

app.use("/", homeRouter)
app.use("/", followersRouter);
app.use("/profile", profileRouter);
app.use("/logout", logoutRouter);
app.use("/post", postRouter);
app.use("/polls", pollsRouter);
app.use("/challenges", challengesRouter)
app.use("/api/v1", devApiRouter);
app.use("/points", pointsRouter);

// https://knot-wbj8.onrender.com/challenges
// not the prodest thing we have done but it is what it is
// we are hosting this on render we are doing this cheap trick because we are not paying for the server and also we dont want the server to go to sleep 
setInterval(function() {
  // do something here
  console.log('INTERVAL',new Date().toLocaleString());
  fetch('https://knot-wbj8.onrender.com/inactive')
}, 300000);

//use wildcard to catch all routes
app.get("*", (req, res) => {
  res.render("404");
});


(async () => {
  await connectDB(process.env.DB_URI);
  const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log("listening on port 80");
});
})();
