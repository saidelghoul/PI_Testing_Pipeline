import { useParams } from "react-router-dom";
import {
  getChecklistByHolder,
  getChecklistScoreForUser,
  updateChecklist,
} from "../../services/checklist-service";
import Checklist from "./Checklist";
import { useEffect, useState } from "react";
import { Form, InputGroup, ProgressBar, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";

const Section = () => {
  const { id_user } = useParams();
  const [loading, setLoading] = useState(true);

  const [checklists, setChecklists] = useState([]);

  const [progress, setProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const [score, setScore] = useState({});

  const getProgress = (current) => {
    if (current?.length > 0) {
      setProgress(
        Math.floor(
          (current?.filter(
            (checklist) =>
              checklist?.done === true && checklist?.holder?._id === id_user
          )?.length /
            current?.length) *
            100
        )
      );
    } else setProgress(0);
  };

  const fetchChecklistByUser = async () => {
    const data = await getChecklistByHolder(id_user);
    setChecklists(data.data.message);
    getProgress(data.data.message);
  };
  const fetchScoreByUser = async () => {
    const data = await getChecklistScoreForUser(id_user);
    setScore(data.data.message);
    setLoading(false);
  };

  useEffect(() => {
    fetchChecklistByUser();
    fetchScoreByUser();
  }, []);

  const refreshTable = async () => {
    fetchChecklistByUser();
    fetchScoreByUser();
  };

  const editChecklist = async (id, checklist) => {
    try {
      checklist.archived = true;
      const result = await updateChecklist(id, checklist);
      if (result.status === 200) {
        toast.success("Checklist has been archived successfully!");
        fetchChecklistByUser();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

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
      <div className=" text-center">
        <Spinner animation="border" role="output" variant="danger"></Spinner>
      </div>
    );
  }

  return (
    <main className="content">
      <div className="container p-0">
        <div className=" row ">
          <h1 className="h3 mb-3 col-md-6 ">
            My Todo List ({checklists.length}) 📊
          </h1>
          <h1 className="h3 mb-3 col-md-3 ">
            {score.numberOfTasks} completed tasks ✅
          </h1>
          <h1 className="h3 mb-3 col-md-3 ">My Score: {score.somme} ⚡</h1>
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
        <InputGroup className="col-md-6 d-flex flex-row">
          <InputGroup.Text id="basic-addon1">🔎</InputGroup.Text>
          <Form.Control
            placeholder="Search..."
            aria-label="Search..."
            aria-describedby="basic-addon1"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        {checklists.length > 0 ? (
          <div className=" d-flex flex-wrap p-3">
            {displayed.map((checklist, index) => {
              return (
                <Checklist
                  refresh={refreshTable}
                  key={index}
                  checkList={checklist}
                  task={undefined}
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
