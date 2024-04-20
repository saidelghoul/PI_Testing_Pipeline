const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  test,
  registerUser,
  loginUser,
  getProfile,
  logout,
  forgotPassword,
  resetPassword,
  confirmEmail
} = require("../controller/authController");

//middleware
router.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://172.19.136.127:3000",
    ],
  })
);

router.get("/", test);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);
router.get('/logout',logout);
router.post("/forgotPassword",forgotPassword);
router.post("/resetPassword",resetPassword);
router.get('/confirm/:token', confirmEmail);


module.exports = router;
