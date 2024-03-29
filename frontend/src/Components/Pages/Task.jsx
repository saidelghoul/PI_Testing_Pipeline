import PropTypes from "prop-types";
import { useState } from "react";
import { Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import TaskDelete from "../Modals/TaskDelete";
import TaskUpdate from "../Modals/TaskUpdate";

const Task = ({ task, removeTask, refresh, options }) => {
  /* pop up*/
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);

  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowDelete = () => setShowDelete(true);

  const handleShowUpdate = () => setShowUpdate(true);

  /* pop up end*/
  return (
    <div className="card mb-3 bg-light">
      <div className="card-body p-3">
        <div className="float-right mr-n2">
          {task.priority === "high" && (
            <Badge className=" text-white " pill bg="danger">
              High priority
            </Badge>
          )}
        </div>
        <h1 className="text-bold">{task.title}</h1>

        {task.description !== "" && <p>Description: {task.description}</p>}

        <p>Status: {task.status}</p>

        <p>
          {task.initDate.substr(0, 10)} - {task.dueDate.substr(0, 10)}
        </p>
        <div className="float-right mt-n1">
          <p>Collaborators: {task?.collaborators?.length}</p>
          <p>Checklist: {task?.checkList?.length}</p>
        </div>
        <Link to={`/tasks/${task._id}`}>
          <Button
            className="btn btn-outline-primary btn-sm"
            style={{ backgroundColor: "#e44d3a", color: "#fff" }}
          >
            View
          </Button>
        </Link>

        <Button
          className="btn btn-outline-primary btn-sm"
          style={{ backgroundColor: "#e44d3a", color: "#fff" }}
          onClick={handleShowDelete}
        >
          Remove
        </Button>

        <Button
          className="btn btn-outline-primary btn-sm"
          style={{ backgroundColor: "#fff", color: "#e44d3a" }}
          onClick={handleShowUpdate}
        >
          Update
        </Button>

        <TaskDelete
          refresh={refresh}
          removeTask={removeTask}
          show={showDelete}
          handleClose={handleCloseDelete}
          task={task}
        />

        <TaskUpdate
          refresh={refresh}
          show={showUpdate}
          handleClose={handleCloseUpdate}
          task={task}
          options={options}
        />
      </div>
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.object,
  removeTask: PropTypes.func,
  refresh: PropTypes.func,
};

export default Task;
