import React, { useEffect, useState } from "react";
import Task from "./Task";
import { getTasksByActivity } from "../../services/activity-service";
import { Button, Spinner } from "react-bootstrap";
import TaskForm from "../Modals/TaskForm";
import { deleteTask } from "../../services/task-service";

const Tasks = ({ id_act, category }) => {
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState([]);
  const [completed, setCompleted] = useState([]);

  const [loading, setLoading] = useState(true);

  /* pop up*/
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* pop up end*/
  const fetchTasks = async (id) => {
    const data = await getTasksByActivity(id);

    setTasks(data.data.message.filter((task) => task.initDate > new Date()));

    setProgress(
      data.data.message.filter(
        (task) =>
          new Date(task.initDate) < new Date() &&
          new Date(task.dueDate) > new Date()
      )
    );

    setCompleted(
      data.data.message.filter((task) => new Date(task.dueDate) < new Date())
    );

    setLoading(false);
  };

  // start of options definition by activity category
  let options = [];
  switch (category) {
    case "course":
      options = [
        { value: "Lectures", label: "Lectures" },
        { value: "Assignments", label: "Assignments" },
        { value: "Exercises", label: "Exercises" },
        { value: "Resources", label: "Resources" },
        { value: "Feedback", label: "Feedback" },
        { value: "Discussion", label: "Discussion" },
        { value: "Evaluation", label: "Evaluation" },
      ];
      break;

    case "workshop":
      options = [
        { value: "Demonstration", label: "Demonstration" },
        { value: "Activities", label: "Activities" },
        { value: "Materials", label: "Materials" },
        { value: "Feedback", label: "Feedback" },
        { value: "Discussions", label: "Discussions" },
        { value: "Evaluation", label: "Evaluation" },
      ];
      break;

    case "project":
      options = [
        { value: "Requirements", label: "Requirements" },
        { value: "Design", label: "Design" },
        { value: "Coding", label: "Coding" },
        { value: "Testing", label: "Testing" },
        { value: "Documentation", label: "Documentation" },
        { value: "Feedback", label: "Feedback" },
        { value: "Discussions", label: "Discussions" },
        { value: "Evaluation", label: "Evaluation" },
      ];
      break;

    default:
      options = [
        { value: "Instructions", label: "Instructions" },
        { value: "Questions", label: "Questions" },
        { value: "Marking", label: "Marking" },
        { value: "Protocols", label: "Protocols" },
        { value: "Timing", label: "Timing" },
        { value: "Feedback", label: "Feedback" },
        { value: "Discussions", label: "Discussions" },
        { value: "Evaluation", label: "Evaluation" },
      ];
      break;
  }

  // end of options definition by activity category

  useEffect(() => {
    fetchTasks(id_act);
  }, []);

  const removeTask = async (id) => {
    try {
      const result = await deleteTask(id);
      if (result.status == 204) {
        alert("deleted successfully");
        setTasks(tasks.filter((task) => task._id !== id));
      }
    } catch (err) {
      alert(err.message);
    }
  };
  /** */

  const refreshTable = async () => {
    setShow(false);
    fetchTasks(id_act);
  };

  if (loading) {
    return (
      <Spinner animation="border" role="output" variant="danger">
        <span className="visually-hidden container p-0">Loading...</span>
      </Spinner>
    );
  }

  return (
    <main className="content">
      <div className="container p-0">
        <div className=" row ">
          <h1 className="h3 mb-3 col-md-9 ">
            Tasks Board ({tasks.length + progress.length + completed.length})
          </h1>
          <h1 className="h3 mb-3 col-md-3 ">
            <Button
              onClick={handleShow}
              href="#"
              className="btn btn-primary btn-block"
              style={{ backgroundColor: "#e44d3a" }}
            >
              Add new
            </Button>
            <TaskForm
              refresh={refreshTable}
              show={show}
              handleClose={handleClose}
              id_act={id_act}
              options={options}
            />
          </h1>
        </div>

        <div className="row">
          <div className="col-12 col-lg-6 col-xl-3">
            <div className="card card-border-primary">
              <div className="card-header">
                <div className="card-actions float-right">
                  <div className="dropdown show"></div>
                </div>
                <h5 className="card-title">Upcoming</h5>
                <h6 className="card-subtitle text-muted">
                  Nam pretium turpis et arcu. Duis arcu tortor.
                </h6>
              </div>
              <div className="card-body p-3">
                {tasks.map(function (task, index) {
                  return (
                    <Task
                      key={index}
                      task={task}
                      refresh={refreshTable}
                      removeTask={removeTask}
                      options={options}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 col-xl-3">
            <div className="card card-border-warning">
              <div className="card-header">
                <div className="card-actions float-right">
                  <div className="dropdown show"></div>
                </div>
                <h5 className="card-title">In Progress</h5>
                <h6 className="card-subtitle text-muted">
                  Nam pretium turpis et arcu. Duis arcu tortor.
                </h6>
              </div>

              <div className="card-body">
                {progress.map((task, index) => {
                  return (
                    <Task
                      key={index}
                      task={task}
                      refresh={refreshTable}
                      removeTask={removeTask}
                      options={options}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 col-xl-3">
            <div className="card card-border-danger">
              <div className="card-header">
                <div className="card-actions float-right">
                  <div className="dropdown show"></div>
                </div>
                <h5 className="card-title">On hold</h5>
                <h6 className="card-subtitle text-muted">
                  Nam pretium turpis et arcu. Duis arcu tortor.
                </h6>
              </div>
              <div className="card-body"></div>
            </div>
          </div>
          <div className="col-12 col-lg-6 col-xl-3">
            <div className="card card-border-success">
              <div className="card-header">
                <div className="card-actions float-right">
                  <div className="dropdown show"></div>
                </div>
                <h5 className="card-title">Completed</h5>
                <h6 className="card-subtitle text-muted">
                  Nam pretium turpis et arcu. Duis arcu tortor.
                </h6>
              </div>
              <div className="card-body">
                {completed.map((task, index) => {
                  return (
                    <Task
                      key={index}
                      task={task}
                      refresh={refreshTable}
                      removeTask={removeTask}
                      options={options}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Tasks;
