const SocialSkill = require("../model/socialSkill");
const User = require("../model/user");
const Departement = require("../model/departement");
const Unite = require("../model/unite");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const ResetPasswordToken = require('../model/ResetPasswordToken');

const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
  res.json("test is working");
};

//register endpoint
const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirmedPassword,
      role,
      departement,
      unite,
    } = req.body;
    //check if name was entered
    if (!name) {
      return res.json({
        error: "name is required",
      });
    }

    const nameExist = await User.findOne({ name });
    if (nameExist) {
      return res.json({
        error: "Name is already taken",
      });
    }

    //check is password is good
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be at least 6 characters long",
      });
    }

    // check if confirmed password matches password
    if (password !== confirmedPassword) {
      return res.json({
        error: "Confirmed password does not match password",
      });
    }

    //check email
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is taken already",
      });
    }

    if (!email) {
      return res.json({
        error: "Email is required",
      });
    }
    
    // Vérifier si l'email se termine par @esprit.tn
    if (!email.endsWith("@esprit.tn")) {
      return res.json({
        error: "Email must end with @esprit.tn",
      });
    }
    
    const hashedPassword = await hashPassword(password);
    const hashedConfirmedPassword = await hashPassword(confirmedPassword);

    const emailToken = crypto.randomBytes(20).toString('hex');

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      confirmedPassword: hashedConfirmedPassword,
      departement,
      role,
      unite,
      emailToken,
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: 'marwakb4@gmail.com',
      to: email,
      subject: 'Confirmation of your registration',
      text: `Please confirm your registration by clicking on the provided link.  : ${process.env.CLIENT_URL}/confirm/${emailToken} or this  ${process.env.CLIENT_URL1}/confirm/${emailToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.json({ error: 'Failed to send confirmation email!' });
      }
      console.log('Email sent: ' + info.response);
      res.json({ message: 'A confirmation email has been sent' });
    });


    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const confirmEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ emailToken: token });

    if (!user) {
      return res.json({ error: 'Invalid or expired token' });
    }

    user.isEmailVerified = true;
    user.emailToken = ''; 
    await user.save();

    res.json({ message: 'Your account has been successfully activated' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server Error' });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "No users found" });
    }
    // Vérifier si le compte de l'utilisateur est actif
    if (!user.isActive) {
      return res.json({ error: "Account Disabled" });
    }

    if (!user.emailToken && !user.isEmailVerified ) {
      return res.json({ error: "Please verify your email address to activate your account!" });
    }
  
    // Vérifier si les mots de passe correspondent
    const match = await comparePassword(password, user.password);
    if (match) {
      // Récupérer les détails du département associé à l'utilisateur
      const departement = await Departement.findById(user.departement);
      // Récupérer les détails de l'unité associée à l'utilisateur
      const unite = await Unite.findById(user.unite);

      // Créer le token JWT en incluant toutes les informations nécessaires
      const tokenPayload = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        addresse: user.addresse,
        gouvernorat: user.gouvernorat,
        telephone: user.telephone,
        dateNaissance: user.dateNaissance,
        gender: user.gender,
        departement: departement.name, // inclure seulement le nom du département
        unite: unite.name, // Inclure seulement le nom de l'unité
        socialSkills: user.socialSkills,
        technicalSkills: user.technicalSkills,
        profileImage: user.profileImage, 
        coverImage: user.coverImage, 
      };

      jwt.sign(tokenPayload, process.env.JWT_SECRET, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json(user);
      });
    } else {
      res.json({ error: "Passwords do not match" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getProfile = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, decodedToken) => {
      if (err) {
        console.error("Error while decoding the token:", err);
        return res
          .status(500)
          .json({ error: "Error while decoding the token" });
      }
      const {
        id,
        email,
        name,
        role,
        addresse,
        gouvernorat,
        dateNaissance,
        telephone,
        gender,
        departement, 
        unite,
        socialSkills,
        technicalSkills,
        profileImage,
        coverImage

      } = decodedToken;
      if (!id) {
        return res
          .status(400)
          .json({ error: "User ID not found in token" });
      }
      // L'ID de l'utilisateur est disponible ici
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // désactive la mise en cache

      try {
        // Utilisation de Promise.all avec map pour récupérer toutes les compétences sociales de manière asynchrone
        const socialSkillsList = await Promise.all(
          socialSkills.map(async (element) => {
            return await SocialSkill.findById(element);
          })
        );

        // Renvoyer la réponse avec les données de l'utilisateur, y compris la liste des compétences sociales
        res.json({
          id,
          email,
          name,
          role,
          addresse,
          gouvernorat,
          dateNaissance,
          telephone,
          gender,
          departement, 
          unite,
          socialSkills: socialSkillsList,
          technicalSkills,
          profileImage,
        coverImage,
        });
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des compétences sociales :",
          error
        );
        res.status(500).json({
          error:
            "Une erreur est survenue lors de la récupération des compétences sociales",
        });
      }
    });
  } else {
    res.json(null);
  }
};

const logout = (req, res) => {
  res.clearCookie('token').json({ message: 'Logout successful' });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: 'No users found with this email' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetPasswordToken = await ResetPasswordToken.create({
      userId: user._id,
      token: resetToken,
      expires: Date.now() + 3600000, // 1 hour
    });

    // Send reset token to user's email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: 'marwakb4@gmail.com',
      to: email,
      subject: 'Password reset request',
      text: ` Click this link to reset your password: ${process.env.CLIENT_URL}/reset/${resetToken} or click this link  ${process.env.CLIENT_URL1}/reset/${resetToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.json({ error: 'Failed to send email' });
      }
      console.log('Email sent: ' + info.response);
      res.json({ message: 'Email sent with password reset instructions' });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const resetPasswordToken = await ResetPasswordToken.findOne({ token });
    if (!resetPasswordToken || resetPasswordToken.expires < Date.now()) {
      return res.json({ error: 'Invalid or expired token' });
    }

    const user = await User.findById(resetPasswordToken.userId);
    if (!user) {
      return res.json({ error: 'No user found' });
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });

    // Delete the reset token
    await ResetPasswordToken.deleteOne({ token });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};


module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
  logout,
  forgotPassword,
  resetPassword,
  confirmEmail
};
