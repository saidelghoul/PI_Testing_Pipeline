var Activity = require("../model/activity");

async function getActivities(req, res) {
  Activity.find({})
    .exec()
    .then((activity) => {
      res.status(200).json(activity);
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error: " + error.message });
    });
}

async function getActivityById(req, res) {
  Activity.findById(req.params.id_activity)
    .exec()
    .then((activity) => {
      if (!activity) res.status(404).json({ error: "Couldn't find Activity" });
      else res.status(200).json(activity);
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error: " + error.message });
    });
}

async function addActivity(req, res) {
  try {
    const activity = req.body;
    const { startDate, endDate } = activity;
    if (startDate > endDate)
      res.status(500).json({ error: "startDate must be greater than endDate" });
    else {
      const newItem = new Activity(activity);
      newItem.approval = false;
      const saved = await newItem.save();
      res.status(201).json(saved);
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

async function removeActivity(req, res) {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id_activity);
    if (!activity) res.status(404).json({ error: "Couldn't find Activity" });
    else res.status(204).json({ info: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

async function updateActivity(req, res) {
  try {
    const { startDate, endDate } = req.body;
    if (startDate > endDate)
      res.status(500).json({ error: "startDate must be greater than endDate" });
    else {
      const activity = await Activity.findByIdAndUpdate(
        req.params.id_activity,
        req.body,
        {
          new: true,
        }
      );
      if (!activity) res.status(404).json({ error: "Couldn't find Activity" });
      else res.status(200).json(activity);
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

async function getTasksByActivity(req, res, next) {
  try {
    const activity = await Activity.find({
      _id: req.params.id_activity,
    }).populate("tasks");
    res.status(200).json(activity);
  } catch (err) {
    res.status(500).json({ error: "internal error" });
  }
}

module.exports = {
  getActivities,
  getActivityById,
  addActivity,
  removeActivity,
  updateActivity,
  getTasksByActivity,
};
