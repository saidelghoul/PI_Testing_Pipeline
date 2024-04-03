import { useEffect, useState } from "react";
import Task from "./Task";
import { getTasksByActivity } from "../../services/activity-service";
import { Button, Spinner, Table } from "react-bootstrap";
import TaskForm from "../Modals/TaskForm";
import { deleteTask, updateTask } from "../../services/task-service";
import PropTypes from "prop-types";
import TaskDelete from "../Modals/TaskDelete";

const Tasks = ({ activity }) => {
  const [tasks, setTasks] = useState([]);

  const [archived, setArchived] = useState([]);
  //handle showing archived activity
  const [showArchived, setShowArchived] = useState(true);
  const [overdone, setOverdone] = useState([]);
  const [progress, setProgress] = useState([]);
  const [completed, setCompleted] = useState([]);

  const [loading, setLoading] = useState(true);

  /* pop up*/
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* pop up*/
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  /* pop up end*/

  /* pop up end*/
  const fetchTasks = async (id) => {
    const data = await getTasksByActivity(id);

    const current = data.data.message.filter((task) => task.archived === false);

    const archived = data.data.message.filter((task) => task.archived === true);
    setArchived(archived);

    setTasks(
      current.filter(
        (task) =>
          new Date(task.initDate) > new Date() && task.status === "planned"
      )
    );

    setOverdone(
      current.filter(
        (task) =>
          (new Date(task.dueDate) < new Date() && task.status === "active") ||
          (new Date(task.initDate) < new Date() &&
            new Date(task.dueDate) > new Date() &&
            task.status === "planned") ||
          (new Date(task.dueDate) < new Date() && task.status === "planned")
      )
    );

    setProgress(
      current.filter(
        (task) =>
          (new Date(task.initDate) < new Date() &&
            new Date(task.dueDate) > new Date() &&
            task.status === "active") ||
          (new Date(task.initDate) > new Date() && task.status === "active")
      )
    );

    setCompleted(current.filter((task) => task.status === "complete"));

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
        alert("Deleted successfully");
        fetchTasks(activity._id);
      }
    } catch (err) {
      alert(err.message);
    }
  };
  /** */

  const editTask = async (id, task) => {
    try {
      task.archived = true;
      const result = await updateTask(id, task);
      if (result.status === 200) {
        alert("Task has been archived successfully!");

        fetchTasks(activity._id);
      }
    } catch (error) {
      alert(error.message);
    }
  };

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
      <div className=" d-flex flex-row justify-content-end m-3 ">
        <Button
          variant="secondary"
          onClick={() => setShowArchived(!showArchived)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-archive"
            viewBox="0 0 16 16"
          >
            <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
          </svg>
          Archived Tasks
        </Button>
      </div>

      {showArchived ? (
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
                        upTask={editTask}
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
                        upTask={editTask}
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
                        upTask={editTask}
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
                        upTask={editTask}
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
      ) : (
        <div className="container p-0">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Task title</th>
                <th>Initial Date</th>

                <th>Due Date</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Tags</th>
                <th>Collaborators</th>
                <th>Description</th>

                <th>Delete?</th>
              </tr>
            </thead>
            <tbody>
              {archived.map((task, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{task?.title}</td>
                  <td>{task?.initDate?.substr(0, 10)}</td>

                  <td>{task?.dueDate?.substr(0, 10)}</td>
                  <td>{task?.status}</td>
                  <td>{task?.priority}</td>

                  <td>{task?.tags}</td>

                  <td>{task?.collaborators.length}</td>
                  <td>{task?.description}</td>
                  <td>
                    <Button
                      className="btn btn-outline-light btn-sm"
                      style={{ backgroundColor: "#e44d3a", color: "#fff" }}
                      onClick={handleShowDelete}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                      </svg>
                      Remove
                    </Button>

                    <TaskDelete
                      refresh={refreshTable}
                      upTask={removeTask}
                      show={showDelete}
                      handleClose={handleCloseDelete}
                      task={task}
                      deleting={false}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </main>
  );
};

Tasks.propTypes = {
  activity: PropTypes.object,
};

export default Tasks;
