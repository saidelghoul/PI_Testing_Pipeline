import PropTypes from "prop-types";
import { Button, Modal, Row, Col } from "react-bootstrap";

const DeleteForm = ({ rmActivity, show, handleClose, activity }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Row>
          <Modal.Title as={Col}>
            <h1 className=" text-white ">Delete activity</h1>
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
        <div className=" text-danger text-center ">
          Are you sure you want to delete this activity ({activity.name})
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className={activity?.tasks?.length > 0 ? " disabled " : ""}
          disabled={activity?.tasks?.length > 0}
          style={{ backgroundColor: "#e44d3a" }}
          onClick={() => {
            rmActivity(activity._id);
            handleClose();
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

DeleteForm.propTypes = {
  rmActivity: PropTypes.func,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  activity: PropTypes.object.isRequired,
};

export default DeleteForm;
