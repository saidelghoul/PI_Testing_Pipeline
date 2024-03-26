const CheckList = require("../model/checklist");
const Task = require("../model/task");
const UserModel = require("../model/user");

async function getCheckLists(req, res) {
  try {
    const checkLists = await CheckList.find({});
    if (!checkLists)
      res.status(404).json({ title: "error", message: "No checkLists found" });
    else res.status(200).json({ title: "success", message: checkLists });
  } catch (err) {
    res.status(500).json({ title: "error", message: err.message });
  }
}

async function getCheckListById(req, res) {
  try {
    const checkList = await CheckList.findById(req.params.id_checklist);

    if (!checkList)
      res.status(404).json({ title: "error", message: "No checkLists found" });
    else res.status(200).json({ title: "success", message: checkList });
  } catch (err) {
    res.status(500).json({ title: "error", message: err.message });
  }
}

async function createCheckList(req, res, next) {
  try {
    const task = await Task.findById(req.params.id_task);
    if (!task) {
      res.status(404).json({ title: "error", message: "verify given task id" });
    } else {
      const checklist = new CheckList(req.body);
      checklist.id_task = req.params.id_task;
      checklist.done = false;

      task.checkList.push(checklist);

      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id_task,
        task,
        { new: true }
      );

      const result = await checklist.save();
      if (!result || !updatedTask) {
        res.status(404).json({
          title: "error",
          message:
            "error updating parent task with new checklist/saving new checklist",
        });
      } else
        res.status(201).json({
          title: "added checklist successfully to parent task: " + task.title,
          message: result,
        });
    }
  } catch (err) {
    res.status(500).json({ title: "error", message: err.message });
  }
}

async function removeChecklist(req, res) {
  try {
    const checklist = await CheckList.findByIdAndDelete(
      req.params.id_checklist
    );
    if (!checklist)
      res.status(404).json({
        title: "error",
        message: "error finding & deleting checklist",
      });
    else {
      const updatedTask = Task.updateOne(
        { _id: checklist.id_task },
        { $pull: { checklist: req.params.id_checklist } }
      );
      if (!updatedTask)
        res.status(404).json({
          title: "error",
          message: "error removing checklist from its parent task",
        });
      else res.status(200).json({ title: "deleted", message: updatedTask });
    }
  } catch (err) {
    res.status(500).json({ title: "error", message: err.message });
  }
}

async function updateChecklist(req, res) {
  try {
    const checklist = await CheckList.findByIdAndUpdate(
      req.params.id_checklist,
      req.body,
      { next: true }
    );
    if (!checklist)
      res
        .status(500)
        .json({ title: "error", message: "error updating checklist" });
    else
      res
        .status(200)
        .json({ title: "updated", message: "Checklist updated successfully" });
  } catch (err) {
    res.status(500).json({ title: "error", message: err.message });
  }
}

async function getUsersForChecklist() {
  try {
    const users = await UserModel.aggregate([{ $project: { id: $_id } }]);
    if (users.length > 0)
      res.status(200).json({ title: "success", message: users });
    else res.status(404).json({ title: "error", message: "no users found" });
  } catch (err) {
    res.status(500).json({ title: "error", message: err });
  }
}

module.exports = {
  createCheckList,
  removeChecklist,
  getCheckLists,
  getCheckListById,
  updateChecklist,
  getUsersForChecklist,
};
