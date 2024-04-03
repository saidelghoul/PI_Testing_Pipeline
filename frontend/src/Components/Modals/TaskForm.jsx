import { useEffect, useState } from "react";
import { Button, Col, Row, Form, Modal } from "react-bootstrap";
import { addTask, getUsersForTask } from "../../services/task-service";
import Select from "react-select";
import PropTypes from "prop-types";

const TaskForm = ({ refresh, show, handleClose, activity, options }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // fetch users(potential collabs) into proper list for the react select

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
    fetchUsers();
  }, []);

  const [taskItem, setTaskItem] = useState({
    title: "",
    initDate: "",
    dueDate: "",
    priority: "high",
    tags: [],
    collaborators: [],
    description: "",
  });

  //form errors validation
  const [errors, setErrors] = useState({});

  const validateValues = (inputValues) => {
    let errors = {};
    if (inputValues.title.length < 5 || inputValues.title.length > 50) {
      errors.title = "Title length must be between 5 and 50";
    }
    if (!inputValues.initDate) {
      errors.initDate = "initDate is required";
    }
    if (
      !inputValues.dueDate ||
      new Date(inputValues.dueDate) < new Date(inputValues.initDate)
    ) {
      errors.dueDate = "dueDate is required & must be greater than initDate";
    }
    if (new Date(inputValues.initDate) < new Date(activity.startDate)) {
      errors.initDate =
        "Initial date must be more than activity start date: " +
        activity.startDate.substring(0, 10);
    }
    if (new Date(inputValues.dueDate) > new Date(activity.endDate)) {
      errors.dueDate =
        "Due date must be less than activity end date: " +
        activity.endDate.substring(0, 10);
    }
    if (
      Math.round(
        (new Date(inputValues.dueDate).getTime() -
          new Date(inputValues.initDate).getTime()) /
          (1000 * 3600 * 24)
      ) < 3
    ) {
      errors.initDate =
        "Difference in Initial date & Due date must be more than 3 days";
    }
    if (
      Math.round(
        (new Date(inputValues.dueDate).getTime() -
          new Date(inputValues.initDate).getTime()) /
          (1000 * 3600 * 24)
      ) > 180
    ) {
      errors.dueDate =
        "Difference in Initial date & Due date must be less than 6 months";
    }
    if (inputValues.tags.length < 1 || inputValues.tags.length > 5) {
      errors.tags = "Please specify number of tags between 1 and 5";
    }
    if (inputValues.collaborators.length < 1) {
      errors.collaborators = "Please specify at least one collaborator";
    }
    if (inputValues.description.length > 1500) {
      errors.description =
        "Description exceeds maximum length of 1500 characters";
    }
    return errors;
  };

  // end of form errors validation

  const onValueChange = (e) => {
    setTaskItem({ ...taskItem, [e.target.name]: e.target.value });
    setErrors(validateValues(taskItem));
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (Object.keys(errors).length === 0) handleAddTask();
  };

  const handleAddTask = async () => {
    try {
      const result = await addTask(taskItem, activity._id);
      if (result.status === 201) {
        alert("Task added successfully");
        refresh();
        handleClose();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  //user field selection change validation

  const onUserChange = (name, value) => {
    let collabs = [];
    value.forEach((element) => {
      collabs.push(element.value);
    });

    setTaskItem({ ...taskItem, [name]: collabs });
    setErrors(validateValues(taskItem));
    console.log(name, value, collabs);

    value.forEach((element) => {
      console.log(element.label + ": " + element.value);
    });
  };

  //end of user field selection change validation

  //tag field validation
  const onTagChange = (name, value) => {
    let tags = [];
    value.forEach((element) => {
      tags.push(element.value);
    });

    setTaskItem({ ...taskItem, [name]: tags });
    setErrors(validateValues(taskItem));
    console.log(name, value, tags);

    value.forEach((element) => {
      console.log(element.label + ": " + element.value);
    });
  };

  // end of tagfiled for testing purposes
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
            <h1 className=" text-light ">Add task</h1>
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
          validated={Object.keys(errors).length === 0}
        >
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Title</Form.Label>
              <Form.Control
                className=" mt-2 "
                required
                type="text"
                placeholder="task title"
                name="title"
                value={taskItem.title}
                onChange={onValueChange}
              />
              {errors.title && (
                <small className=" text-danger ">{errors.title}</small>
              )}
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Status</Form.Label>
              <Form.Control
                aria-label="Default select example"
                className=" form-control mt-2 "
                value="Planned"
                disabled
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>Priority</Form.Label>
              <Form.Select
                aria-label="Default select example"
                className=" form-control mt-2  "
                name="priority"
                value={taskItem.priority}
                onChange={onValueChange}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Form.Select>
              {errors.priority && (
                <small className=" text-danger ">{errors.priority}</small>
              )}
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom010">
              <Form.Label>Tags</Form.Label>

              <Select
                onChange={(value) => onTagChange("tags", value)}
                isMulti
                name="tags"
                options={options}
                className="basic-multi-select mt-2 "
                classNamePrefix="select"
              />
              {errors.tags && (
                <small className=" text-danger ">{errors.tags}</small>
              )}
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom05">
              <Form.Label>Start date</Form.Label>
              <Form.Control
                className=" mt-2 "
                type="date"
                placeholder="init date"
                required
                name="initDate"
                value={taskItem.initDate}
                onChange={onValueChange}
              />
              {errors.initDate && (
                <small className=" text-danger ">{errors.initDate}</small>
              )}
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom06">
              <Form.Label>End date</Form.Label>
              <Form.Control
                className=" mt-2 "
                type="date"
                placeholder="end date"
                required
                name="dueDate"
                value={taskItem.dueDate}
                onChange={onValueChange}
              />
              {errors.dueDate && (
                <small className=" text-danger ">{errors.dueDate}</small>
              )}
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="6" controlId="validationCustom04">
              <Form.Label>Description</Form.Label>
              <Form.Control
                className=" mt-2 "
                placeholder="Description"
                as="textarea"
                rows={3}
                name="description"
                value={taskItem.description}
                onChange={onValueChange}
              />
              {errors.description && (
                <small className=" text-danger ">{errors.description}</small>
              )}
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom11">
              <Form.Label>Collaborators</Form.Label>
              <Select
                onChange={(value) => onUserChange("collaborators", value)}
                isMulti
                name="collaborators"
                options={users}
                className="basic-multi-select mt-2 "
                classNamePrefix="select"
              />
              {errors.collaborators && (
                <small className=" text-danger ">{errors.collaborators}</small>
              )}
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={Object.keys(errors).length !== 0}
          style={{ backgroundColor: "#e44d3a" }}
          onClick={handleSubmit}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

TaskForm.propTypes = {
  refresh: PropTypes.func,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  activity: PropTypes.object,
  options: PropTypes.arrayOf(PropTypes.object),
};

export default TaskForm;
