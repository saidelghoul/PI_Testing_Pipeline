const express = require("express");
const router = express.Router(); 
//const requireAuth = require("../middleware/requireAuth")
const Unite = require("../model/unite");
const Departement = require('../model/departement'); // Assurez-vous d'importer le modèle Departement

//require auth for all unit routes
//router.use(requireAuth)

// Route to get all units
router.get("/getAll", async (req, res) => {
  try {
    const allUnits = await Unite.find({});
    res.status(200).json(allUnits);
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
});


// router.post("/add", async (req, res) => {
//   const uniteData = req.body; // Assurez-vous que les données sont correctement récupérées
//   const { departementId, ...uniteInfo } = uniteData; // Extraire l'ID du département de uniteData
//   try {
//     // Vérifiez si le département existe
//     const departement = await Departement.findById(departementId);
//     if (!departement) {
//       return res.status(404).json({ error: "Département non trouvé" });
//     }

//     // Créer une nouvelle unité en incluant l'ID du département
//     const newUnite = await Unite.create({
//       ...uniteInfo,
//       departement: departementId, // Associer l'unité au département
//     });

//     // Ajouter l'unité créée à la liste d'unités du département
//     departement.unites.push(newUnite);
//     await departement.save();

//     res.status(201).json(newUnite);
//   } catch (err) {
//     console.error('Erreur lors de l\'ajout de l\'unité:', err.message);
//     res.status(500).json({ error: "Erreur lors de l'ajout de l'unité" });
//   }
// });

router.post("/add", async (req, res) => {
  const uniteData = req.body; // Assurez-vous que les données sont correctement récupérées
  try {
    const newUnite = await Unite.create(uniteData); // Utilisez la méthode create pour ajouter une nouvelle unité
    await newUnite.populate('departement').execPopulate();

    res.status(201).json(newUnite);
  } catch (err) {
    console.error('Erreur lors de l\'ajout de l\'unité:', err.message);
    res.status(500).json({ error: "Erreur lors de l'ajout de l'unité" });
  }
});


// Route to get a unit by ID
router.get("/getbyid/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const unit = await Unite.findById(id);
    if (!unit) res.status(404).json({ error: "Couldn't find Unite" });
    else res.status(200).json(unit);
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
});

// Route to add a new unit
router.post("/addunite", async (req, res) => {
  const unite = req.body;
  const newItem = new Unite(unite);
  try {
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

// Route to remove a unit by ID
router.delete("/remove/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUnit = await Unite.findByIdAndDelete(id);
    if (!deletedUnit) res.status(404).json({ error: "Couldn't find Unite" });
    else res.status(204).json({ info: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
});


// Route to remove a dep by ID
router.delete("/removedep/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUnit = await Departement.findByIdAndDelete(id);
    if (!deletedUnit) res.status(404).json({ error: "Couldn't find Unite" });
    else res.status(204).json({ info: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

// Route to update a unit by ID
router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUnit = await Unite.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUnit) res.status(404).json({ error: "Couldn't find Unite" });
    else res.status(200).json(updatedUnit);
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
});


router.get("/:id/departement", async (req, res) => {
  const uniteId = req.params.id;
  try {
    // Trouver le département par son ID et peupler les unités associées
    const unite = await Unite.findById(uniteId).populate('departement');
    if (!unite) {
      res.status(404).json({ error: "Unité non trouvé" });
    } else {
      res.status(200).json(unite.departement);
    }
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur: " + error.message });
  }
});



module.exports = router;
