import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Badge, Button } from "react-bootstrap";
import DeleteForm from "../Modals/DeleteForm";
import UpdateForm from "../Modals/UpdateForm";

const Activity = ({ activity, rmActivity, refresh }) => {
  /* pop up*/
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);

  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowDelete = () => setShowDelete(true);

  const handleShowUpdate = () => setShowUpdate(true);

  /* pop up end*/
  let bg;

  switch (activity.category) {
    case "course":
      bg = "danger";
      break;
    case "workshop":
      bg = "success";
      break;
    case "project":
      bg = "primary";
      break;
    default:
      bg = "warning";
      break;
  }

  return (
    <div className="card mb-3 bg-light">
      <div className="card-body p-3">
        <div className="float-right mr-n2 gap-2 ">
          <Badge className=" text-white " pill bg={bg}>
            {activity.category}
          </Badge>
        </div>
        <h1 className="text-bold">{activity.name}</h1>
        {activity.description !== "" && (
          <p>Description: {activity.description}</p>
        )}

        <p>
          {activity.startDate.substr(0, 10)} - {activity.endDate.substr(0, 10)}
        </p>
        <p>Tasks: {activity?.tasks?.length}</p>
        <div className=" d-flex flex-row row-gap-2 ">
          <Link to={`/activities/${activity._id}`}>
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

          {activity?.tasks?.length === 0 && (
            <Button
              className="btn btn-outline-light btn-sm"
              style={{ backgroundColor: "#e44d3a", color: "#fff" }}
              onClick={handleShowDelete}
            >
              Remove
            </Button>
          )}
        </div>
        <DeleteForm
          rmActivity={rmActivity}
          show={showDelete}
          handleClose={handleCloseDelete}
          activity={activity}
        />

        <UpdateForm
          refresh={refresh}
          show={showUpdate}
          handleClose={handleCloseUpdate}
          activity={activity}
        />
      </div>
    </div>
  );
};

Activity.propTypes = {
  activity: PropTypes.object,
  rmActivity: PropTypes.func,
  refresh: PropTypes.func,
};

export default Activity;
