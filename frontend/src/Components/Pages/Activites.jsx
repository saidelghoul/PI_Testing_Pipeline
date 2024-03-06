import { useEffect, useState } from "react";
import "../../../public/assets/css/activite.css";
import { getActivities } from "../../services/activity-service";
import Activity from "./Activity";
import ActivityForm from "./ActivityForm";

export default function Activites() {
  const [activities, setActivities] = useState([]);
  const [showForm, setShowForm] = useState(true);

  const displayForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getActivities();
      setActivities(data.data.message);
      console.log(data.data.message);

      /*const response = await fetch("http://localhost:8000/activities");
      const data = await response.json();
      setActivities(data.message);*/
    };

    fetchData();
  }, []);

  return (
    <>
      <main className="content">
        <div className="container p-0">
          <h1 className="h3 mb-3">Activites Board ({activities.length})</h1>

          {showForm && <ActivityForm />}
          <div className="row">
            <div className="col-12 col-lg-6 col-xl-3">
              <div className="card card-border-primary">
                <div className="card-header">
                  <div className="card-actions float-right">
                    <div className="dropdown show">
                      <a href="#" data-toggle="dropdown" data-display="static">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                      </a>

                      <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="#">
                          Action
                        </a>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
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
                    return <Activity key={index} activity={activity} />;
                  })}

                  <a
                    onClick={displayForm}
                    href="#"
                    className="btn btn-primary btn-block"
                    style={{ backgroundColor: "#e44d3a" }}
                  >
                    Add new
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 col-xl-3">
              <div className="card card-border-warning">
                <div className="card-header">
                  <div className="card-actions float-right">
                    <div className="dropdown show">
                      <a href="#" data-toggle="dropdown" data-display="static">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          className="feather feather-more-horizontal align-middle"
                        >
                          <circle cx="12" cy="12" r="1"></circle>
                          <circle cx="19" cy="12" r="1"></circle>
                          <circle cx="5" cy="12" r="1"></circle>
                        </svg>
                      </a>

                      <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="#">
                          Action
                        </a>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </div>
                    </div>
                  </div>
                  <h5 className="card-title">In Progress</h5>
                  <h6 className="card-subtitle text-muted">
                    Nam pretium turpis et arcu. Duis arcu tortor.
                  </h6>
                </div>
                <div className="card-body">
                  <a
                    href="#"
                    className="btn btn-primary btn-block"
                    style={{ backgroundColor: "#e44d3a" }}
                  >
                    Add new
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 col-xl-3">
              <div className="card card-border-danger">
                <div className="card-header">
                  <div className="card-actions float-right">
                    <div className="dropdown show">
                      <a href="#" data-toggle="dropdown" data-display="static">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          className="feather feather-more-horizontal align-middle"
                        >
                          <circle cx="12" cy="12" r="1"></circle>
                          <circle cx="19" cy="12" r="1"></circle>
                          <circle cx="5" cy="12" r="1"></circle>
                        </svg>
                      </a>

                      <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="#">
                          Action
                        </a>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </div>
                    </div>
                  </div>
                  <h5 className="card-title">On hold</h5>
                  <h6 className="card-subtitle text-muted">
                    Nam pretium turpis et arcu. Duis arcu tortor.
                  </h6>
                </div>
                <div className="card-body">
                  <a
                    href="#"
                    className="btn btn-primary btn-block"
                    style={{ backgroundColor: "#e44d3a" }}
                  >
                    Add new
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 col-xl-3">
              <div className="card card-border-success">
                <div className="card-header">
                  <div className="card-actions float-right">
                    <div className="dropdown show">
                      <a href="#" data-toggle="dropdown" data-display="static">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          className="feather feather-more-horizontal align-middle"
                        >
                          <circle cx="12" cy="12" r="1"></circle>
                          <circle cx="19" cy="12" r="1"></circle>
                          <circle cx="5" cy="12" r="1"></circle>
                        </svg>
                      </a>

                      <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="#">
                          Action
                        </a>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </div>
                    </div>
                  </div>
                  <h5 className="card-title">Completed</h5>
                  <h6 className="card-subtitle text-muted">
                    Nam pretium turpis et arcu. Duis arcu tortor.
                  </h6>
                </div>
                <div className="card-body">
                  <a
                    href="#"
                    className="btn btn-primary btn-block"
                    style={{ backgroundColor: "#e44d3a" }}
                  >
                    Add new
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
