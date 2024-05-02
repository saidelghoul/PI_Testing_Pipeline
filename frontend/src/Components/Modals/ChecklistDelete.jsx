import { Button, Modal, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

const ChecklistDelete = ({
  refresh,
  upChecklist,
  show,
  handleClose,
  checklist,
  deleting,
}) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Row>
          <Modal.Title as={Col}>
            <h1 className=" text-white h3 ">Delete checklist</h1>
          </Modal.Title>
          <Button
            as={Col}
            md="3"
            variant="secondary"
            onClick={handleClose}
            style={{
              backgroundColor: "#fff",
              color: "#e44d3a",
              cursor: "pointer",
            }}
          >
            Close
          </Button>
        </Row>
      </Modal.Header>

      <Modal.Body>
        <div className=" text-danger text-center  ">
          Are you sure you want to delete/archive this checklist
        </div>
        <div className=" text-danger text-center  ">({checklist.title})</div>
      </Modal.Body>
      <Modal.Footer>
        {deleting === true ? (
          <Button
            style={{ backgroundColor: "#e44d3a" }}
            onClick={() => {
              upChecklist(checklist._id, checklist, true);
              refresh();
              handleClose();
            }}
          >
            Archive
          </Button>
        ) : (
          <Button
            style={{ backgroundColor: "#e44d3a" }}
            onClick={() => {
              upChecklist(checklist._id);
              refresh();
              handleClose();
            }}
          >
            Delete
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

ChecklistDelete.propTypes = {
  refresh: PropTypes.func,
  upChecklist: PropTypes.func,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  checklist: PropTypes.object,
  deleting: PropTypes.bool,
};

export default ChecklistDelete;
