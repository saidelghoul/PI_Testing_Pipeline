import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Badge, Button, ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import TaskDelete from "../Modals/TaskDelete";
import TaskUpdate from "../Modals/TaskUpdate";

const Task = ({ task, upTask, refresh, options, activity }) => {
  /* pop up*/
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);

  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowDelete = () => setShowDelete(true);

  const handleShowUpdate = () => setShowUpdate(true);

  /* pop up end*/

  const [progress, setProgress] = useState(0);

  const getProgress = (checklists) => {
    if (checklists?.length > 0) {
      const current = checklists?.filter(
        (checklist) => checklist?.archived === false
      );

      setProgress(
        Math.floor(
          (current?.filter((checklist) => checklist?.done)?.length /
            current?.length) *
            100
        )
      );
    } else setProgress(0);
  };

  useEffect(() => {
    getProgress(task.checkList);
  }, [task.checkList]);

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

  //define status bg color
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

        <div className="mb-2">
          <ProgressBar
            striped
            variant="success"
            animated
            now={progress}
            label={`${progress}%`}
          />
        </div>
        <div className=" d-flex flex-row row-gap-2 ">
          <Link to={`/tasks/${task._id}`}>
            <Button
              className="btn btn-outline-danger btn-sm"
              style={{ backgroundColor: "#fff", color: "#e44d3a" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-eye-fill"
                viewBox="0 0 16 16"
              >
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
              </svg>
            </Button>
          </Link>
          <Button
            className="btn btn-outline-danger btn-sm"
            style={{ backgroundColor: "#fff", color: "#e44d3a" }}
            onClick={handleShowUpdate}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil"
              viewBox="0 0 16 16"
            >
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
            </svg>
          </Button>
          <Button
            className="btn btn-outline-danger btn-sm"
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
          </Button>
        </div>

        <TaskDelete
          refresh={refresh}
          upTask={upTask}
          show={showDelete}
          handleClose={handleCloseDelete}
          task={task}
          deleting={true}
        />

        <TaskUpdate
          refresh={refresh}
          show={showUpdate}
          handleClose={handleCloseUpdate}
          task={task}
          options={options}
          activity={activity}
        />
      </div>
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.object,
  upTask: PropTypes.func,
  refresh: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  activity: PropTypes.object,
};

export default Task;
