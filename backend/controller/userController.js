const express = require('express');
const router = express.Router();
const User = require('../model/user');
const Departement = require('../model/departement');
const Unite = require('../model/unite');

// Route pour la mise à jour d'un utilisateur
router.put('/:userId', async (req, res) => {
  //const decodedToken = jwt.verify(token,payload.env.JWT_SECRET);
  //const userId = decodedToken.userId;
  const { userId } = req.params;
  const updates = req.body;

  try {
    // Recherchez l'utilisateur par son ID et mettez à jour ses informations
    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
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

// router.get('/chefunite', async (req, res) => {
//   try {
//     const chefUsers = await User.find({ role: "Chef unité" }).populate('unite', 'name');
//     res.json(chefUsers);
//   } catch (error) {
//     console.error('Erreur lors de la récupération des utilisateurs :', error);
//     res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
//   }
// });

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



module.exports = router;
