import { useEffect, useState } from "react";
import { Button, Col, Row, Form, Modal } from "react-bootstrap";
import { addChecklist } from "../../services/checklist-service";
import PropTypes from "prop-types";
import Select from "react-select";
import toast from "react-hot-toast";

const ChecklistForm = ({ refresh, show, handleClose, id_task, users }) => {
  //retrieve the collaborators from the current task into a proper list
  const [holders, setHolders] = useState([]);
  const [checklistItem, setChecklistItem] = useState({
    title: "",
    holder: "",
    description: "",
  });

  //form errors validation
  const [errors, setErrors] = useState({});

  const validateValues = (inputValues) => {
    let errors = {};
    if (inputValues.title.length < 2 || inputValues.title.length > 50) {
      errors.title = "Title length must be between 2 and 50";
    }
    if (!inputValues.holder) {
      errors.holder = "Please specify a task holder";
    }
    if (inputValues.description.length > 200) {
      errors.description =
        "Description exceeds maximum length of 200 characters";
    }
    return errors;
  };

  // end of form errors validation
  useEffect(() => {
    const retrieveUsers = async () => {
      let options = [];

      await users?.map((user) =>
        options.push({
          value: user?.id,
          label: user?.name + " (" + user?.role + ")",
        })
      );

      setHolders(options);
    };

    retrieveUsers();

    setErrors(validateValues(checklistItem));
  }, [checklistItem]);

  const onValueChange = (e) => {
    setChecklistItem({ ...checklistItem, [e.target.name]: e.target.value });
    setErrors(validateValues(checklistItem));
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (Object.keys(errors).length === 0) handleAddChecklist();
  };

  const handleAddChecklist = async () => {
    try {
      const result = await addChecklist(checklistItem, id_task);
      if (result.status === 201) {
        toast.success("Checklist added successfully");
        refresh();
        handleClose();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onHolderChange = (name, value) => {
    setChecklistItem({ ...checklistItem, [name]: value?.value });
    setErrors(validateValues(checklistItem));
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header >
        <Row>
          <Modal.Title as={Col}>
            <h1 className=" text-white h3 ">Add checklist</h1>
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
              <Form.Label>Title</Form.Label>
              <Form.Control
                className=" mt-2 "
                required
                type="text"
                placeholder="checklist title"
                name="title"
                value={checklistItem.title}
                onChange={onValueChange}
              />
              {errors.title && (
                <small className=" text-danger ">{errors.title}</small>
              )}
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Holder</Form.Label>
              <Select
                required
                onChange={(value) => onHolderChange("holder", value)}
                name="holder"
                options={holders}
                className="basic-multi-select mt-2 "
                classNamePrefix="select"
              />
              {errors.holder && (
                <small className=" text-danger ">{errors.holder}</small>
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
                value={checklistItem.description}
                onChange={onValueChange}
              />
              {errors.description && (
                <small className=" text-danger ">{errors.description}</small>
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

ChecklistForm.propTypes = {
  refresh: PropTypes.func,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  id_task: PropTypes.string,
  users: PropTypes.arrayOf(PropTypes.object),
};

export default ChecklistForm;
