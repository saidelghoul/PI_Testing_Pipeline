var Publication = require("../model/publication");

async function add(req, res) {
  const publication = req.body;
  const newItem = new Publication(publication);
  try {
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

async function getall(req, res) {
  Publication.find({})
    .exec()
    .then((publication) => {
      res.status(200).json(publication);
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error: " + error.message });
    });
}

async function getbyid(req, res) {
  Publication.findById(req.params.id)
    .exec()
    .then((publication) => {
      if (!publication)
        res.status(404).json({ error: "Couldn't find publication" });
      else res.status(200).json(publication);
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error: " + error.message });
    });
}

async function remove(req, res) {
  const id = req.params.id;
  try {
    const publication = await Publication.findByIdAndDelete(id);
    if (!publication) res.status(404).json({ error: "Couldn't find publication" });
    else res.status(204).json({ info: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

async function update(req, res) {
  const id = req.params.id;
  try {
    const publication = await Publication.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!publication) res.status(404).json({ error: "Couldn't find publication" });
    else res.status(200).json(publication);
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

module.exports = { getall, getbyid, add, remove, update };
