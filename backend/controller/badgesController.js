const express = require('express');
const router = express.Router();
const User = require('../model/user');

// Récupérer les badges d'un utilisateur spécifique
router.get('/:userId/badges', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user.badges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
