import { useState } from "react";
import { Button, Col, Row, Form, Modal } from "react-bootstrap";
import { addTask } from "../../services/task-service";

const TaskForm = ({ refresh, show, handleClose, id_act }) => {
  const [validated, setValidated] = useState(false);

  const [taskItem, setTaskItem] = useState({
    title: "",
    initDate: "",
    dueDate: "",
    status: "",
    priority: "",
    tags: [],
    banner: "",
    collaborators: [],
    description: "",
  });

  const onValueChange = (e) => {
    setTaskItem({ ...taskItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    handleAddTask();
  };

  const handleAddTask = async () => {
    const result = await addTask(taskItem, id_act);
    if (result.status == 201) {
      alert("task added successfully");
      refresh(taskItem);
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
            <h1>Add task</h1>
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
                placeholder="task title"
                name="title"
                value={taskItem.title}
                onChange={(e) => {
                  validateForm(e);
                  onValueChange(e);
                }}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Status</Form.Label>
              <Form.Select
                aria-label="Default select example"
                className=" form-control "
                name="status"
                value={taskItem.status}
                onChange={(e) => {
                  validateForm(e);
                  onValueChange(e);
                }}
              >
                <option>Open this select menu</option>
                <option value="planned">Planned</option>
                <option value="active">Active</option>
                <option value="complete">Completed</option>
              </Form.Select>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>Priority</Form.Label>
              <Form.Select
                aria-label="Default select example"
                className=" form-control "
                name="priority"
                value={taskItem.priority}
                onChange={(e) => {
                  validateForm(e);
                  onValueChange(e);
                }}
              >
                <option>Open this select menu</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Form.Select>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom010">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="tags"
                name="tags"
                value={taskItem.tags}
                onChange={(e) => {
                  validateForm(e);
                  onValueChange(e);
                }}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom05">
              <Form.Label>Start date</Form.Label>
              <Form.Control
                type="date"
                placeholder="init date"
                required
                name="initDate"
                value={taskItem.initDate}
                onChange={(e) => {
                  validateForm(e);
                  onValueChange(e);
                }}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid start date.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom06">
              <Form.Label>End date</Form.Label>
              <Form.Control
                type="date"
                placeholder="end date"
                required
                name="dueDate"
                value={taskItem.dueDate}
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
          <Row>
            <Form.Group as={Col} md="6" controlId="validationCustom04">
              <Form.Label>Description</Form.Label>
              <Form.Control
                placeholder="Description"
                required
                as="textarea"
                rows={3}
                name="description"
                value={taskItem.description}
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
        {validated ? (
          <Button style={{ backgroundColor: "#e44d3a" }} onClick={handleSubmit}>
            Add
          </Button>
        ) : (
          <Button disabled style={{ backgroundColor: "#e44d3a" }}>
            Add
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default TaskForm;
