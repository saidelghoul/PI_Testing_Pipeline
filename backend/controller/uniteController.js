const express = require("express");
const router = express.Router(); 

const Unite = require("../model/unite");

// Route to get all units
router.get("/getAll", async (req, res) => {
  try {
    const allUnits = await Unite.find({});
    res.status(200).json(allUnits);
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
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
router.post("/add", async (req, res) => {
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

module.exports = router;
