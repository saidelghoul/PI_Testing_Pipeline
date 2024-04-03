import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChecklistByTask, getTasks } from "../../services/task-service";
import Checklist from "./Checklist";
import ChecklistForm from "../Modals/ChecklistForm";
import { Badge, Button, Spinner } from "react-bootstrap";
import {
  deleteChecklist,
  getAssignedUsersForChecklist,
} from "../../services/checklist-service";

const TaskDetails = () => {
  const { id_task } = useParams();
  const [loading, setLoading] = useState(true);

  const [task, setTask] = useState({});
  const [checklists, setChecklists] = useState({});

  const [users, setUsers] = useState([]);

  const fetchChecklist = async (id) => {
    const data = await getChecklistByTask(id);
    setChecklists(data.data.message);
  };

  const refreshTable = async () => {
    setShow(false);
    fetchChecklist(id_task);
  };

  useEffect(() => {
    const fetchTask = async (id) => {
      const data = await getTasks(id);
      setTask(data.data.message);
    };

    const fetchChecklist = async (id) => {
      const data = await getChecklistByTask(id);
      setChecklists(data.data.message);
    };

    const fetchAssignedUsers = async (id) => {
      const data = await getAssignedUsersForChecklist(id);
      setUsers(data.data.message);
      setLoading(false);
    };

    fetchTask(id_task);
    fetchChecklist(id_task);
    fetchAssignedUsers(id_task);
  }, []);

  /* pop up*/
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* pop up end*/

  const removeChecklist = async (id) => {
    try {
      const result = await deleteChecklist(id);
      if (result.status === 204) {
        alert("deleted successfully");
        fetchChecklist(id_task);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  //define priority bg color
  let bgpriority;

  switch (task.priority) {
    case "high":
      bgpriority = "danger";
      break;
    case "medium":
      bgpriority = "primary";
      break;
    default:
      bgpriority = "success";
      break;
  }

  //define status bg color
  let bgstatus;

  switch (task.status) {
    case "active":
      bgstatus = "danger";
      break;
    case "planned":
      bgstatus = "primary";
      break;
    default:
      bgstatus = "success";
      break;
  }

  if (loading) {
    return (
      <Spinner animation="border" role="output" variant="danger">
        <span className="visually-hidden container p-0">Loading...</span>
      </Spinner>
    );
  }

  return (
    <div className="container p-0 ">
      <h1 className="h3 mb-3 text-center ">Task Details</h1>
      <h1 className="h3 mb-3 text-center ">( {task.title} )</h1>
      <div className=" d-flex flex-row flex-wrap gap-3 mt-4 text-center ">
        {task?.tags?.map((tag, index) => (
          <span
            key={`${index}-${tag}`}
            className=" d-flex d-inline-flex align-items-start justify-content-start px-3 py-2 rounded rounded-2 text-sm-center shadow-sm font-monospace mr-2"
          >
            {tag}
          </span>
        ))}
      </div>
      <hr />
      <div className=" row ">
        <div className=" col">
          <Badge pill bg={bgpriority}>
            <p className=" text-white "> {task.priority} priority</p>
          </Badge>
          <br />
          <Badge pill bg={bgstatus} className=" mt-2">
            <p className=" text-white"> {task.status}</p>
          </Badge>
        </div>
        <div className=" col ">
          <h1 className=" text-bg-primary ">
            {" "}
            From: {task?.initDate?.substr(0, 10)}
          </h1>
          <h1 className=" text-bg-primary ">
            {" "}
            To: {task?.dueDate?.substr(0, 10)}
          </h1>
        </div>
        <div className=" col ">
          <small className=" text-bg-primary "> Collaborators: </small>
          {users.map((user, index) => (
            <p className=" text-body-emphasis " key={index}>
              {" "}
              {user.name} ( {user.role} )
            </p>
          ))}
        </div>
        <div className=" col-auto ">
          <small className=" text-bg-primary "> Description: </small>
          <p className=" text-body-emphasis ">{task.description}</p>
        </div>
      </div>
      <hr />
      <div className="container p-0">
        <div className=" row ">
          <h1 className="h3 mb-3 col-md-9 ">
            Checklist Board ({checklists.length})
          </h1>
          <h1 className="h3 mb-3 col-md-3 ">
            <Button
              onClick={handleShow}
              href="#"
              className="btn btn-primary btn-block"
              style={{ backgroundColor: "#e44d3a" }}
            >
              Add new
            </Button>
            <ChecklistForm
              refresh={refreshTable}
              show={show}
              handleClose={handleClose}
              id_task={id_task}
              users={users}
            />
          </h1>
        </div>
        {checklists.length > 0 && (
          <div className=" d-flex flex-wrap p-3">
            {checklists.map((checklist, index) => {
              return (
                <Checklist
                  refresh={refreshTable}
                  key={index}
                  checkList={checklist}
                  index={index + 1}
                  rmChecklist={removeChecklist}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;
