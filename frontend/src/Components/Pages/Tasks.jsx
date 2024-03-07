import React, { useEffect, useState } from "react";
import Task from "./Task";
import { getTasksByActivity } from "../../services/activity-service";

const Tasks = ({ id_act }) => {
  const [tasks, setTasks] = useState([]);

  const [plannedTasks, setPlannedTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async (id) => {
      const data = await getTasksByActivity(id);
      console.log(data.data.message[0].tasks);
      setTasks(data.data.message[0].tasks);

      const filteredTasks = data.data.message[0].tasks.filter((task) => {
        task.status === "planned";
      });
      setPlannedTasks(filteredTasks);

      console.log(plannedTasks);
    };
    fetchTasks(id_act);
  }, []);

  return (
    <>
      <main className="content">
        <div className="container p-0">
          <h1 className="h3 mb-3">Tasks Board</h1>

          <div className="row">
            <div className="col-12 col-lg-6 col-xl-3">
              <div className="card card-border-primary">
                <div className="card-header">
                  <div className="card-actions float-right">
                    <div className="dropdown show">
                      <a
                        href="#"
                        data-toggle="dropdown"
                        data-display="static"
                      ></a>

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
                  {tasks.map(function (task, index) {
                    return <Task key={index} task={task} />;
                  })}
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
                        ></svg>
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

                {plannedTasks.map((task, index) => {
                  return <Task key={index} task={task} />;
                })}
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
                        ></svg>
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
                        ></svg>
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
};

export default Tasks;
