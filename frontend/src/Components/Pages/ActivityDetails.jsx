import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActivities } from "../../services/activity-service";
import Tasks from "./Tasks";

const ActivityDetails = () => {
  const { id_activity } = useParams();

  const [activity, setActivity] = useState({});

  useEffect(() => {
    const fetchActivity = async (id) => {
      const data = await getActivities(id);
      setActivity(data.data.message);
    };

    fetchActivity(id_activity);
  }, []);

  return (
    <div className="container p-0 ">
      <h1 className="h3 mb-3">Activity Details</h1>
      <div className=" row ">
        <div className=" col">
          <h1 className=" text-bg-primary "> Name: {activity.name}</h1>

          <h1 className=" text-bg-primary "> Category: {activity.category}</h1>
        </div>
        <div className=" col-auto ">
          <p className=" text-body-emphasis "> Collaborators </p>
        </div>
      </div>
      <hr />
      <Tasks id_act={id_activity} />
    </div>
  );
};

export default ActivityDetails;
