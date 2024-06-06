const express = require('express');
const router = express.Router();
var TechnologyController = require('../controller/TechnologyController');

// Route pour récupérer toutes les technologies
router.get('/getall', TechnologyController.getallTechnologies);

// Route pour récupérer une technologie par son ID
router.get('/getbyid/:id', TechnologyController.getTechnologybyid);

// Route pour ajouter une nouvelle technologie
router.post('/add', TechnologyController.addTechnology);

// Route pour supprimer une technologie
router.delete('/remove/:id', TechnologyController.removeTechnology);

// Route pour mettre à jour une technologie
router.put('/update/:id', TechnologyController.updateTechnology);

module.exports = router;
