const express = require("express");
const router = express.Router(); 
const Departement = require('../model/departement'); 

// Route to get all departements
router.get("/getAll", async (req, res) => {
    try {
      const allDepartements = await Departement.find({});
      res.status(200).json(allDepartements);
    } catch (error) {
      res.status(500).json({ error: "Server error: " + error.message });
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
  router.delete("/remove/:id", async (req, res) => {
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
      const updatedDepartement = await Unite.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedDepartement) res.status(404).json({ error: "Couldn't find Departement" });
      else res.status(200).json(updatedDepartement);
    } catch (err) {
      res.status(500).json({ error: "Server error: " + err.message });
    }
  });
  
  module.exports = router;
  