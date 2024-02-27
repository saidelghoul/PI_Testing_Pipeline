var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var activitiesRouter = require("./routes/activityRoute");

var socialSkillsRouter = require("./routes/socialSkillsRoute");
var technicalSkillsRouter = require("./routes/technicalSkillsRoute")

var mongoose = require("mongoose");
var configDB = require("./config/mongodb.json");

var app = express();

mongoose
  .connect(configDB.mongo.uri, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//routes
app.use("/activities", activitiesRouter);
app.use("/socialSkills", socialSkillsRouter);
app.use("/technicalSkills", technicalSkillsRouter);

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
  res.render("error");
});

module.exports = app;
