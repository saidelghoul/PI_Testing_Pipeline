import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import {
  getChecklists,
  updateChecklist,
} from "../../services/checklist-service";
import ChecklistDelete from "../Modals/ChecklistDelete";
import PropTypes from "prop-types";

const Checklist = ({ refresh, checkList, index, rmChecklist }) => {
  const [toggle, setToggle] = useState(checkList.done);
  const [holder, setHolder] = useState({});
  const [loading, setLoading] = useState(true);

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
      setHolder(checklist.data.message.holder);
      setLoading(false);
    };
    fetchChecklist(checkList._id);
  }, []);

  /* pop up*/
  const [showDelete, setShowDelete] = useState(false);

  const handleShowDelete = () => setShowDelete(true);

  const handleCloseDelete = () => setShowDelete(false);

  /* pop up end*/

  if (loading) {
    return (
      <Spinner animation="border" role="output" variant="danger">
        <span className="visually-hidden container p-0">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      <Card
        bg={toggle ? "success" : "secondary"}
        style={{ width: "18rem" }}
        className=" shadow shadow-sm m-3 "
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
            -Assigned to:{holder?.name} ( {holder?.role} )
            <br />
            {checkList?.description !== "" && (
              <>-Description: {checkList?.description}</>
            )}
          </Card.Text>
          <Button
            className="btn btn-outline-light"
            style={{ backgroundColor: "#e44d3a" }}
            onClick={handleShowDelete}
          >
            Delete
          </Button>
        </Card.Body>
      </Card>

      <ChecklistDelete
        refresh={refresh}
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
