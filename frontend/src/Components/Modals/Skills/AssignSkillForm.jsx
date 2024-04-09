import { Button, Col, Row, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import SocialSkillService from "../../../services/socialSkill-service";

const AssignSkillForm = ({ show, handleClose, skills }) => {
  const [validated, setValidated] = useState(false);
  const [socialSkillItem, setSocialSkillItem] = useState("");

  const onValueChange = (e) => {
    const selectedSkillId = e.target.value;
    setSocialSkillItem(selectedSkillId);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    handleAddSocialSkill();
  };

  const handleAddSocialSkill = async () => {
    try {
      const userId = skills[skills.length - 1];
      await SocialSkillService.assignSocialSkillToUser(userId, socialSkillItem);
      alert("Compétence sociale ajoutée avec succès");
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de l'ajout de la compétence sociale :", error.message);
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
            <h1>Ajouter une compétence sociale</h1>
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
            Fermer
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
            <p>Choisissez la compétence à ajouter :</p>
            <select className="browser-default custom-select" onChange={(e) => onValueChange(e)} name="socialSkill">
              {skills.map((sk, index) => (
                <option key={index} value={sk._id}>{sk.name}</option>
              ))}
            </select>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          className={validated ? "disabled" : ""}
          style={{ backgroundColor: "#e44d3a" }}
          onClick={handleSubmit}
        >
          Ajouter
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AssignSkillForm;
