import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const Activity = ({ activity, rmActivity }) => {
  const [toggleButton, setToggleButton] = useState(false);

  return (
    <div className="card mb-3 bg-light">
      <div className="card-body p-3">
        <div className="float-right mr-n2">
          <label className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              onChange={() => setToggleButton(!toggleButton)}
            />
            <span className="custom-control-label"></span>
          </label>
        </div>
        <h1 className="text-bold">{activity.name}</h1>
        <b>/#{activity.category}</b>
        <p>{activity.description}</p>
        <p>
          {activity.startDate.substr(0, 10)} - {activity.endDate.substr(0, 10)}
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
        <Link to={`/activities/${activity._id}`}>
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
          onClick={() => {
            rmActivity(activity._id);
          }}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

Activity.propTypes = {
  activity: PropTypes.object,
  rmActivity: PropTypes.func,
};

export default Activity;
