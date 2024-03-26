import { useState } from "react";
import { Button, Col, Row, Form, Modal } from "react-bootstrap";
import { addActivity } from "../../services/activity-service";

const ActivityForm = ({ refresh, show, handleClose }) => {
  const [validated, setValidated] = useState(false);

  const [activityItem, setActivityItem] = useState({
    name: "",
    category: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const onValueChange = (e) => {
    setActivityItem({ ...activityItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    handleAddActivity();
  };

  const handleAddActivity = async () => {
    const result = await addActivity(activityItem);
    if (result.status == 201) {
      alert("Activity added successfully");
      refresh(activityItem);
    }
  };

  const validateForm = (e) => {
    return e.target.value ? setValidated(true) : setValidated(false);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header closeButton>
        <Row>
          <Modal.Title as={Col}>
            <h1>Add activity</h1>
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
        <Form
          className=" container-fluid p-4  "
          noValidate
          validated={validated}
        >
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="activity name"
                name="name"
                value={activityItem.name}
                onChange={(e) => {
                  validateForm(e);
                  onValueChange(e);
                }}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>category</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="category"
                name="category"
                value={activityItem.category}
                onChange={(e) => {
                  validateForm(e);
                  onValueChange(e);
                }}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>Description</Form.Label>
              <Form.Control
                placeholder="Description"
                required
                as="textarea"
                rows={3}
                name="description"
                value={activityItem.description}
                onChange={(e) => {
                  validateForm(e);
                  onValueChange(e);
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom04">
              <Form.Label>Start date</Form.Label>
              <Form.Control
                type="date"
                placeholder="start date"
                required
                name="startDate"
                value={activityItem.startDate}
                onChange={(e) => {
                  validateForm(e);
                  onValueChange(e);
                }}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid start date.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom05">
              <Form.Label>End date</Form.Label>
              <Form.Control
                type="date"
                placeholder="end date"
                required
                name="endDate"
                value={activityItem.endDate}
                onChange={(e) => {
                  validateForm(e);
                  onValueChange(e);
                }}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid end date.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className={validated ? "disabled" : ""}
          style={{ backgroundColor: "#e44d3a" }}
          onClick={handleSubmit}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ActivityForm;
