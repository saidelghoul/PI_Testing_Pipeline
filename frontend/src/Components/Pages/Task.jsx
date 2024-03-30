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

  //define priority bg color
  let bgpriority;

  switch (task.priority) {
    case "high":
      bgpriority = "danger";
      break;
    case "medium":
      bgpriority = "primary";
      break;
    default:
      bgpriority = "success";
      break;
  }

  //define
  let bgstatus;

  switch (task.status) {
    case "active":
      bgstatus = "danger";
      break;
    case "planned":
      bgstatus = "primary";
      break;
    default:
      bgstatus = "success";
      break;
  }

  return (
    <div className="card mb-3 bg-light">
      <div className="card-body p-3">
        <div className="float-right mr-n2 gap-2 ">
          <Badge className=" text-white " pill bg={bgpriority}>
            {task.priority} priority
          </Badge>
          <br />
          <Badge className=" text-white mt-2 " pill bg={bgstatus}>
            {task.status}
          </Badge>
        </div>
        <h1 className="text-bold">{task.title}</h1>

        {task.description !== "" && <p>Description: {task.description}</p>}

        <p>
          {task.initDate.substr(0, 10)} - {task.dueDate.substr(0, 10)}
        </p>
        <div className=" row-cols-2 ">
          <p>Collaborators: {task?.collaborators?.length}</p>
          <p>Checklist: {task?.checkList?.length}</p>
        </div>
        <div className=" d-flex flex-row row-gap-2 ">
          <Link to={`/tasks/${task._id}`}>
            <Button
              className="btn btn-outline-danger btn-sm"
              style={{ backgroundColor: "#fff", color: "#e44d3a" }}
            >
              View
            </Button>
          </Link>
          <Button
            className="btn btn-outline-danger btn-sm"
            style={{ backgroundColor: "#fff", color: "#e44d3a" }}
            onClick={handleShowUpdate}
          >
            Update
          </Button>
          {task?.checkList?.length === 0 && (
            <Button
              className="btn btn-outline-danger btn-sm"
              style={{ backgroundColor: "#e44d3a", color: "#fff" }}
              onClick={handleShowDelete}
            >
              Remove
            </Button>
          )}
        </div>

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
  options: PropTypes.arrayOf(PropTypes.object),
};

export default Task;
