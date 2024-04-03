import { useEffect, useState } from "react";
import Task from "./Task";
import { getTasksByActivity } from "../../services/activity-service";
import { Button, Spinner } from "react-bootstrap";
import TaskForm from "../Modals/TaskForm";
import { deleteTask } from "../../services/task-service";
import PropTypes from "prop-types";

const Tasks = ({ activity }) => {
  const [tasks, setTasks] = useState([]);
  const [overdone, setOverdone] = useState([]);
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

    setTasks(
      data.data.message.filter(
        (task) =>
          new Date(task.initDate) > new Date() && task.status === "planned"
      )
    );

    setOverdone(
      data.data.message.filter(
        (task) =>
          (new Date(task.dueDate) < new Date() && task.status === "active") ||
          (new Date(task.initDate) < new Date() &&
            new Date(task.dueDate) > new Date() &&
            task.status === "planned") ||
          (new Date(task.dueDate) < new Date() && task.status === "planned")
      )
    );

    setProgress(
      data.data.message.filter(
        (task) =>
          (new Date(task.initDate) < new Date() &&
            new Date(task.dueDate) > new Date() &&
            task.status === "active") ||
          (new Date(task.initDate) > new Date() && task.status === "active")
      )
    );

    setCompleted(
      data.data.message.filter((task) => task.status === "complete")
    );

    setLoading(false);
  };

  // start of options definition by activity category
  let options = [];
  switch (activity.category) {
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
    fetchTasks(activity._id);
  }, []);

  const removeTask = async (id) => {
    try {
      const result = await deleteTask(id);
      if (result.status === 204) {
        alert("deleted successfully");

        fetchTasks(activity._id);
      }
    } catch (err) {
      alert(err.message);
    }
  };
  /** */

  const refreshTable = async () => {
    setShow(false);
    fetchTasks(activity._id);
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
            Tasks Board (
            {tasks.length +
              progress.length +
              overdone.length +
              completed.length}
            )
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
              activity={activity}
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
                <h5 className="card-title">Upcoming ( {tasks?.length} )</h5>
                <h6 className="card-subtitle text-muted">
                  Tasks that have not reached their period and they are marked
                  as planned
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
                      activity={activity}
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
                <h5 className="card-title">
                  In Progress ( {progress?.length} )
                </h5>
                <h6 className="card-subtitle text-muted">
                  Tasks that are currently in their period or started before &
                  marked as active
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
                      activity={activity}
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
                <h5 className="card-title">On hold ( {overdone?.length} )</h5>
                <h6 className="card-subtitle text-muted">
                  Tasks that are past their finish date but still marked as
                  active or they are planned but were not finished in date or
                  still in period
                </h6>
              </div>
              <div className="card-body">
                {overdone.map((task, index) => {
                  return (
                    <Task
                      key={index}
                      task={task}
                      refresh={refreshTable}
                      removeTask={removeTask}
                      options={options}
                      activity={activity}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 col-xl-3">
            <div className="card card-border-success">
              <div className="card-header">
                <div className="card-actions float-right">
                  <div className="dropdown show"></div>
                </div>
                <h5 className="card-title">
                  Completed ( {completed?.length} )
                </h5>
                <h6 className="card-subtitle text-muted">
                  Tasks that are marked as completed
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
                      activity={activity}
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

Tasks.propTypes = {
  activity: PropTypes.object,
};

export default Tasks;
