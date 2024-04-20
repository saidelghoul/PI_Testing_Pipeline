const express = require('express');
const router = express.Router();
const User = require('../model/user');
const Departement = require('../model/departement');
const Unite = require('../model/unite');
const jwt = require('jsonwebtoken');
const { comparePassword, hashPassword } = require("../helpers/auth");
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path'); 
const fs = require('fs');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/imagesUser/'); // Dossier où les fichiers seront enregistrés
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Renommer le fichier avec un horodatage pour éviter les conflits de noms
  }
});

const upload = multer({ storage: storage});


router.put('/:userId/profileimage', upload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'coverImage', maxCount: 1 }]), async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier et mettre à jour l'image de profil
    if (req.files['profileImage'] && req.files['profileImage'][0]) {
      user.profileImage = req.files['profileImage'][0].path;
    }

    // Vérifier et mettre à jour l'image de couverture
    if (req.files['coverImage'] && req.files['coverImage'][0]) {
      user.coverImage = req.files['coverImage'][0].path;
    }

    await user.save();
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
      socialSkills: user.socialSkills,
      technicalSkills: user.technicalSkills,
      profileImage: user.profileImage, 
      coverImage: user.coverImage, 
    };

    // Générer un nouveau token avec les informations mises à jour
    jwt.sign(tokenPayload, process.env.JWT_SECRET, {}, (err, token) => {
      if (err) throw err;
      // Mettre à jour le cookie du token avec le nouveau token
      res.cookie('token', token, { httpOnly: true, secure: true });
      // Renvoyer la réponse avec un message de succès
      res.status(200).json({ message: 'Images de profil et de couverture mises à jour avec succès' });
    });

    res.status(200).json({ message: 'Images de profil et de couverture mises à jour avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});


router.get('/:userId/profile', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user || !user.profileImage ) {
      return res.status(404).json({ message: 'Image de profil non trouvée' });
    }

    // Construire le chemin absolu du fichier
    const imagePath = path.join(__dirname, '..', user.profileImage);

    // Vérifier si le fichier existe
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ message: 'Image de profil non trouvée' });
    }

    // Envoyer l'image en tant que fichier
    res.sendFile(imagePath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});



router.get('/:userId/cover', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user || !user.coverImage ) {
      return res.status(404).json({ message: 'Image de coverture non trouvée' });
    }

    // Construire le chemin absolu du fichier
    const imagecoverPath = path.join(__dirname, '..', user.coverImage);

    // Vérifier si le fichier existe
    if (!fs.existsSync(imagecoverPath)) {
      return res.status(404).json({ message: 'Image de couverture non trouvée' });
    }

    // Envoyer l'image en tant que fichier
    res.sendFile(imagecoverPath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});


router.put('/:userId', async (req, res) => {
  const { userId } = req.params;
  const updates = req.body;

  try {
      // Recherchez l'utilisateur par son ID et mettez à jour ses informations
      const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

      if (!updatedUser) {
          return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }

      // Récupérer les détails du département associé à l'utilisateur
      const departement = await Departement.findById(updatedUser.departement);
      // Récupérer les détails de l'unité associée à l'utilisateur
      const unite = await Unite.findById(updatedUser.unite);

      // Créer le nouveau payload du token avec les informations mises à jour
      const tokenPayload = {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          addresse: updatedUser.addresse,
          gouvernorat: updatedUser.gouvernorat,
          telephone: updatedUser.telephone,
          dateNaissance: updatedUser.dateNaissance,
          gender: updatedUser.gender,
          departement: departement.name, // inclure seulement le nom du département
          unite: unite.name, // Inclure seulement le nom de l'unité
          socialSkills: updatedUser.socialSkills,
          technicalSkills: updatedUser.technicalSkills,
       
      };

      // Générer un nouveau token avec les informations mises à jour
      jwt.sign(tokenPayload, process.env.JWT_SECRET, {}, (err, token) => {
          if (err) throw err;
          // Mettre à jour le cookie du token avec le nouveau token
          res.cookie('token', token, { httpOnly: true, secure: true });
          // Renvoyer la réponse avec l'utilisateur mis à jour
          res.json(updatedUser);
      });

  } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
      res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
  }
});


router.get("/getbyid/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) res.status(404).json({ error: "Couldn't find User" });
    else res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
});

router.put("/activate/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(userId, { isActive: true }, { new: true });
    if (!user) res.status(404).json({ error: "Couldn't find User" });
    else res.status(200).json({ message: "User activated successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
});

router.put("/deactivate/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(userId, { isActive: false }, { new: true });
    if (!user) res.status(404).json({ error: "Couldn't find User" });
    else res.status(200).json({ message: "User deactivated successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
});

//lister tous les enseignant pour les chefs unité
router.get('/enseignant/test', async (req, res) => {
  try {
    const Users = await User.find({ role: "Enseignant" });
    res.json(Users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
});
router.get('/enseignant', async (req, res) => {
  try {
    // Récupérer l'utilisateur connecté
    const currentUser = req.user; // Supposons que les informations de l'utilisateur connecté sont stockées dans req.user

    // Vérifier si l'utilisateur connecté a un département et une unité
    if (!currentUser.department || !currentUser.unit) {
      return res.status(400).json({ error: "L'utilisateur connecté n'a pas de département ou d'unité." });
    }

    // Trouver les utilisateurs qui sont enseignants et ont le même département et unité que l'utilisateur connecté
    const users = await User.find({
      role: "Enseignant",
      department: currentUser.department,
      unit: currentUser.unit
    });

    res.json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
});


//lister tous les Chef unité pour le chef departement connecté
router.get('/chef', async (req, res) => {
  try {
    const chefUsers = await User.find({ role: "Chef département" }).populate('departement','name');
    res.json(chefUsers);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
});


router.get('/chefunite', async (req, res) => {
  try {
    const { departementName } = req.query;

    // Recherche du département par nom
    const departement = await Departement.findOne({ name: departementName });
    if (!departement) {
      return res.status(404).json({ error: 'Département non trouvé' });
    }

    // Recherche des utilisateurs avec le rôle "Chef unité" et le département trouvé
    const chefUnitUsers = await User.find({ role: "Chef unité", departement: departement._id })
                                    .populate('unite', 'name');
    res.json(chefUnitUsers);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
});

router.get('/enseignants', async (req, res) => {
  try {
    const { uniteName } = req.query;

    // Recherche du unite par nom
    const unite = await Unite.findOne({ name: uniteName });
    if (!unite) {
      return res.status(404).json({ error: 'Unité non trouvé' });
    }

    // Recherche des utilisateurs avec le rôle "Enseignant" et le département trouvé
    const ensUsers = await User.find({ role: "Enseignant", unite: unite._id })
                                    .populate('unite', 'name');
    res.json(ensUsers);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
});

router.get('/enseignantsbydep', async (req, res) => {
  try {
    const { departementName } = req.query;

    // Recherche du departement par nom
    const departement = await Departement.findOne({ name: departementName });
    if (!departement) {
      return res.status(404).json({ error: 'Departement non trouvé' });
    }

    // Recherche des utilisateurs avec le rôle "Enseignant" et le département trouvé
    const ensUsers = await User.find({ role: "Enseignant", departement: departement._id })
                                    .populate('departement', 'name');
    res.json(ensUsers);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
});

router.put("/changePassword/:userId", async (req, res) => {
  const { userId } = req.params;
  const { oldPassword, newPassword, confirmedNewPassword } = req.body;

  try {
    // Trouver l'utilisateur par son ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Aucun utilisateur trouvé" });
    }

    // Vérifier si l'ancien mot de passe correspond
    const isPasswordValid = await comparePassword(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Ancien mot de passe incorrect" });
    }

    // Vérifier si le nouveau mot de passe et la confirmation correspondent
    if (newPassword !== confirmedNewPassword) {
      return res.status(400).json({ error: "Les nouveaux mots de passe ne correspondent pas" });
    }

    // Mettre à jour le mot de passe dans la base de données
    user.password = await hashPassword(newPassword);
    await user.save();

    res.status(200).json({ message: "Mot de passe mis à jour avec succès" });
  } catch (error) {
    console.error("Erreur lors de la modification du mot de passe:", error);
    res.status(500).json({ error: "Server error: " + error.message });
  }
});






module.exports = router;
