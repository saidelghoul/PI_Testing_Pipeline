const CheckList = require("../model/checklist");
const Task = require("../model/task");

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

async function getCheckListByTaskId(req, res) {
  try {
    const checkLists = await CheckList.find({
      id_task: req.params.id_task,
    }).populate("holder");

    if (!checkLists)
      res.status(404).json({ title: "error", message: "No checkLists found" });
    else res.status(200).json({ title: "success", message: checkLists });
  } catch (err) {
    res.status(500).json({ title: "error", message: err.message });
  }
}

async function getCheckListById(req, res) {
  try {
    const checkList = await CheckList.findById(
      req.params.id_checklist
    ).populate("holder");

    if (!checkList)
      res.status(404).json({ title: "error", message: "No checkLists found" });
    else {
      const newHolder = {
        _id: checkList.holder._id,
        name: checkList.holder.name,
        role: checkList.holder.role,
      };
      checkList.holder = newHolder;
      res.status(200).json({ title: "success", message: checkList });
    }
  } catch (err) {
    res.status(500).json({ title: "error", message: err.message });
  }
}

async function getCheckListByHolder(req, res) {
  try {
    const checkList = await CheckList.find({
      holder: req.params.id_user,
    }).populate("holder");

    if (!checkList)
      res.status(404).json({ title: "error", message: "No checkLists found" });
    else {
      const current = checkList.filter(
        (checklist) => checklist.archived === false
      );
      res.status(200).json({ title: "success", message: current });
    }
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
      task.status = "active";

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
          title: "success",
          message: "added checklist successfully to parent task: " + task.title,
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
      const updatedTask = await Task.updateOne(
        { _id: checklist.id_task },
        { $pull: { checkList: req.params.id_checklist } }
      );
      if (!updatedTask)
        res.status(404).json({
          title: "error",
          message: "error removing checklist from its parent task",
        });
      else
        res
          .status(200)
          .json({ title: "deleted", message: "deleted successfully" });
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
    else {
      const task = await Task.findById(checklist.id_task).populate("checkList");
      // for task status update, this checks if all the checklists inside a task are done
      let total = 0;
      const current = task.checkList.filter(
        (checklist) => checklist.archived === false
      );
      current.forEach((checklist) => {
        if (checklist.done) total++;
      });
      if (current.length === total) task.status = "complete";
      else if (total === 0) task.status = "planned";
      else task.status = "active";
      const saved = await task.save();
      //
      if (!saved)
        res
          .status(500)
          .json({ title: "error", message: "error updating task status" });
      else
        res.status(200).json({
          title: "updated",
          message: "Checklist updated successfully",
        });
    }
  } catch (err) {
    res.status(500).json({ title: "error", message: err.message });
  }
}

async function getAssignedUsersForChecklist(req, res) {
  try {
    const task = await Task.findById(req.params.id_task).populate(
      "collaborators"
    );

    if (!task)
      res.status(500).json({ title: "error", message: "no such task" });
    else {
      let users = [];
      for (const collaborator of task.collaborators) {
        let sum = 0;
        let checklists = await CheckList.find({
          holder: collaborator._id,
          id_task: req.params.id_task,
          archived: false,
        });
        let doneTasks = checklists.filter(
          (checklist) => checklist.done === true
        );
        doneTasks.forEach((checklist) => (sum += checklist.score));
        users.push({
          id: collaborator._id,
          name: collaborator.name,
          role: collaborator.role,
          score: sum,
          numberOfDoneTasks: doneTasks.length,
          numberOfTasks: checklists.length,
        });
      }

      res.status(200).json({ title: "success", message: users });
    }
  } catch (err) {
    res.status(500).json({ title: "error", message: err.message });
  }
}

async function getChecklistScoreForUser(req, res) {
  try {
    const checklists = await CheckList.find({
      holder: req.params.id_user,
      archived: false,
    });

    if (!checklists)
      res.status(500).json({ title: "error", message: "no checklists found" });
    else {
      let sum = 0;
      const doneTasks = checklists.filter(
        (checklist) => checklist.done === true
      );
      doneTasks.forEach((checklist) => (sum += checklist.score));
      res.status(200).json({
        title: "success",
        message: {
          somme: sum,
          numberOfTasks: doneTasks.length,
        },
      });
    }
  } catch (err) {
    res.status(500).json({ title: "error", message: err.message });
  }
}

module.exports = {
  createCheckList,
  removeChecklist,
  getCheckLists,
  getCheckListByTaskId,
  getCheckListById,
  getCheckListByHolder,
  updateChecklist,
  getAssignedUsersForChecklist,
  getChecklistScoreForUser,
};
