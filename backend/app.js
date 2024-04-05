const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv").config();
const cors = require("cors");
const http = require("http"); // Importez le module http de Node.js
const { mongoose } = require("mongoose");
const socketIo = require("socket.io");
const multer = require("multer");

var messageRoute = require("./routes/ConversationRoute");
var notificationRoute = require("./routes/NotificationRoute");

//activities management routes
const activitiesRoute = require("./routes/activityRoute");
const tasksRoute = require("./routes/taskRoute");
const checklistsRoute = require("./routes/checklistRoute");

const publicationRoute = require("./routes/publicationRoutes");
const evenementRoutes = require("./routes/EvenementRoutes");
const commentaireRoutes = require("./routes/ComentaireRoute");
const PageRoute = require("./routes/PageRoute");
const activitiesRouter = require("./routes/activityRoute");
const socialSkillsRouter = require("./routes/socialSkillsRoute");
const technicalSkillsRouter = require("./routes/technicalSkillsRoute");

const app = express();

var server = http.createServer(app); // Créez un serveur HTTP en utilisant Express

const isAuthenticated = (req, res, next) => {
  if (req.user) {
    // L'utilisateur est authentifié, continuez vers la route suivante
    next();
  } else {
    // L'utilisateur n'est pas authentifié, renvoyez une erreur 401 (non autorisé)
    res.status(401).json({ message: "Non autorisé" });
  }
};

// Connectez Socket.IO au serveur HTTP
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Spécifiez l'URL d'origine autorisée
    methods: ["GET", "POST"], // Spécifiez les méthodes autorisées
  },
});
app.io = io;
// Définir une liste pour stocker les identifiants des utilisateurs connectés
let connectedUsers = [];

io.on("connection", (socket) => {
  console.log("Nouveau client connecté");

  // Ajouter l'utilisateur à la liste des utilisateurs connectés
  socket.on("userConnected", (userId) => {
    connectedUsers.push(userId);
    // Diffuser la liste des utilisateurs connectés à tous les clients
    io.emit("userListUpdate", connectedUsers);
  });

  // Gérer la déconnexion de l'utilisateur
  socket.on("disconnect", () => {
    console.log("Client déconnecté");
    // Supprimer l'utilisateur de la liste des utilisateurs connectés
    connectedUsers = connectedUsers.filter((user) => user !== socket.userId);
    // Diffuser la liste mise à jour des utilisateurs connectés à tous les clients
    io.emit("userListUpdate", connectedUsers);
  });

  // Gérer l'envoi de messages
  socket.on("sendMessage", (message) => {
    console.log("Nouveau message :", message);
    io.emit("message", message); // Diffuser le message à tous les clients connectés
  });
});

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

app.use("/", require("./routes/authRoutes"));
app.use("/unite", require("./controller/uniteController"));
app.use("/departement", require("./controller/departementController"));
app.use("/publications", publicationRoute);
app.use("/evenemnt", evenementRoutes);
app.use("/commentaire", commentaireRoutes);
app.use("/groups", PageRoute);
app.use("/images", express.static(path.join(__dirname, "uploads")));
app.use("/notifications", notificationRoute);
app.use("/messages", messageRoute);
app.use("/activities", activitiesRoute);
app.use("/tasks", tasksRoute);
app.use("/checklists", checklistsRoute);
app.use("/socialSkills", socialSkillsRouter);
app.use("/technicalSkills", technicalSkillsRouter);
app.use("/user", require("./controller/userController"));

const port = 8000;

// Remplacez app.listen par server.listen pour utiliser le serveur HTTP créé
server.listen(port, () => console.log(`server is running on ${port}`));

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
