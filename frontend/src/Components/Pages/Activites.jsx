import { useEffect, useState } from "react";
import "../../../public/assets/css/activite.css";
import { deleteActivity, getActivities } from "../../services/activity-service";
import Activity from "./Activity";
import ActivityForm from "../Modals/ActivityForm";
import { Button } from "react-bootstrap";

export default function Activites() {
  const [activities, setActivities] = useState([]);

  /* pop up*/
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* pop up end*/

  useEffect(() => {
    const fetchData = async () => {
      const data = await getActivities();
      setActivities(data.data.message);
    };

    fetchData();
  }, []);

  /** */

  const removeActivity = async (id) => {
    const result = await deleteActivity(id);
    if (result.status == "204") {
      alert("deleted successfully");
      setActivities(activities.filter((activity) => activity._id !== id));
    }
  };
  /** */

  const refreshTable = async (activityItem) => {
    setShow(false);
    setActivities([...activities, activityItem]);
  };
  return (
    <>
      <main className="content">
        <div className="container p-0">
          <div className=" row ">
            <h1 className="h3 mb-3 col-md-9 ">
              Activites Board ({activities.length})
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

          <div className="row">
            <div className="col-12 col-lg-6 col-xl-3">
              <div className="card card-border-primary">
                <div className="card-header">
                  <div className="card-actions float-right">
                    <div className="dropdown show">
                      <Button data-toggle="dropdown" data-display="static">
                        {" "}
                      </Button>

                      <div className="dropdown-menu dropdown-menu-right">
                        <Button className="dropdown-item">Action</Button>
                        <Button className="dropdown-item">
                          Another action
                        </Button>
                        <Button className="dropdown-item">
                          Something else here
                        </Button>
                      </div>
                    </div>
                  </div>
                  <h5 className="card-title">Upcoming</h5>
                  <h6 className="card-subtitle text-muted">
                    Nam pretium turpis et arcu. Duis arcu tortor.
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
            <div className="col-12 col-lg-6 col-xl-3">
              <div className="card card-border-warning">
                <div className="card-header">
                  <div className="card-actions float-right">
                    <div className="dropdown show">
                      <Button
                        data-toggle="dropdown"
                        data-display="static"
                      ></Button>

                      <div className="dropdown-menu dropdown-menu-right">
                        <Button className="dropdown-item">Action</Button>
                        <Button className="dropdown-item">
                          Another action
                        </Button>
                        <Button className="dropdown-item">
                          Something else here
                        </Button>
                      </div>
                    </div>
                  </div>
                  <h5 className="card-title">In Progress</h5>
                  <h6 className="card-subtitle text-muted">
                    Nam pretium turpis et arcu. Duis arcu tortor.
                  </h6>
                </div>
                <div className="card-body"></div>
              </div>
            </div>
            <div className="col-12 col-lg-6 col-xl-3">
              <div className="card card-border-danger">
                <div className="card-header">
                  <div className="card-actions float-right">
                    <div className="dropdown show">
                      <Button
                        data-toggle="dropdown"
                        data-display="static"
                      ></Button>

                      <div className="dropdown-menu dropdown-menu-right">
                        <Button className="dropdown-item">Action</Button>
                        <Button className="dropdown-item">
                          Another action
                        </Button>
                        <Button className="dropdown-item">
                          Something else here
                        </Button>
                      </div>
                    </div>
                  </div>
                  <h5 className="card-title">On hold</h5>
                  <h6 className="card-subtitle text-muted">
                    Nam pretium turpis et arcu. Duis arcu tortor.
                  </h6>
                </div>
                <div className="card-body"></div>
              </div>
            </div>
            <div className="col-12 col-lg-6 col-xl-3">
              <div className="card card-border-success">
                <div className="card-header">
                  <div className="card-actions float-right">
                    <div className="dropdown show">
                      <Button
                        data-toggle="dropdown"
                        data-display="static"
                      ></Button>

                      <div className="dropdown-menu dropdown-menu-right">
                        <Button className="dropdown-item">Action</Button>
                        <Button className="dropdown-item">
                          Another action
                        </Button>
                        <Button className="dropdown-item">
                          Something else here
                        </Button>
                      </div>
                    </div>
                  </div>
                  <h5 className="card-title">Completed</h5>
                  <h6 className="card-subtitle text-muted">
                    Nam pretium turpis et arcu. Duis arcu tortor.
                  </h6>
                </div>
                <div className="card-body"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
