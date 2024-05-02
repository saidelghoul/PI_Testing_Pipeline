import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActivities } from "../../services/activity-service";
import Tasks from "./Tasks";
import { ProgressBar, Spinner } from "react-bootstrap";

const ActivityDetails = () => {
  const { id_activity } = useParams();

  const [activity, setActivity] = useState({});
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const getProgress = (tasks) => {
    if (tasks?.length > 0) {
      const current = tasks?.filter((task) => task?.archived === false);
      setProgress(
        Math.floor(
          (current?.filter((task) => task?.status === "complete")?.length /
            current?.length) *
            100
        )
      );
    } else setProgress(0);
  };

  const refresh = async () => {
    getProgress(activity?.tasks);
  };

  const fetchActivity = async (id) => {
    const data = await getActivities(id);
    setActivity(data.data.message);
    setLoading(false);
  };
  useEffect(() => {
    fetchActivity(id_activity);
    getProgress(activity?.tasks);
  }, []);

  if (loading) {
    return (
      <main className="content">
        <div className=" text-center ">
          <Spinner animation="border" role="output" variant="danger"></Spinner>
        </div>
      </main>
    );
  }

  return (
    <div className="container p-0 ">
      <h1 className="h3 mb-3 text-center ">Activity Details 📈</h1>
      <h1 className="h3 mb-3 text-center ">
        [ {activity.category} ] : ( {activity.name} )
      </h1>
      <div className=" row ">
        <div className=" col text-center h5 ">
          <h1 className=" text-bg-primary ">
            {" "}
            {activity?.startDate?.substr(0, 10)} ~{" "}
            {activity?.endDate?.substr(0, 10)} 📅
          </h1>
          {new Date() > new Date(activity?.endDate) && (
            <h1 className=" text-bg-primary text-danger ">
              {" "}
              (Days passed:{" "}
              {Math.round(
                (new Date().getTime() - new Date(activity?.endDate).getTime()) /
                  (1000 * 3600 * 24)
              )}
              )
            </h1>
          )}
          {new Date() < new Date(activity?.endDate) && (
            <h1 className=" text-bg-primary text-danger ">
              {" "}
              (Days left:{" "}
              {Math.round(
                (-1 *
                  (new Date().getTime() -
                    new Date(activity?.endDate).getTime())) /
                  (1000 * 3600 * 24)
              )}
              )
            </h1>
          )}
        </div>
        {activity.description !== "" && (
          <div className=" col-auto ">
            <small className=" text-bg-primary "> Description: ✒️</small>
            <p className=" text-body-emphasis ">{activity.description}</p>
          </div>
        )}
      </div>
      <div className=" row-cols-1 mt-2">
        <ProgressBar
          striped
          variant="success"
          animated
          now={progress}
          label={`${progress}%`}
        />
      </div>
      <hr />
      <Tasks activity={activity} refresh={refresh} />
    </div>
  );
};

export default ActivityDetails;
