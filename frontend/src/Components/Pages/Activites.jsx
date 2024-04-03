import { useEffect, useState } from "react";
import "../../../public/assets/css/activite.css";
import { deleteActivity, getActivities } from "../../services/activity-service";
import Activity from "./Activity";
import ActivityForm from "../Modals/ActivityForm";
import { Button, Spinner } from "react-bootstrap";

export default function Activites() {
  const [activities, setActivities] = useState([]);

  const [progress, setProgress] = useState([]);

  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);

  /* pop up*/
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* pop up end*/
  const fetchData = async () => {
    const data = await getActivities();
    setActivities(
      data.data.message.filter((activity) => activity.startDate > new Date())
    );

    setProgress(
      data.data.message.filter(
        (activity) =>
          new Date(activity.startDate) < new Date() &&
          new Date(activity.endDate) > new Date()
      )
    );

    setCompleted(
      data.data.message.filter(
        (activity) => new Date(activity.endDate) < new Date()
      )
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  /** */

  const removeActivity = async (id) => {
    const result = await deleteActivity(id);
    if (result.status === 204) {
      alert("deleted successfully");
      fetchData();
    }
  };
  /** */

  const refreshTable = async () => {
    setShow(false);

    fetchData();
  };

  if (loading) {
    return (
      <main className="content">
        <div className="container p-0">
          <Spinner animation="border" role="output" variant="danger">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </main>
    );
  }

  return (
    <main className="content">
      <div className="container p-0">
        <div className=" row ">
          <h1 className="h3 mb-3 col-md-9 ">
            Activites Board (
            {activities.length + progress.length + completed.length})
          </h1>
          <h1 className=" col-md-3 ">
            <Button
              onClick={handleShow}
              href="#"
              className="btn btn-primary btn-block"
              style={{ backgroundColor: "#e44d3a" }}
            >
              Add new
            </Button>
            <ActivityForm
              refresh={refreshTable}
              show={show}
              handleClose={handleClose}
            />
          </h1>
        </div>
        <hr />

        <div className="row">
          <div className="col-12 col-lg-4 col-xl-4">
            <div className="card card-border-primary">
              <div className="card-header">
                <div className="card-actions float-right">
                  <div className="dropdown show"></div>
                </div>
                <h5 className="card-title">
                  Upcoming ( {activities?.length} )
                </h5>
                <h6 className="card-subtitle text-muted">
                  Activities that are yet to be achieved due to their duration
                </h6>
              </div>
              <div className="card-body p-3">
                {activities.map(function (activity, index) {
                  return (
                    <Activity
                      key={index}
                      refresh={refreshTable}
                      activity={activity}
                      rmActivity={removeActivity}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 col-xl-4">
            <div className="card card-border-warning">
              <div className="card-header">
                <div className="card-actions float-right">
                  <div className="dropdown show"></div>
                </div>
                <h5 className="card-title">
                  In Progress ( {progress?.length} )
                </h5>
                <h6 className="card-subtitle text-muted">
                  Activities that are currently marked as in progress due to
                  their duration
                </h6>
              </div>
              <div className="card-body">
                {progress.map(function (activity, index) {
                  return (
                    <Activity
                      key={index}
                      refresh={refreshTable}
                      activity={activity}
                      rmActivity={removeActivity}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 col-xl-4">
            <div className="card card-border-success">
              <div className="card-header">
                <div className="card-actions float-right">
                  <div className="dropdown show"></div>
                </div>
                <h5 className="card-title">
                  Completed ( {completed?.length} )
                </h5>
                <h6 className="card-subtitle text-muted">
                  Activities that have been marked as completed due to their
                  duration
                </h6>
              </div>
              <div className="card-body">
                {completed.map(function (activity, index) {
                  return (
                    <Activity
                      key={index}
                      refresh={refreshTable}
                      activity={activity}
                      rmActivity={removeActivity}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
