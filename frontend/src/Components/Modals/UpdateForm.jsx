import { useState } from "react";
import { Button, Col, Row, Form, Modal } from "react-bootstrap";
import { updateActivity } from "../../services/activity-service";
import PropTypes from "prop-types";

const UpdateForm = ({ refresh, show, handleClose, activity }) => {
  const [activityItem, setActivityItem] = useState({
    name: activity.name,
    category: activity.category,
    startDate: activity.startDate.substr(0, 10),
    endDate: activity.endDate.substr(0, 10),
    description: activity.description,
  });

  //form errors validation
  const [errors, setErrors] = useState({});
  const validateValues = (inputValues) => {
    let errors = {};
    if (inputValues.name.length < 5 || inputValues.name.length > 50) {
      errors.name = "Name length must be between 5 and 50";
    }
    if (!inputValues.startDate) {
      errors.startDate = "startDate is required";
    }
    if (
      !inputValues.endDate ||
      new Date(inputValues.endDate) < new Date(inputValues.startDate)
    ) {
      errors.endDate = "endDate is required & must be greater than startDate";
    }
    if (inputValues.description.length > 2500) {
      errors.description =
        "Description exceeds maximum length of 2500 characters";
    }
    return errors;
  };
  // end of form errors validation

  const onValueChange = (e) => {
    setActivityItem({ ...activityItem, [e.target.name]: e.target.value });
    setErrors(validateValues(activityItem));
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (Object.keys(errors).length === 0) handleUpdateActivity();
  };

  const handleUpdateActivity = async () => {
    try {
      const result = await updateActivity(activity._id, activityItem);
      if (result.status == 200) {
        alert("Activity updated successfully");
        refresh();
        handleClose();
      }
    } catch (error) {
      alert(error.message);
    }
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
            <h1 className=" text-white ">Update activity</h1>
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
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="activity name"
                name="name"
                value={activityItem.name}
                onChange={onValueChange}
              />
              {errors.name && (
                <small className=" text-danger ">{errors.name}</small>
              )}
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Category</Form.Label>
              <Form.Select
                required
                aria-label="Default select example"
                className=" form-control "
                name="category"
                value={activityItem.category}
                onChange={onValueChange}
              >
                <option value="project">Project</option>
                <option value="course">Course</option>
                <option value="workshop">Workshop</option>
                <option value="exam">Exam</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>Description</Form.Label>
              <Form.Control
                placeholder="Description"
                as="textarea"
                rows={3}
                name="description"
                value={activityItem.description}
                onChange={onValueChange}
              />
              {errors.description && (
                <small className=" text-danger ">{errors.description}</small>
              )}
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom04">
              <Form.Label>Start date</Form.Label>
              <Form.Control
                type="date"
                placeholder="start date"
                required
                name="startDate"
                value={activityItem.startDate}
                onChange={onValueChange}
              />
              {errors.startDate && (
                <small className=" text-danger ">{errors.startDate}</small>
              )}
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom05">
              <Form.Label>End date</Form.Label>
              <Form.Control
                type="date"
                placeholder="end date"
                required
                name="endDate"
                value={activityItem.endDate}
                onChange={onValueChange}
              />
              {errors.endDate && (
                <small className=" text-danger ">{errors.endDate}</small>
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

UpdateForm.propTypes = {
  refresh: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  activity: PropTypes.object,
};

export default UpdateForm;
