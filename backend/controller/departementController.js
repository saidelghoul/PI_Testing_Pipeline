const express = require("express");
const router = express.Router(); 
const Departement = require('../model/departement'); 
const Unite = require('../model/unite');


// Route to get all departements
router.get("/getAlldep", async (req, res) => {
    try {
      const allDepartements = await Departement.find({});
      
      res.status(200).json(allDepartements);

    } catch (error) {
      
      res.status(500).json({ error: "Server error: " + error.message });
    }
  });

  router.get('/departements', async (req, res) => {
    try {
        const departements = await Departement.find();
        res.json(departements);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des départements' });
    }
});
  
router.get("/:id/unites", async (req, res) => {
  const departementId = req.params.id;
  try {
    // Trouver le département par son ID et peupler les unités associées
    const departement = await Departement.findById(departementId).populate('unites');
    if (!departement) {
      res.status(404).json({ error: "Département non trouvé" });
    } else {
      res.status(200).json(departement.unites);
    }
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur: " + error.message });
  }
});

// router.get('/departement/:id/unites', async (req, res) => {
//   const departementId = req.params.id;
//   try {
//     // Trouver les unités ayant l'ID du département spécifique
//     const unites = await Unite.find({ departement: departementId });
//     res.status(200).json(unites);
//   } catch (error) {
//     res.status(500).json({ error: 'Erreur serveur: ' + error.message });
//   }
// });
router.get('/departement/:id/unites', async (req, res) => {
  const id = req.params.id; // Récupérer l'ID du département depuis les paramètres de la requête

  try {
      // Recherchez les unités qui ont le même ID de département que celui spécifié
      const unites = await Unite.find({ departement: id });

      if (unites.length === 0) {
          return res.status(404).json({ error: 'Aucune unité trouvée pour ce département.' });
      }

      // Envoyez les unités correspondantes en réponse
      res.status(200).json(unites);
  } catch (error) {
      console.error('Erreur lors de la récupération des unités associées au département:', error);
      res.status(500).json({ error: 'Erreur serveur lors de la récupération des unités.' });
  }
});



  // Route to get a departement by ID
  router.get("/getbyid/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const departement = await Departement.findById(id);
      if (!departement) res.status(404).json({ error: "Couldn't find Departement" });
      else res.status(200).json(departement);
    } catch (error) {
      res.status(500).json({ error: "Server error: " + error.message });
    }
  });
  
  // Route to add a new departement
  router.post("/add", async (req, res) => {
    const departement = req.body;
    const newItem = new Departement(departement);
    try {
      const saved = await newItem.save();
      res.status(201).json(saved);
    } catch (err) {
      res.status(500).json({ error: "Server error: " + err.message });
    }
  });
  
  // Route to remove a departement by ID
  router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const deletedDepartement = await Unite.findByIdAndDelete(id);
      if (!deletedDepartement) res.status(404).json({ error: "Couldn't find Departement" });
      else res.status(204).json({ info: "Deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: "Server error: " + err.message });
    }
  });
  
  // Route to update a departement by ID
  router.put("/update/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const updatedDepartement = await Departement.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedDepartement) res.status(404).json({ error: "Couldn't find Departement" });
      else res.status(200).json(updatedDepartement);
    } catch (err) {
      res.status(500).json({ error: "Server error: " + err.message });
    }
  });
  
  module.exports = router;
  