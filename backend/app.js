const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv").config();
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const socketIo = require("socket.io");
const multer = require("multer");
const twilio = require("twilio");
const Message = require("./model/Chats/message");
const Conversation = require("./model/Chats/conversation");
const router = express.Router();

const messageRoute = require("./routes/ConversationRoute");
const messageRouter = require("./routes/messageRouter");
const notificationRoute = require("./routes/NotificationRoute");
const PubPageRoute = require("./routes/PubGrpusRoute");

const activitiesRoute = require("./routes/activityRoute");
const tasksRoute = require("./routes/taskRoute");
const checklistsRoute = require("./routes/checklistRoute");
const documentRoute = require("./routes/documentRoute");

const publicationRoute = require("./routes/publicationRoutes");
const evenementRoutes = require("./routes/EvenementRoutes");
const commentaireRoutes = require("./routes/ComentaireRoute");
const PageRoute = require("./routes/PageRoute");
const socialSkillsRouter = require("./routes/socialSkillsRoute");
const technicalSkillsRouter = require("./routes/technicalSkillsRoute");
const technologyRouter = require("./routes/technologyRoutes");
const UserScoreRoutes = require("./routes/UserScoreRoutes");
const CommentPageRoute = require("./routes/commentairePubRoute");


const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database not connected", err));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");

io.on("connection", (socket) => {
  // Gérer l'événement de typing côté serveur
  socket.on("typing", (data) => {
    try {
      const { conversationId, sender, isTyping } = data;

      // Diffuser l'état de typing à tous les clients sauf à l'émetteur
      socket.broadcast.emit("typing", { conversationId, sender, isTyping });
    } catch (error) {
      console.error("Error in typing event:", error.message);
    }
  });

  socket.on("message", async (data) => {
    try {
      const { content, sender, repondeur, conversationId } = data;

      const newMessage = new Message({
        content,
        sender,
        repondeur,
        conversation: conversationId,
      });
      await newMessage.save();

      await Conversation.findByIdAndUpdate(conversationId, {
        $push: { messages: newMessage._id },
      });

      io.emit("message", newMessage);
    } catch (error) {
      console.error("Error in sending message:", error.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

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
app.use("/pubGroupe", PubPageRoute);
app.use("/commentGroupe", CommentPageRoute);

app.use("/messages", messageRoute);
app.use("/test", messageRouter);
app.use("/activities", activitiesRoute);
app.use("/tasks", tasksRoute);
app.use("/checklists", checklistsRoute);

app.use("/documents", documentRoute);
app.use("/socialSkills", socialSkillsRouter);
app.use("/technicalSkills", technicalSkillsRouter);
app.use("/technologies", technologyRouter);
app.use("/user", require("./controller/userController"));
app.use("/badges", require("./controller/badgesController"));
app.use("/userScore", UserScoreRoutes);

const accountSid = "AC123f75a58cfaeaad10128a4d8a8ac843";
const authToken = "58b03b9ac98cffd551468d55cf18da4f";

const client = twilio(accountSid, authToken);

app.post("/send-sms", (req, res) => {
  const { to, body } = req.body;

  client.messages
    .create({
      body: body,
      from: "+13343397288",
      to: to,
    })
    .then((message) => {
      console.log("SMS sent:", message.sid);
      res.send("SMS sent successfully!");
    })
    .catch((err) => {
      console.error("Error sending SMS:", err);
      res.status(500).send("Failed to send SMS");
    });
});

app.use(
  "/imagesUser",
  express.static(path.join(__dirname, "public/imagesUser"))
);

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = { app, io };
