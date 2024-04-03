import { useEffect, useState } from "react";
import "../../../public/assets/css/activite.css";
import {
  deleteActivity,
  getActivities,
  updateActivity,
} from "../../services/activity-service";
import Activity from "./Activity";
import ActivityForm from "../Modals/ActivityForm";
import { Button, Spinner, Table } from "react-bootstrap";
import DeleteForm from "../Modals/DeleteForm";

export default function Activites() {
  const [activities, setActivities] = useState([]);
  const [archived, setArchived] = useState([]);
  //handle showing archived activity
  const [showArchived, setShowArchived] = useState(true);

  const [progress, setProgress] = useState([]);

  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);

  /* pop up*/
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* pop up*/
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  /* pop up end*/

  /* pop up end*/
  const fetchData = async () => {
    const data = await getActivities();

    const current = data.data.message.filter(
      (activity) => activity.archived === false
    );

    const archived = data.data.message.filter(
      (activity) => activity.archived === true
    );

    setArchived(archived);

    setActivities(
      current.filter((activity) => new Date(activity.startDate) > new Date())
    );

    setProgress(
      current.filter(
        (activity) =>
          new Date(activity.startDate) < new Date() &&
          new Date(activity.endDate) > new Date()
      )
    );

    setCompleted(
      current.filter((activity) => new Date(activity.endDate) < new Date())
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  /** */

  const removeActivity = async (id) => {
    try {
      const result = await deleteActivity(id);
      if (result.status === 204) {
        alert("Deleted successfully");
        fetchData();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const editActivity = async (id, activity) => {
    try {
      activity.archived = true;
      const result = await updateActivity(id, activity);
      if (result.status === 200) {
        alert("Activity has been archived successfully!");
        fetchData();
      }
    } catch (error) {
      alert(error.message);
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
      <div className=" d-flex flex-row justify-content-end m-3 ">
        <Button
          variant="secondary"
          onClick={() => setShowArchived(!showArchived)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-archive"
            viewBox="0 0 16 16"
          >
            <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
          </svg>
          Archived Activities
        </Button>
      </div>

      {showArchived ? (
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
                        upActivity={editActivity}
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
                        upActivity={editActivity}
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
                        upActivity={editActivity}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container p-0">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Activity name</th>
                <th>Category</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Description</th>

                <th>Delete?</th>
              </tr>
            </thead>
            <tbody>
              {archived.map((activity, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{activity?.name}</td>
                  <td>{activity?.category}</td>
                  <td>{activity?.startDate?.substr(0, 10)}</td>

                  <td>{activity?.endDate?.substr(0, 10)}</td>

                  <td>{activity?.description}</td>
                  <td>
                    <Button
                      className="btn btn-outline-light btn-sm"
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
                      Remove
                    </Button>

                    <DeleteForm
                      upActivity={removeActivity}
                      show={showDelete}
                      handleClose={handleCloseDelete}
                      activity={activity}
                      deleting={false}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </main>
  );
}
