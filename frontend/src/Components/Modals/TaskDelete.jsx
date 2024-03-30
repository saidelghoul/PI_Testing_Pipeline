import { Button, Modal, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

const TaskDelete = ({ refresh, removeTask, show, handleClose, task }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Row>
          <Modal.Title as={Col}>
            <h1 className=" text-white ">Delete task</h1>
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
          Are you sure you want to delete this task ({task.title})
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className={task?.checkList?.length > 0 ? " disabled " : ""}
          disabled={task?.checkList?.length > 0}
          style={{ backgroundColor: "#e44d3a" }}
          onClick={() => {
            removeTask(task._id);
            refresh();
            handleClose();
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

TaskDelete.propTypes = {
  refresh: PropTypes.func,
  removeTask: PropTypes.func,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  task: PropTypes.object.isRequired,
};

export default TaskDelete;
