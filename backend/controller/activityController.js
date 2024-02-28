var Activity = require("../model/activity");

async function getall(req, res) {
  Activity.find({})
    .exec()
    .then((activity) => {
      res.status(200).json(activity);
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error: " + error.message });
    });
}

async function getbyid(req, res) {
  Activity.findById(req.params.id)
    .exec()
    .then((activity) => {
      if (!activity) res.status(404).json({ error: "Couldn't find Activity" });
      else res.status(200).json(activity);
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error: " + error.message });
    });
}

async function add(req, res) {
  const activity = req.body;
  const newItem = new Activity(activity);
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
    const activity = await Activity.findByIdAndDelete(id);
    if (!activity) res.status(404).json({ error: "Couldn't find Activity" });
    else res.status(204).json({ info: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

async function update(req, res) {
  const id = req.params.id;
  try {
    const activity = await Activity.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!activity) res.status(404).json({ error: "Couldn't find Activity" });
    else res.status(200).json(activity);
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

module.exports = { getall, getbyid, add, remove, update };
