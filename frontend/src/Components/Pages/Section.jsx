import { useParams } from "react-router-dom";
import {
  getChecklistByHolder,
  updateChecklist,
} from "../../services/checklist-service";
import Checklist from "./Checklist";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

const Section = () => {
  const { id_user } = useParams();
  const [loading, setLoading] = useState(true);

  const [checklists, setChecklists] = useState({});

  const fetchChecklistByUser = async (id) => {
    const data = await getChecklistByHolder(id);
    setChecklists(data.data.message);
    setLoading(false);
  };

  useEffect(() => {
    fetchChecklistByUser(id_user);
  }, []);

  const refreshTable = async () => {
    fetchChecklistByUser(id_user);
  };

  const editChecklist = async (id, checklist) => {
    try {
      checklist.archived = true;
      const result = await updateChecklist(id, checklist);
      if (result.status === 200) {
        alert("Checklist has been archived successfully!");
        fetchChecklistByUser(id_user);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <div className=" text-center">
        <Spinner animation="border" role="output" variant="danger">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <main className="content">
      <div className="container p-0">
        <div className=" row ">
          <h1 className="h3 mb-3 col-md-9 ">
            My Todo List ({checklists.length})
          </h1>
        </div>
        {checklists.length > 0 ? (
          <div className=" d-flex flex-wrap p-3">
            {checklists.map((checklist, index) => {
              return (
                <Checklist
                  refresh={refreshTable}
                  key={index}
                  checkList={checklist}
                  index={index + 1}
                  upChecklist={editChecklist}
                />
              );
            })}
          </div>
        ) : (
          <p className="h4 mb-3 col-md-9 ">
            You are not assigned to any todo list by your coordinator, check out
            soon for more information
          </p>
        )}
      </div>
    </main>
  );
};

export default Section;
