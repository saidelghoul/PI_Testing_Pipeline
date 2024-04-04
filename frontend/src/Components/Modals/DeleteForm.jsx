import PropTypes from "prop-types";
import { Button, Modal, Row, Col } from "react-bootstrap";

const DeleteForm = ({ upActivity, show, handleClose, activity, deleting }) => {
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
          Are you sure you want to delete/archive this activity
        </div>
        <div className=" text-danger text-center ">( {activity?.name} )</div>
      </Modal.Body>
      <Modal.Footer>
        {deleting === true ? (
          <Button
            style={{ backgroundColor: "#e44d3a" }}
            onClick={() => {
              upActivity(activity._id, activity, true);
              handleClose();
            }}
          >
            Archive
          </Button>
        ) : (
          <Button
            style={{ backgroundColor: "#e44d3a" }}
            onClick={() => {
              upActivity(activity._id);
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

DeleteForm.propTypes = {
  upActivity: PropTypes.func,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  activity: PropTypes.object.isRequired,
  deleting: PropTypes.bool,
};

export default DeleteForm;
