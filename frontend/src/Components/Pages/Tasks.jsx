import React, { useEffect, useState } from "react";
import Task from "./Task";
import { getTasksByActivity } from "../../services/activity-service";
import { Button } from "react-bootstrap";
import TaskForm from "../Modals/TaskForm";
import { deleteTask } from "../../services/task-service";

const Tasks = ({ id_act }) => {
  const [tasks, setTasks] = useState([]);

  /* pop up*/
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* pop up end*/

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

  const removeTask = async (id) => {
    const result = await deleteTask(id);
    if (result.status == "204") {
      alert("deleted successfully");
      setTasks(tasks.filter((task) => task._id !== id));
    }
  };
  /** */

  const refreshTable = async (activityItem) => {
    setShow(false);
    setTasks([...tasks, activityItem]);
  };

  return (
    <>
      <main className="content">
        <div className="container p-0">
          <div className=" row ">
            <h1 className="h3 mb-3 col-md-9 ">Tasks Board</h1>
            <h1 className="h3 mb-3 col-md-3 ">
              <Button
                onClick={handleShow}
                href="#"
                className="btn btn-primary btn-block"
                style={{ backgroundColor: "#e44d3a" }}
              >
                Add new
              </Button>
              <TaskForm
                refresh={refreshTable}
                show={show}
                handleClose={handleClose}
                id_act={id_act}
              />
            </h1>
          </div>

          <div className="row">
            <div className="col-12 col-lg-6 col-xl-3">
              <div className="card card-border-primary">
                <div className="card-header">
                  <div className="card-actions float-right">
                    <div className="dropdown show">
                      <Button
                        data-toggle="dropdown"
                        data-display="static"
                      ></Button>

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
                    return (
                      <Task
                        key={index}
                        task={task}
                        refresh={refreshTable}
                        rmTask={removeTask}
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

                <div className="card-body">
                  {plannedTasks.map((task, index) => {
                    return <Task key={index} task={task} />;
                  })}
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
                <div className="card-body"></div>
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
                <div className="card-body"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Tasks;
