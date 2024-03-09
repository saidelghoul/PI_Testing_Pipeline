import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChecklistByTask, getTasks } from "../../services/task-service";
import Checklist from "./Checklist";

const TaskDetails = () => {
  const { id_task } = useParams();

  const [task, setTask] = useState({});
  const [checklists, setChecklists] = useState({});

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

  return (
    <div className="container p-0 ">
      <h1 className="h3 mb-3">Task Details</h1>
      <div className=" row ">
        <div className=" col">
          <h1 className=" text-bg-primary "> Name: {task.title}</h1>

          <h1 className=" text-bg-primary "> Tags: {task.tags}</h1>
        </div>
        <div className=" col-auto ">
          <p className=" text-body-emphasis "> Collaborators </p>
        </div>
      </div>
      <hr />
      <div>
        {checklists.length > 0 && (
          <div className=" d-flex flex-wrap p-3">
            {checklists.map((checklist, index) => {
              return <Checklist key={index} checkList={checklist} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;
