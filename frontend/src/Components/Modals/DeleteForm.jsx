import React from "react";

import { Button, Modal, Row, Col } from "react-bootstrap";

const DeleteForm = ({ rmActivity, show, handleClose, activity }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Row>
          <Modal.Title as={Col}>
            <h1>Delete activity</h1>
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
        Are you sure you want to delete this activity ({activity.name})
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={{ backgroundColor: "#e44d3a" }}
          onClick={() => {
            rmActivity(activity._id);
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteForm;
