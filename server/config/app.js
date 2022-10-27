//Installed 3rd party packages
const createError = require("http-errors");
const express = require("express");
const path = require("path");
//initialize flash
const indexRouter = require("../routes/index");
const usersRouter = require("../routes/users");
const contactRouter = require("../routes/contact");

const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
//modules for authentication

const session = require("express-session");
const passport = require("passport");
const passportLocal = require("passport-local");
const localStrategy = passportLocal.Strategy;
const flash = require("connect-flash");

//database setup

const mongoose = require("mongoose");
const DB = require("./db");

//point mongoose to the DB URI

mongoose.connect(DB.URI);

const mongoDB = mongoose.connection;
mongoDB.on("error", console.error.bind(console, "Connection Error:"));
mongoDB.once("open", () => {
  console.log("Connected to MongoDB...");
});


const app = express();

//setup express session
app.use(
  session({
    secret: "SomeSecret",
    saveUninitialized: false,
    resave: false,
  })
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//initialize passport
app.use(passport.initialize());
app.use(passport.session());


app.use(flash());
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/contact-list", contactRouter);



// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs"); //express -e

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../public")));
app.use(express.static(path.join(__dirname, "../../node_modules")));



//passport user configuration

// create a User Model instance
const userModel = require("../models/user");
const User = userModel.User;

//implement a User Authentication Strategy
passport.use(User.createStrategy());

//serialize and deserialize the User info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { title: "Error" });
});

module.exports = app;
