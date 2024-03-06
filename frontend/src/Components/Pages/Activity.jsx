import React from "react";

const Activity = ({ activity }) => {
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
        <a className="btn btn-outline-primary btn-sm" href="#">
          View
        </a>
      </div>
    </div>
  );
};

export default Activity;
