import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTasks } from "../../services/task-service";
import Checklist from "./Checklist";
import ChecklistForm from "../Modals/ChecklistForm";
import {
  Badge,
  Button,
  Form,
  InputGroup,
  ProgressBar,
  Spinner,
  Table,
} from "react-bootstrap";
import {
  deleteChecklist,
  getAssignedUsersForChecklist,
  getChecklistByTaskWithHolder,
  updateChecklist,
} from "../../services/checklist-service";
import ChecklistDelete from "../Modals/ChecklistDelete";
import toast from "react-hot-toast";

const TaskDetails = () => {
  const { id_task } = useParams();
  const [loading, setLoading] = useState(true);

  const [task, setTask] = useState({});
  const [archived, setArchived] = useState([]);
  //handle showing archived activity
  const [showArchived, setShowArchived] = useState(true);

  const [checklists, setChecklists] = useState([]);

  const [users, setUsers] = useState([]);

  const [progress, setProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const getProgress = (current) => {
    if (current?.length > 0) {
      setProgress(
        Math.floor(
          (current?.filter((checklist) => checklist?.done === true)?.length /
            current?.length) *
            100
        )
      );
    } else setProgress(0);
  };

  const fetchChecklist = async (id) => {
    const data = await getChecklistByTaskWithHolder(id);

    const current = data.data.message.filter(
      (checklist) => checklist.archived === false
    );
    setChecklists(current);

    getProgress(current);

    const archived = data.data.message.filter(
      (checklist) => checklist.archived === true
    );
    setArchived(archived);
  };

  const fetchTask = async (id) => {
    const data = await getTasks(id);
    setTask(data.data.message);
  };

  const fetchAssignedUsers = async (id) => {
    const data = await getAssignedUsersForChecklist(id);
    setUsers(data.data.message);
    setLoading(false);
  };
  const refreshTable = async () => {
    setShow(false);
    fetchTask(id_task);
    fetchChecklist(id_task);
    fetchAssignedUsers(id_task);
    getProgress(checklists);
  };

  useEffect(() => {
    fetchTask(id_task);
    fetchChecklist(id_task);
    fetchAssignedUsers(id_task);
  }, []);

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

  const removeChecklist = async (id) => {
    try {
      const result = await deleteChecklist(id);
      if (result.status === 204) {
        toast.success("Deleted successfully");
        fetchChecklist(id_task);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  /** */

  const editChecklist = async (id, checklist, isArchived) => {
    try {
      checklist.archived = isArchived;
      const result = await updateChecklist(id, checklist);
      if (result.status === 200) {
        toast.success("Checklist has been archived successfully!");
        fetchChecklist(id_task);
      }
    } catch (error) {
      toast.error(error.message);
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

  const filtered = checklists?.filter(
    (checklist) =>
      checklist?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      checklist?.holder.name
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      checklist?.holder?.role
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const displayed = searchTerm === "" ? checklists : filtered;

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
    <main className="content">
      <div className="container p-0 ">
        <h1 className="h3 mb-3 text-center ">Task Details 💡</h1>
        <h1 className="h3 mb-3 text-center ">( {task.title} )</h1>
        <div className=" d-flex flex-row flex-wrap gap-3 mt-4 text-center ">
          🔖
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
            <h1 className=" text-bg-primary h5 ">
              {" "}
              {task?.initDate?.substr(0, 10)} ~ {task?.dueDate?.substr(0, 10)}{" "}
              📌
            </h1>
            {new Date() > new Date(task?.dueDate) && (
              <h1 className=" text-bg-primary text-danger ">
                {" "}
                (Days passed:{" "}
                {Math.round(
                  (new Date().getTime() - new Date(task?.dueDate).getTime()) /
                    (1000 * 3600 * 24)
                )}
                )
              </h1>
            )}
            {new Date() < new Date(task?.dueDate) && (
              <h1 className=" text-bg-primary text-danger ">
                {" "}
                (Days left:{" "}
                {Math.round(
                  (-1 *
                    (new Date().getTime() -
                      new Date(task?.dueDate).getTime())) /
                    (1000 * 3600 * 24)
                )}
                )
              </h1>
            )}
          </div>
          <div className=" col ">
            <small className=" text-bg-primary "> Collaborators: 🧑‍💼 </small>
            {users.map((user, index) => (
              <p className=" text-body-emphasis " key={index}>
                {" "}
                {user.name} ( {user.role} ) [{user.numberOfDoneTasks}/
                {user.numberOfTasks} tasks done] - Score {user.score}
              </p>
            ))}
          </div>
          {task.description !== "" && (
            <div className=" col-auto ">
              <small className=" text-bg-primary "> Description: ✒️</small>
              <p className=" text-body-emphasis ">{task.description}</p>
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

        <div className=" d-flex flex-row m-3 ">
          <InputGroup className="col-md-6 d-flex flex-row">
            <InputGroup.Text id="basic-addon1">🔎</InputGroup.Text>
            <Form.Control
              placeholder="Search..."
              aria-label="Search..."
              aria-describedby="basic-addon1"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          <div className="col-md-4"></div>
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
            Archived Checklist
          </Button>
        </div>

        {showArchived ? (
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
                {displayed.map((checklist, index) => {
                  return (
                    <Checklist
                      refresh={refreshTable}
                      key={index}
                      checkList={checklist}
                      task={task}
                      index={index + 1}
                      upChecklist={editChecklist}
                    />
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="container p-0">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Checklist title</th>
                  <th>Holder</th>
                  <th>Description</th>
                  <th>Restore?</th>
                  <th>Delete?</th>
                </tr>
              </thead>
              <tbody>
                {archived.map((checklist, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{checklist?.title}</td>
                    <td>
                      {checklist?.holder?.name} ( {checklist?.holder?.role} )
                    </td>
                    <td>{checklist?.description}</td>
                    <td>
                      <Button
                        className="btn btn-outline-light btn-sm btn-primary "
                        onClick={() => {
                          editChecklist(checklist?._id, checklist, false);
                        }}
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
                        Restore
                      </Button>
                    </td>
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

                      <ChecklistDelete
                        refresh={refreshTable}
                        upChecklist={removeChecklist}
                        show={showDelete}
                        handleClose={handleCloseDelete}
                        checklist={checklist}
                        deleting={false}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </main>
  );
};

export default TaskDetails;
