var Activity = require("../model/activity");

async function getActivities(req, res) {
  Activity.find({})
    .exec()
    .then((activity) => {
      res.status(200).json({ title: "success", message: activity });
    })
    .catch((error) => {
      res.status(500).json({ title: "Server error: ", message: error.message });
    });
}

async function getActivityById(req, res) {
  Activity.findById(req.params.id_activity)
    .exec()
    .then((activity) => {
      if (!activity)
        res
          .status(404)
          .json({ title: "error", message: "Couldn't find Activity" });
      else res.status(200).json({ title: "success", message: activity });
    })
    .catch((error) => {
      res.status(500).json({ title: "Server error: ", message: error.message });
    });
}

async function addActivity(req, res) {
  try {
    const activity = req.body;
    const { startDate, endDate } = activity;
    if (startDate > endDate)
      res.status(500).json({
        title: "error",
        message: "startDate must be greater than endDate",
      });
    else {
      const newItem = new Activity(activity);
      newItem.approval = false;
      const saved = await newItem.save();
      if (!saved)
        res
          .status(500)
          .json({ title: "error", message: "error saving activity" });
      else res.status(201).json({ title: "success", message: saved });
    }
  } catch (err) {
    res.status(500).json({ title: "Server error", message: err.message });
  }
}

async function removeActivity(req, res) {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id_activity);
    if (!activity)
      res
        .status(404)
        .json({ title: "error", message: "Couldn't find Activity" });
    else if (activity.tasks.length > 0) {
      res
        .status(500)
        .json({ title: "error", message: "this activity has tasks in it" });
    } else
      res
        .status(204)
        .json({ title: "deleted", message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ title: "Server error", message: err.message });
  }
}

async function updateActivity(req, res) {
  try {
    const { startDate, endDate } = req.body;
    if (startDate > endDate)
      res.status(500).json({
        title: "error",
        message: "startDate must be greater than endDate",
      });
    else {
      const activity = await Activity.findByIdAndUpdate(
        req.params.id_activity,
        req.body,
        {
          new: true,
        }
      );
      if (!activity)
        res
          .status(404)
          .json({ title: "error", message: "Couldn't find Activity" });
      else res.status(200).json({ title: "success", message: activity });
    }
  } catch (err) {
    res.status(500).json({ title: "Server error", message: err.message });
  }
}

async function getTasksByActivity(req, res, next) {
  try {
    const activity = await Activity.find({
      _id: req.params.id_activity,
    }).populate("tasks");
    if (!activity)
      res
        .status(404)
        .json({ title: "error", message: "Couldn't find Activity" });
    else res.status(200).json({ title: "success", message: activity });
  } catch (err) {
    res.status(500).json({ title: "error", message: err.message });
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
