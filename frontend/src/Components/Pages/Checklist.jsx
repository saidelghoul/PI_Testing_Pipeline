import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import {
  getChecklists,
  updateChecklist,
} from "../../services/checklist-service";
import ChecklistDelete from "../Modals/ChecklistDelete";
import PropTypes from "prop-types";

const Checklist = ({ checkList, index, rmChecklist }) => {
  const [toggle, setToggle] = useState(checkList.done);
  const [holder, setHolder] = useState({});

  const updateDone = async (e) => {
    checkList.done = e.target.checked;
    const response = await updateChecklist(checkList._id, checkList);
    if (response.status === 200) {
      setToggle(!toggle);
    }
  };

  useEffect(() => {
    const fetchChecklist = async (id) => {
      const checklist = await getChecklists(id);
      setHolder(checklist.holder);
    };
    fetchChecklist(checkList._id);
  }, []);

  /* pop up*/
  const [showDelete, setShowDelete] = useState(false);

  const handleShowDelete = () => setShowDelete(true);

  const handleCloseDelete = () => setShowDelete(false);

  /* pop up end*/

  return (
    <>
      <Card
        bg={toggle ? "success" : "secondary"}
        style={{ width: "18rem" }}
        className=" shadow shadow-sm"
      >
        <Card.Header>
          <Row bg={toggle ? "success" : "secondary"}>
            <Col md="9">Todo N°{index}</Col>
            <Col md="3">
              <label className="custom-control custom-checkbox">
                <input
                  label="Done?"
                  checked={checkList.done}
                  type="checkbox"
                  className="custom-control-input"
                  onChange={(e) => updateDone(e)}
                />
                <span className="custom-control-label"></span>
              </label>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Card.Title className=" text-white ">{checkList.title}</Card.Title>
          <Card.Text className=" text-white ">
            Assigned to: {holder.name} ( {holder.role} ) Description:{" "}
            {checkList.description}
          </Card.Text>
          <Button
            style={{ backgroundColor: "#e44d3a" }}
            onClick={handleShowDelete}
          >
            Delete
          </Button>
        </Card.Body>
      </Card>

      <ChecklistDelete
        rmChecklist={rmChecklist}
        show={showDelete}
        handleClose={handleCloseDelete}
        checklist={checkList}
      />
    </>
  );
};

Checklist.propTypes = {
  checkList: PropTypes.object,
  index: PropTypes.number,
  rmChecklist: PropTypes.func,
};

export default Checklist;
