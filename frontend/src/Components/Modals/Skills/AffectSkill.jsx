import { Button, Col, Row, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from 'axios';
import SocialSkillService from "../../../services/socialSkill-service";
import { useParams } from "react-router-dom";

const AffectSkill = () => {
  const {id} = useParams(); 
  const [validated, setValidated] = useState(false);
  const [socialSkillItem, setSocialSkillItem] = useState("");
  const [skills, setSkills] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await SocialSkillService.getAvailableSocialSkills(id); // Remplacez ceci par votre fonction pour récupérer les compétences
        setSkills(response);
      } catch (error) {
        console.error("Erreur lors de la récupération des compétences :", error.message);
      }
    };

    fetchSkills();
  }, []);

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
      await SocialSkillService.assignSocialSkillToUser(id, socialSkillItem);

      alert("Compétence sociale ajoutée avec succès");
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de l'ajout de la compétence sociale :", error.message);
    }
  };


  return (
    <div>
      <Row>
        <h1 as={Col}>Ajouter une compétence sociale</h1>
        <Button
          as={Col}
          md="3"
          variant="secondary"
          style={{
            backgroundColor: "#fff",
            color: "#e44d3a",
            cursor: "pointer",
          }}
        >
          Fermer
        </Button>
      </Row>

      <Form
        className=" container-fluid p-4  "
        noValidate
        validated={validated}
      >
        <Row className="mb-3">
          <Form.Group>
          <p>Choisissez la compétence à ajouter :</p>
          <select className="browser-default custom-select" onChange={(e) => onValueChange(e)} name="socialSkill">
          {skills?.map((sk, index) => (
            <option key={index} value={sk._id}>{sk.name}</option>
            ))}
          </select>

          </Form.Group>
          
        </Row>
      </Form>

      <Button
        className={validated ? "disabled" : ""}
        style={{ backgroundColor: "#e44d3a" }}
        onClick={handleSubmit}
      >
        Ajouter
      </Button>
    </div>
  );
};

export default AffectSkill;
