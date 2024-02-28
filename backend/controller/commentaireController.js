var Commentaire = require("../model/commentair");

async function getall(req, res) {
    Commentaire.find({})
    .exec()
    .then((Commentaire) => {
      res.status(200).json(Commentaire);
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error: " + error.message });
    });
}



async function add(req, res) {
  const Commentaire = req.body;
  const newItem = new Commentaire(Commentaire);
  try {
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

async function remove(req, res) {
  const id = req.params.id;
  try {
    const Commentaire = await Commentaire.findByIdAndDelete(id);
    if (!Commentaire) res.status(404).json({ error: "Couldn't find Commentaire" });
    else res.status(204).json({ info: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

async function update(req, res) {
  const id = req.params.id;
  try {
    const Commentaire = await Commentaire.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!Commentaire) res.status(404).json({ error: "Couldn't find Commentaire" });
    else res.status(200).json(Commentaire);
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

module.exports = { getall, getbyid, add, remove, update };
