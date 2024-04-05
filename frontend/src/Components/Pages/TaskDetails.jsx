import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChecklistByTask, getTasks } from "../../services/task-service";
import Checklist from "./Checklist";
import ChecklistForm from "../Modals/ChecklistForm";
import { Button } from "react-bootstrap";
import { deleteChecklist } from "../../services/checklist-service";

const TaskDetails = () => {
  const { id_task } = useParams();

  const [task, setTask] = useState({});
  const [checklists, setChecklists] = useState({});

  const refreshTable = async (checklistItem) => {
    setShow(false);
    setChecklists([...checklists, checklistItem]);
  };

  useEffect(() => {
    const fetchTask = async (id) => {
      const data = await getTasks(id);
      setTask(data.data.message);
    };

    const fetchChecklist = async (id) => {
      const data = await getChecklistByTask(id);
      console.log(data.data.message.checkList);
      setChecklists(data.data.message.checkList);
      console.log(checklists);
    };

    fetchTask(id_task);
    fetchChecklist(id_task);
  }, []);

  /* pop up*/
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* pop up end*/

  const removeChecklist = async (id) => {
    const result = await deleteChecklist(id);
    if (result.status == "204") {
      alert("deleted successfully");
      setChecklists(checklists.filter((checklist) => checklist._id !== id));
    }
  };

  return (
    <div className="container p-0 ">
      <h1 className="h3 mb-3">Task Details</h1>
      <div className=" row ">
        <div className=" col">
          <h1 className=" text-bg-primary "> Title: {task.title}</h1>
          <br />
          <h1 className=" text-bg-primary "> Tags: {task.tags}</h1>
          <h1 className=" text-bg-success "> Status: {task.status}</h1>
          <h1 className=" text-bg-success "> Priority: {task.priority}</h1>
        </div>
        <div className=" col-auto ">
          <p className=" text-body-emphasis "> Collaborators </p>
          <small className=" text-body-emphasis ">
            Description: {task.description}
          </small>
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
            />
          </h1>
        </div>
        {checklists.length > 0 && (
          <div className=" d-flex flex-wrap p-3">
            {checklists.map((checklist, index) => {
              return (
                <Checklist
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
