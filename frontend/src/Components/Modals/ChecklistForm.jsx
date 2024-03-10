import { useState } from "react";
import { Button, Col, Row, Form, Modal } from "react-bootstrap";
import { addChecklist } from "../../services/checklist-service";

const ChecklistForm = ({ refresh, show, handleClose, id_task }) => {
  const [validated, setValidated] = useState(false);

  const [checklistItem, setChecklistItem] = useState({
    title: "",
    holder: "65df6f7a904814fc0404a57a",
    description: "",
  });

  const onValueChange = (e) => {
    setChecklistItem({ ...checklistItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    handleChecklist();
  };

  const handleChecklist = async () => {
    const result = await addChecklist(checklistItem, id_task);
    if (result.status == 201) {
      alert("checklist added successfully");
      refresh(checklistItem);
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
            <h1>Add checklist</h1>
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
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="checklist title"
                name="title"
                value={checklistItem.title}
                onChange={(e) => {
                  validateForm(e);
                  onValueChange(e);
                }}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>holder</Form.Label>
              <Form.Select
                aria-label="Default select example"
                className=" form-control "
                name="holder"
                value={checklistItem.holder}
                onChange={(e) => {
                  validateForm(e);
                  onValueChange(e);
                }}
              >
                <option>Open this select menu</option>
                <option value="65df6f7a904814fc0404a57a">Rami</option>
              </Form.Select>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} md="6" controlId="validationCustom04">
              <Form.Label>Description</Form.Label>
              <Form.Control
                placeholder="Description"
                required
                as="textarea"
                rows={3}
                name="description"
                value={checklistItem.description}
                onChange={(e) => {
                  validateForm(e);
                  onValueChange(e);
                }}
              />
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

export default ChecklistForm;
