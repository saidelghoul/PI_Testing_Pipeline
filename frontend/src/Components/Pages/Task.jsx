import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Task = ({ task }) => {
  return (
    <div className="card mb-3 bg-light">
      <div className="card-body p-3">
        <div className="float-right mr-n2">
          <label className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              checked=""
            />
            <span className="custom-control-label"></span>
          </label>
        </div>
        <h1 className="text-bold">{task.title}</h1>

        <p>{task.description}</p>
        <p>
          {task.initDate.substr(0, 10)} - {task.dueDate.substr(0, 10)}
        </p>
        <div className="float-right mt-n1">
          <img
            src="/assets/images/resources/user-pro-img.png"
            width="32"
            height="32"
            className="rounded-circle"
            alt="Avatar"
          />
        </div>
        <Link to={`/tasks/${task._id}`}>
          <Button
            className="btn btn-outline-primary btn-sm"
            style={{ backgroundColor: "#e44d3a", color: "#fff" }}
          >
            View
          </Button>
        </Link>
      </div>
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.object,
};

export default Task;
