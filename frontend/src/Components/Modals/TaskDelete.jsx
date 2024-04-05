import React from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

const TaskDelete = ({ rmTask, show, handleClose, task }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Row>
          <Modal.Title as={Col}>
            <h1>Delete task</h1>
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
        <br />
        {task?.checkList?.length > 0 ? (
          <small className=" text-danger ">
            Cannot delete This task, it has checklist assigned in it{" "}
          </small>
        ) : (
          <b className=" text-danger ">
            Are you sure you want to delete this task ({task.title})
          </b>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          className={task?.checkList?.length > 0 ? " disabled " : ""}
          style={{ backgroundColor: "#e44d3a" }}
          onClick={() => {
            rmTask(task._id);
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

TaskDelete.propTypes = {
  rmTask: PropTypes.func,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  task: PropTypes.object.isRequired,
};

export default TaskDelete;
