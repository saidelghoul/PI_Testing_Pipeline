const Technology = require("../model/technology");

async function getallTechnologies(req, res) {
  Technology.find({})
    .exec()
    .then((technologies) => {
      res.status(200).json(technologies);
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error: " + error.message });
    });
}

async function getTechnologybyid(req, res) {
  Technology.findById(req.params.id)
    .exec()
    .then((technology) => {
      if (!technology) res.status(404).json({ error: "Couldn't find Technology" });
      else res.status(200).json(technology);
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error: " + error.message });
    });
}

async function addTechnology(req, res) {
  const technology = req.body;
  const newItem = new Technology(technology);
  try {
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

async function removeTechnology(req, res) {
  const id = req.params.id;
  try {
    const technology = await Technology.findByIdAndDelete(id);
    if (!technology) res.status(404).json({ error: "Couldn't find Technology" });
    else res.status(204).json({ info: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

async function updateTechnology(req, res) {
  const id = req.params.id;
  try {
    const technology = await Technology.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!technology) res.status(404).json({ error: "Couldn't find Technology" });
    else res.status(200).json(technology);
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

module.exports = {
  getallTechnologies,
  getTechnologybyid,
  addTechnology,
  removeTechnology,
  updateTechnology,
};
