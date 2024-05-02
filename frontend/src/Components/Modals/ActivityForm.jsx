import { useEffect, useState } from "react";
import { Button, Col, Row, Form, Modal } from "react-bootstrap";
import { addActivity } from "../../services/activity-service";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

const ActivityForm = ({ refresh, show, handleClose }) => {
  const [activityItem, setActivityItem] = useState({
    name: "",
    category: "project",
    startDate: "",
    endDate: "",
    description: "",
  });

  //form errors validation
  const [errors, setErrors] = useState({});

  const validateValues = (inputValues) => {
    let errors = {};
    if (inputValues.name.length < 2 || inputValues.name.length > 50) {
      errors.name = "Name length must be between 2 and 50";
    }
    if (!inputValues.startDate) {
      errors.startDate = "Start Date is required";
    }
    if (
      !inputValues.endDate ||
      new Date(inputValues.endDate) < new Date(inputValues.startDate)
    ) {
      errors.endDate = "End Date is required & must be greater than startDate";
    }
    if (new Date() > new Date(inputValues.startDate)) {
      errors.startDate = "Start Date must be greater than today";
    }
    if (
      Math.round(
        (new Date(inputValues.endDate).getTime() -
          new Date(inputValues.startDate).getTime()) /
          (1000 * 3600 * 24)
      ) < 3
    ) {
      errors.startDate =
        "Difference in start date & end date must be more than 3 days";
    }
    if (
      Math.round(
        (new Date(inputValues.endDate).getTime() -
          new Date(inputValues.startDate).getTime()) /
          (1000 * 3600 * 24)
      ) > 270
    ) {
      errors.endDate =
        "Difference in start date & end date must be less than 9 months";
    }
    if (inputValues.description.length > 200) {
      errors.description =
        "Description exceeds maximum length of 200 characters";
    }
    return errors;
  };

  // end of form errors validation

  const onValueChange = (e) => {
    setActivityItem({ ...activityItem, [e.target.name]: e.target.value });
    setErrors(validateValues(activityItem));
  };

  useEffect(() => {
    setErrors(validateValues(activityItem));
  }, [activityItem]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (Object.keys(errors).length === 0) handleAddActivity();
  };

  const handleAddActivity = async () => {
    try {
      const result = await addActivity(activityItem);
      if (result.status === 201) {
        toast.success("Activity added successfully");
        refresh();
        handleClose();
      }
    } catch (error) {
      toast.error(error.message);
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
            <h1 className=" text-white h3 ">Add activity</h1>
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
                className=" mt-2 "
                required
                type="text"
                placeholder="Activity name"
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
                className=" form-control mt-2 "
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
                className=" mt-2 "
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
                className=" mt-2 "
                type="date"
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
                className=" mt-2 "
                type="date"
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
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ActivityForm.propTypes = {
  refresh: PropTypes.func,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default ActivityForm;
