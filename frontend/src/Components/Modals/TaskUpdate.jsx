import { useState, useEffect } from "react";
import { Button, Col, Row, Form, Modal, Spinner } from "react-bootstrap";
import {
  updateTask,
  getUsersForTask,
  getTasks,
} from "../../services/task-service";
import Select from "react-select";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

const TaskUpdate = ({
  refresh,
  show,
  handleClose,
  task,
  options,
  activity,
}) => {
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

  //form errors validation
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const validateValues = (inputValues) => {
    let errors = {};
    if (inputValues.title.length < 2 || inputValues.title.length > 50) {
      errors.title = "Title length must be between 2 and 50";
    }
    if (!inputValues.initDate) {
      errors.initDate = "Initial Date is required";
    }
    if (
      !inputValues.dueDate ||
      new Date(inputValues.dueDate) < new Date(inputValues.initDate)
    ) {
      errors.dueDate = "Due Date is required & must be greater than initDate";
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
    if (inputValues.description.length > 200) {
      errors.description =
        "Description exceeds maximum length of 200 characters";
    }
    return errors;
  };

  // end of form errors validation

  const [users, setUsers] = useState([]);
  const [assignedTags, setAssignedTags] = useState([]);
  const [collaborators, setCollaborators] = useState([]);

  const fetchAssignedCollaboratorsAndTags = async () => {
    const dbtask = await getTasks(task._id);

    let collaboptions = [];

    dbtask.data.message.collaborators?.map((user) =>
      collaboptions.push({
        value: user._id,
        label: user.name + " (" + user.role + ")",
      })
    );

    setCollaborators(collaboptions);

    let tagoptions = [];

    dbtask.data.message.tags?.map((tag) =>
      tagoptions.push({
        value: tag,
        label: tag,
      })
    );

    setAssignedTags(tagoptions);

    setLoading(false);
  };

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

    // fetch tags from task into proper list for the react select

    fetchUsers();
    fetchAssignedCollaboratorsAndTags();

    setErrors(validateValues(taskItem));
  }, [taskItem]);

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

    if (Object.keys(errors).length === 0) handleUpdateTask();
  };

  const handleUpdateTask = async () => {
    try {
      const result = await updateTask(task._id, taskItem);
      if (result.status == 200) {
        toast.success("Task updated successfully");
        refresh();
        handleClose();
        fetchAssignedCollaboratorsAndTags();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //user field selection change validation

  const onUserChange = (name, value) => {
    let collabs = [];
    value.forEach((element) => {
      collabs.push(element.value);
    });

    setTaskItem({ ...taskItem, [name]: collabs });
  };
  //end of user field selection change validation

  //tag field validation
  const onTagChange = (name, value) => {
    let tags = [];
    value.forEach((element) => {
      tags.push(element.value);
    });

    setTaskItem({ ...taskItem, [name]: tags });
  };
  // end of tagfiled for testing purposes

  if (loading) {
    return (
      <main className="content">
        <div className="container p-0">
          <Spinner animation="border" role="output" variant="danger"></Spinner>
        </div>
      </main>
    );
  }

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
            <h1 className=" text-white h3 ">Update task</h1>
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
              <Form.Select
                aria-label="Default select example"
                className=" form-control mt-2 "
                name="status"
                value={taskItem.status}
                onChange={onValueChange}
              >
                <option value="planned">Planned</option>
                <option value="active">Active</option>
                <option value="complete">Completed</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>Priority</Form.Label>
              <Form.Select
                aria-label="Default select example"
                className=" form-control mt-2 "
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
                defaultValue={assignedTags}
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
                defaultValue={collaborators}
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
  options: PropTypes.arrayOf(PropTypes.object),
  activity: PropTypes.object,
};

export default TaskUpdate;
