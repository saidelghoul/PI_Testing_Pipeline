const Task = require("../model/task");
const Activity = require("../model/activity");
const UserModel = require("../model/user");

async function getTasks(req, res, next) {
  try {
    const tasks = await Task.find({});
    if (!tasks)
      res.status(404).json({ title: "error", message: "No Tasks found" });
    else res.status(200).json({ title: "success", message: tasks });
  } catch (err) {
    res.status(500).json({ title: "error", message: err.message });
  }
}

async function getTaskById(req, res) {
  try {
    const task = await Task.findById(req.params.id_task).populate(
      "collaborators"
    );

    if (!task)
      res.status(404).json({ title: "error", message: "Task not found" });
    else {
      res.status(200).json({ title: "success", message: task });
    }
  } catch (err) {
    res.status(500).json({ title: "error", message: err.message });
  }
}

//this method is different from the one in activityController
//as the model task has the id of its parent(activity)
//we can use it and populate the checklist at the same time
//without having to get the tasks from the parent(activity) and populate tasks & populate checklist which is under tasks
async function getTasksByActivityId(req, res) {
  try {
    const tasks = await Task.find({
      id_activity: req.params.id_activity,
    }).populate("checkList");

    if (!tasks)
      res.status(404).json({ title: "error", message: "No tasks found" });
    else res.status(200).json({ title: "success", message: tasks });
  } catch (err) {
    res.status(500).json({ title: "error", message: err.message });
  }
}

async function getCheckListsByTask(req, res) {
  try {
    const task = await Task.findById(req.params.id_task).populate("checkList");
    if (task)
      res.status(200).json({ title: "success", message: task.checkList });
    else
      res.status(404).json({ title: "error", message: "checkList not found" });
  } catch (err) {
    res.status(500).json({ title: "error", message: err.message });
  }
}

async function addTaskToActivity(req, res) {
  try {
    const task = new Task(req.body);
    const { initDate, dueDate } = req.body;

    if (initDate > dueDate) {
      res.status(500).json({
        title: "error",
        message: "init date is greater than due date",
      });
    } else {
      task.id_activity = req.params.id_activity;
      const act = await Activity.findById(req.params.id_activity);
      if (act) {
        act.tasks.push(task);
        const updatedActivity = await Activity.findByIdAndUpdate(
          req.params.id_activity,
          act,
          { new: true }
        );

        const savedTask = await task.save();
        if (!savedTask || !updatedActivity)
          res.status(404).json({
            title: "error",
            message:
              "error updating parent activity with new task/saving new task",
          });
        else
          res
            .status(201)
            .json({ title: "success", message: "Task saved successfully" });
      } else {
        res.status(404).json({ title: "error", error: "no activity found" });
      }
    }
  } catch (err) {
    res.status(500).json({ title: "error", message: err.message });
  }
}

async function updateTask(req, res, next) {
  try {
    const { initDate, dueDate } = req.body;

    if (initDate > dueDate) {
      res.status(500).json({
        title: "error",
        message: "init date is greater than due date",
      });
    } else {
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id_task,
        req.body,
        {
          new: true,
        }
      );
      if (!updatedTask)
        res.status(404).json({ title: "error", error: "Task not found" });
      else
        res
          .status(200)
          .json({ title: "updated", message: "task updated successfully" });
    }
  } catch (err) {
    res.status(500).json({ title: "error", error: err.message });
  }
}

async function deleteTask(req, res, next) {
  try {
    const task = await Task.findByIdAndDelete(req.params.id_task);
    if (!task)
      res.status(404).json({ title: "error", message: "Task not found" });
    else {
      const updatedActivity = await Activity.updateOne(
        { _id: task.id_activity },
        {
          $pull: { tasks: req.params.id_task },
        }
      );

      if (!updatedActivity)
        res.status(404).json({
          title: "error",
          message: "Failed to delete task ref from activity",
        });
      else if (updatedActivity?.checkList?.length > 0) {
        res
          .status(500)
          .json({ title: "error", message: "this task has checklists in it" });
      } else
        res
          .status(204)
          .json({ title: "deleted", message: "Task deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ title: "error", error: err.message });
  }
}

/*async function getUsersForTask(req, res) {
  try {
    const users = await UserModel.aggregate([
      { $project: { id: 1, name: 1, role: 1,departement: 1,unite: 1 } },
    ]);
    if (users.length > 0)
      res.status(200).json({ title: "success", message: users });
    else res.status(404).json({ title: "error", message: "no users found" });
  } catch (err) {
    res.status(500).json({ title: "error", message: err.message });
  }
}*/
async function getUsersForTask(req, res) {
  try {
    const users = await UserModel.aggregate([
      {
        $lookup: {
          from: "departements", // Nom de la collection des départements
          localField: "departement",
          foreignField: "_id",
          as: "departmentDetails",
        },
      },
      {
        $lookup: {
          from: "unites", // Nom de la collection des unités
          localField: "unite",
          foreignField: "_id",
          as: "uniteDetails",
        },
      },
      {
        $project: {
          name: 1,
          role: 1,
          "departmentDetails.name": 1, // Extraire le nom du département
          "uniteDetails.name": 1, // Extraire le nom de l'unité
          profileImage :1
        },
      },
    ]);

    if (users.length > 0) {
      res.status(200).json({ title: "success", message: users });
    } else {
      res.status(404).json({ title: "error", message: "No users found" });
    }
  } catch (err) {
    res.status(500).json({ title: "error", message: err.message });
  }
}


module.exports = {
  getTasks,
  getTaskById,
  getCheckListsByTask,
  getTasksByActivityId,
  addTaskToActivity,
  updateTask,
  deleteTask,
  getUsersForTask,
};
