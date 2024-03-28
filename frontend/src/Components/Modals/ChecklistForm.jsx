import { useEffect, useState } from "react";
import { Button, Col, Row, Form, Modal } from "react-bootstrap";
import { addChecklist } from "../../services/checklist-service";
import PropTypes from "prop-types";
import Select from "react-select";

const ChecklistForm = ({ refresh, show, handleClose, id_task, users }) => {
  const [validated, setValidated] = useState(false);

  const [checklistItem, setChecklistItem] = useState({
    title: "",
    holder: "",
    description: "",
  });

  const [holders, setHolders] = useState([]);

  useEffect(() => {
    console.log(users);
    let options = [];

    users?.map((user) =>
      options.push({
        value: user?.id,
        label: user?.name + " (" + user?.role + ")",
      })
    );

    setHolders(options);
  }, []);

  const onValueChange = (e) => {
    setChecklistItem({ ...checklistItem, [e.target.name]: e.target.value });
    console.log(e.target.value);
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

  const onHolderChange = (name, value) => {
    setChecklistItem({ ...checklistItem, [name]: value?.[0]?.value });
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
            <Form.Group as={Col} md="6" controlId="validationCustom01">
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
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Holder</Form.Label>
              <Form.Select
                required
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
                {users.map((user, index) => (
                  <option key={index} value={user._id}>
                    {user.name} ( {user.role} )
                  </option>
                ))}
              </Form.Select>
              <Select
                onChange={(value) => onHolderChange("holder", value)}
                name="holder"
                options={holders}
                className="basic-multi-select"
                classNamePrefix="select"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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

ChecklistForm.propTypes = {
  refresh: PropTypes.func,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  id_task: PropTypes.string,
  users: PropTypes.arrayOf(PropTypes.object),
};

export default ChecklistForm;
