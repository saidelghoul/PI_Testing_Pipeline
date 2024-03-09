var createError = require("http-errors");
const express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { mongoose } = require("mongoose");
//const requireAuth = require("./middleware/requireAuth")

var messageRoute = require("./routes/ConversationRoute");
//const userRoutes = require('./routes/userRoutes');
var publicationRoute = require("./routes/publicationRoutes");
var evenementRoutes = require("./routes/EvenementRoutes");
commentaireRoutes = require("./routes/ComentaireRoute");
var PageRoute = require("./routes/PageRoute");
var activitiesRouter = require("./routes/activityRoute");
var socialSkillsRouter = require("./routes/socialSkillsRoute");
var technicalSkillsRouter = require("./routes/technicalSkillsRoute");

//var mongoose = require("mongoose");
//var configDB = require("./config/mongodb.json");

var app = express();

const isAuthenticated = (req, res, next) => {
  if (req.user) {
    // L'utilisateur est authentifié, continuez vers la route suivante
    next();
  } else {
    // L'utilisateur n'est pas authentifié, renvoyez une erreur 401 (non autorisé)
    res.status(401).json({ message: "Non autorisé" });
  }
};

//database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database not connected", err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);

app.use("/",  require("./routes/authRoutes"));
//app.use("/unite",isAuthenticated, require("./controller/uniteController"));
app.use("/unite", require("./controller/uniteController"));
app.use("/departement", require("./controller/departementController"));
app.use("/publications", publicationRoute);
app.use("/evenemnt", evenementRoutes);
app.use("/commentaire", commentaireRoutes);
app.use("/pages", PageRoute);
app.use("/messages", messageRoute);
//routes
app.use("/activities", activitiesRouter);
app.use("/socialSkills", socialSkillsRouter);
app.use("/technicalSkills", technicalSkillsRouter);
app.use("/user", require("./controller/userController"));



const port = 8000;
app.listen(port, () => console.log(`server is running on ${port}`));

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
