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
      return res.status(404).json({ message: 'User not found' });
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
      res.status(200).json({ message: 'Profile and cover images updated successfully' });
    });

    res.status(200).json({ message: 'Profile and cover images updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/:userId/profile', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user || !user.profileImage ) {
      return res.status(404).json({ message: 'Profile picture not found' });
    }

    // Construire le chemin absolu du fichier
    const imagePath = path.join(__dirname, '..', user.profileImage);

    // Vérifier si le fichier existe
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ message: 'Profile picture not found' });
    }

    // Envoyer l'image en tant que fichier
    res.sendFile(imagePath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});



router.get('/:userId/cover', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user || !user.coverImage ) {
      return res.status(404).json({ message: 'Cover image not found' });
    }

    // Construire le chemin absolu du fichier
    const imagecoverPath = path.join(__dirname, '..', user.coverImage);

    // Vérifier si le fichier existe
    if (!fs.existsSync(imagecoverPath)) {
      return res.status(404).json({ message: 'Cover image not found' });
    }

    // Envoyer l'image en tant que fichier
    res.sendFile(imagecoverPath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.put('/:userId', async (req, res) => {
  const { userId } = req.params;
  const updates = req.body;

  try {
      const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

      if (!updatedUser) {
          return res.status(404).json({ error: 'User not found' });
      }

      const departement = await Departement.findById(updatedUser.departement);
      const unite = await Unite.findById(updatedUser.unite);

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
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Error updating user' });
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
    console.error('Error recovering users:', error);
    res.status(500).json({ error: 'Error recovering users' });
  }
});
router.get('/enseignant', async (req, res) => {
  try {
    // Récupérer l'utilisateur connecté
    const currentUser = req.user; // Supposons que les informations de l'utilisateur connecté sont stockées dans req.user

    // Vérifier si l'utilisateur connecté a un département et une unité
    if (!currentUser.department || !currentUser.unit) {
      return res.status(400).json({ error: "The logged in user does not have a department or unit." });
    }

    // Trouver les utilisateurs qui sont enseignants et ont le même département et unité que l'utilisateur connecté
    const users = await User.find({
      role: "Enseignant",
      department: currentUser.department,
      unit: currentUser.unit
    });

    res.json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Error recovering users' });
  }
});


//lister tous les Chef unité pour le chef departement connecté
router.get('/chef', async (req, res) => {
  try {
    const chefUsers = await User.find({ role: "Chef département" }).populate('departement','name');
    res.json(chefUsers);
  } catch (error) {
    console.error(' Error recovering users:', error);
    res.status(500).json({ error: 'Error recovering users' });
  }
});


router.get('/chefunite', async (req, res) => {
  try {
    const { departementName } = req.query;

    // Recherche du département par nom
    const departement = await Departement.findOne({ name: departementName });
    if (!departement) {
      return res.status(404).json({ error: 'Department not found' });
    }

    // Recherche des utilisateurs avec le rôle "Chef unité" et le département trouvé
    const chefUnitUsers = await User.find({ role: "Chef unité", departement: departement._id })
                                    .populate('unite', 'name');
    res.json(chefUnitUsers);
  } catch (error) {
    console.error('Error recovering users:', error);
    res.status(500).json({ error: 'Error recovering users' });
  }
});

router.get('/enseignants', async (req, res) => {
  try {
    const { uniteName } = req.query;

    // Recherche du unite par nom
    const unite = await Unite.findOne({ name: uniteName });
    if (!unite) {
      return res.status(404).json({ error: 'Unit not found' });
    }

    // Recherche des utilisateurs avec le rôle "Enseignant" et le département trouvé
    const ensUsers = await User.find({ role: "Enseignant", unite: unite._id })
                                    .populate('unite', 'name');
    res.json(ensUsers);
  } catch (error) {
    console.error('Error recovering users:', error);
    res.status(500).json({ error: 'Error recovering users' });
  }
});

router.get('/enseignantsbydep', async (req, res) => {
  try {
    const { departementName } = req.query;

    // Recherche du departement par nom
    const departement = await Departement.findOne({ name: departementName });
    if (!departement) {
      return res.status(404).json({ error: 'Department not found' });
    }

    // Recherche des utilisateurs avec le rôle "Enseignant" et le département trouvé
    const ensUsers = await User.find({ role: "Enseignant", departement: departement._id })
                                    .populate('departement', 'name');
    res.json(ensUsers);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Error retrieving users' });
  }
});

router.put("/changePassword/:userId", async (req, res) => {
  const { userId } = req.params;
  const { oldPassword, newPassword, confirmedNewPassword } = req.body;

  try {
    // Trouver l'utilisateur par son ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "No users found" });
    }

    // Vérifier si l'ancien mot de passe correspond
    const isPasswordValid = await comparePassword(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Old incorrect password" });
    }

    // Vérifier si le nouveau mot de passe et la confirmation correspondent
    if (newPassword !== confirmedNewPassword) {
      return res.status(400).json({ error: "New passwords do not match" });
    }

    // Mettre à jour le mot de passe dans la base de données
    user.password = await hashPassword(newPassword);
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Server error: " + error.message });
  }
});

router.get('/usersGetAll', async (req, res) => {
  try {
    const users = await User.find({});

 
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
});

router.get('/usersget', async (req, res) => {
  try {
    const users = await User.find();
    router.get('/usersGetAll', async (req, res) => {
      try {
        const users = await User.find({});
        if (!users || !users.profileImage ) {
          return res.status(404).json({ message: 'Profile picture not found' });
        }
    
        // Construire le chemin absolu du fichier
        const imagePath = path.join(__dirname, '..', users.profileImage);
    
        // Vérifier si le fichier existe
        if (!fs.existsSync(imagePath)) {
          return res.status(404).json({ message: 'Profile picture not found' });
        }
    
        // Envoyer l'image en tant que fichier
        res.sendFile(imagePath);
     
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ error: "Server error: " + error.message });
      }
    });
 
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error recovering users', error });
  }
});

router.get('/profile-image/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user || !user.profileImage) {
      return res.status(404).json({ message: 'Image de profil non trouvée' });
    }

    // Construire le chemin absolu du fichier
    const imagePath = path.join(__dirname, '..', 'public/imagesUser', user.profileImage);

    // Vérifier si le fichier existe
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ message: 'Image de profil non trouvée' });
    }

    // Envoyer l'image en tant que fichier
    res.sendFile(imagePath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route pour récupérer tous les utilisateurs
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error recovering users', error });
  }
});
router.get('/userbyid/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error recovering user', error });
  }
});




module.exports = router;
