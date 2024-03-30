import { Button, Modal, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

const ChecklistDelete = ({
  refresh,
  rmChecklist,
  show,
  handleClose,
  checklist,
}) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Row>
          <Modal.Title as={Col}>
            <h1 className=" text-white ">Delete checklist</h1>
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
          Are you sure you want to delete this checklist ({checklist.title})
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={{ backgroundColor: "#e44d3a" }}
          onClick={() => {
            rmChecklist(checklist._id);
            handleClose();
            refresh();
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ChecklistDelete.propTypes = {
  refresh: PropTypes.func,
  rmChecklist: PropTypes.func,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  checklist: PropTypes.object,
};

export default ChecklistDelete;
