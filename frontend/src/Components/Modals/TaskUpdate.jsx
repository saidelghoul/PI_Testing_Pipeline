import { useState, useEffect } from "react";
import { Button, Col, Row, Form, Modal } from "react-bootstrap";
import { updateTask, getUsersForTask } from "../../services/task-service";
import Select from "react-select";
import PropTypes from "prop-types";

const TaskUpdate = ({ refresh, show, handleClose, task, options }) => {
  const [validated, setValidated] = useState(false);

  const [taskItem, setTaskItem] = useState({
    title: task.title,
    initDate: task.initDate.substr(0, 10),
    dueDate: task.dueDate.substr(0, 10),
    status: task.status,
    priority: task.priority,
    tags: task.tags,
    banner: task.banner,
    collaborators: task.collaborators,
    description: task.description,
  });

  const [users, setUsers] = useState([]);

  const [collaborators, setCollaborators] = useState([]);

  const [assignedTags, setAssignedTags] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const dbusers = await getUsersForTask();
      let options = [];

      dbusers.data.message.map((user) =>
        options.push({
          value: user._id,
          label: user.name + " (" + user.role + ")",
        })
      );

      setUsers(options);
    };

    const fetchAssignedTags = () => {
      let options = [];

      task?.tags?.map((tag) =>
        options.push({
          value: tag,
          label: tag,
        })
      );

      setAssignedTags(options);
    };
    fetchUsers();
    fetchAssignedTags();
  }, []);

  const onValueChange = (e) => {
    setTaskItem({ ...taskItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    handleUpdateTask();
  };

  const handleUpdateTask = async () => {
    try {
      const result = await updateTask(task._id, taskItem);
      if (result.status == 200) {
        alert("task updated successfully");
        refresh();
        handleClose();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const validateForm = (e) => {
    return e.target.value ? setValidated(true) : setValidated(false);
  };

  const onUserChange = (name, value) => {
    let collabs = [];
    value.forEach((element) => {
      collabs.push(element.value);
    });

    setTaskItem({ ...taskItem, [name]: collabs });
    console.log(name, value, collabs);

    value.forEach((element) => {
      console.log(element.label + ": " + element.value);
    });
  };

  // end of tagfiled for testing purposes

  const onTagChange = (name, value) => {
    let tags = [];
    value.forEach((element) => {
      tags.push(element.value);
    });

    setTaskItem({ ...taskItem, [name]: tags });
    console.log(name, value, tags);

    value.forEach((element) => {
      console.log(element.label + ": " + element.value);
    });
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
            <h1>Update task</h1>
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
              <Select
                onChange={(value) => onTagChange("tags", value)}
                defaultValue={assignedTags}
                isMulti
                name="tags"
                options={options}
                className="basic-multi-select"
                classNamePrefix="select"
              />
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
            <Form.Group as={Col} md="6" controlId="validationCustom11">
              <Form.Label>Collaborators</Form.Label>
              <Select
                onChange={(value) => onUserChange("collaborators", value)}
                isMulti
                name="collaborators"
                options={users}
                className="basic-multi-select"
                classNamePrefix="select"
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
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

TaskUpdate.propTypes = {
  refresh: PropTypes.func,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  task: PropTypes.object,
};

export default TaskUpdate;
