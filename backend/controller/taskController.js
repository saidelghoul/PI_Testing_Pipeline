const Task = require("../model/task");
const Activity = require("../model/activity");

async function getTasks(req, res, next) {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (err) {
    res.status(500).json({ message: "Task not found" });
  }
}

async function getTaskById(req, res) {
  try {
    const task = await Task.findById(req.params.id_task);
    if (task) res.status(200).send(task);
    else res.status(400).json({ message: "Task not found" });
  } catch (err) {
    res.status(500).json({ message: "error", message: err.message });
  }
}

async function getCheckListsByTask(req, res) {
  try {
    const task = await Task.findById(req.params.id_task).populate("checkList");
    res.status(200).json(task.checkList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function addTaskToActivity(req, res) {
  try {
    const task = new Task(req.body);
    const { initDate, dueDate } = req.body;

    if (initDate > dueDate) {
      res.status(500).json({ message: "init date is greater than due date" });
    } else {
      task.id_activity = req.params.id_activity;
      const respo = await Activity.findById(req.params.id_activity);
      if (respo) {
        respo.tasks.push(task);
        const updatedActivity = await Activity.findByIdAndUpdate(
          req.params.id_activity,
          respo,
          { new: true }
        );

        const savedTask = await task.save();
        if (!savedTask || !updatedActivity)
          res.status(404).json({ error: "something went wrong" });
        else
          res
            .status(201)
            .json({ message: "Task saved successfully", task: savedTask });
      } else {
        res.status(404).json({ error: "no activity found" });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function updateTask(req, res, next) {
  try {
    const { initDate, dueDate } = req.body;

    if (initDate > dueDate) {
      res.status(500).json({ message: "init date is greater than due date" });
    } else {
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id_task,
        req.body,
        {
          new: true,
        }
      );
      if (!updatedTask) res.status(404).json({ error: "Task not found" });
      else
        res
          .status(200)
          .json({ message: "Task updated successfully", task: updatedTask });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteTask(req, res, next) {
  try {
    const task = await Task.findByIdAndDelete(req.params.id_task);
    if (!task) res.status(404).json({ error: "Task not found" });
    else {
      const updatedActivity = await Activity.updateOne(
        { _id: task.id_activity },
        {
          $pull: { tasks: req.params.id_task },
        }
      );

      if (updatedActivity)
        res.status(200).json({ message: "Task deleted successfully" });
      else
        res
          .status(404)
          .json({ error: "Failed to delete task ref from activity" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getTasks,
  getTaskById,
  getCheckListsByTask,
  addTaskToActivity,
  updateTask,
  deleteTask,
};
