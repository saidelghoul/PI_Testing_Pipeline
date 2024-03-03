const CheckList = require("../model/checklist");
const Task = require("../model/task");

async function getCheckLists(req, res) {
  try {
    const checkLists = await CheckList.find({});
    res.status(200).json(checkLists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getCheckListById(req, res) {
  try {
    const checkList = await CheckList.findById(req.params.id_checklist);
    res.status(200).json(checkList);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

async function createCheckList(req, res, next) {
  try {
    const task = await Task.findById(req.params.id_task);
    if (!task) {
      res.status(404).json({ message: "task id does not exist" });
    } else {
      const checklist = new CheckList(req.body);
      checklist.id_task = req.params.id_task;
      checklist.done = false;

      task.checkList.push(task);

      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id_activity,
        task,
        { new: true }
      );

      const result = await checklist.save();
      if (!result || !updatedTask) {
        res.status(404).json({ message: "task id does not exist" });
      } else res.status(200).json({ message: result });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function removeChecklist(req, res) {
  try {
    const checklist = await CheckList.findByIdAndDelete(
      req.params.id_checklist
    );
    if (!checklist)
      res.status(404).json({ message: "error finding & deleting checklist" });
    else {
      const updatedTask = Task.updateOne(
        { _id: checklist.id_task },
        { $pull: { checklist: req.params.id_checklist } }
      );
      if (!updatedTask) res.status(404).json({ message: "error updating" });
      else res.status(200).json({ updatedTask });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function updateChecklist(req, res) {
  try {
    const checklist = await CheckList.findByIdAndUpdate(
      req.params.id_checklist,
      req.body,
      { next: true }
    );
    if (checklist) res.status(200).json({ message: "checklist updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  createCheckList,
  removeChecklist,
  getCheckLists,
  getCheckListById,
  updateChecklist,
};
