const express = require('express');
const router = express.Router();
const User = require('../model/user');

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


//lister tous les user qui ont un role=== chef departement
router.get('/admin', async (req, res) => {
  try {
    const chefUsers = await User.find({ role: "Directeur d'étude" });
    res.json(chefUsers);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
});

//lister tous les user qui ont un role=== chef departement
router.get('/chefdep', async (req, res) => {
  try {
    const chefUsers = await User.find({ role: "Chef département" });
    res.json(chefUsers);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
});

//lister tous les Chef unité
router.get('/chefunite', async (req, res) => {
  try {
    const chefUsers = await User.find({ role: "Chef unité" });
    res.json(chefUsers);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
});


module.exports = router;
