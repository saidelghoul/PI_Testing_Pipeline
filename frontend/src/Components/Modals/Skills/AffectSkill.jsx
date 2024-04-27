import { Button, Col, Row, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from 'axios';
import SocialSkillService from "../../../services/socialSkill-service";
import { useNavigate, useParams } from "react-router-dom";

const AffectSkill = () => {
  const {id} = useParams(); 
  const [validated, setValidated] = useState(false);
  const [socialSkillItem, setSocialSkillItem] = useState({});
  const [skills, setSkills] = useState(null);
  const navigate = useNavigate(); // Utilisation de useNavigate pour rediriger

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await SocialSkillService.getAvailableSocialSkills(id); // Obtenir les compétences disponibles
        setSkills(response); // Mettre à jour l'état avec les compétences
      } catch (error) {
        console.error("Erreur lors de la récupération des compétences:", error.message);
      }
    };

    fetchSkills();
  }, [id]);

  const onValueChange = (e) => {
    const selectedSkillId = e.target.value;
    setSocialSkillItem(selectedSkillId);
  };






  const handleAddSocialSkill = async () => {
    if (!socialSkillItem) {
      alert("Veuillez sélectionner une compétence à ajouter."); // Assurez-vous qu'une compétence est sélectionnée
      return;
    }

    try {
      await SocialSkillService.assignSocialSkillToUser(socialSkillItem, id); // Appeler la méthode du service pour affecter
      console.log(socialSkillItem, id);
      alert("Compétence sociale ajoutée avec succès"); // Message de succès
    } catch (error) {
      console.error("Erreur lors de l'ajout de la compétence sociale :", error.message);
      alert("Erreur lors de l'ajout de la compétence sociale : " + error.message); // Message d'erreur
    }
  };






  return (
    <div>
      
      
      <Button
          onClick={() => navigate("/profil")}
          variant="secondary"
          style={{ backgroundColor: "#fff", color: "#e44d3a", cursor: "pointer" }}
        >
          Fermer
        </Button>
      
        <h1>Ajouter une compétence sociale</h1>


      <Form
        className=" container-fluid p-4  "
        noValidate
        validated={validated}
        onSubmit={(e) => e.preventDefault()}
      >
        <Row className="mb-3">
          <Form.Group>
          <p>Choisissez la compétence à ajouter :</p>
          <select className="browser-default custom-select" onChange={onValueChange} name="socialSkill">
          <option value="">Sélectionnez une compétence</option>
          {skills?.map((sk, index) => (
            <option key={index} value={sk._id}>{sk.name}</option>
            ))}
          </select>

          </Form.Group>
          
        </Row>
        <Button
          style={{ backgroundColor: "#e44d3a" }}
          onClick={handleAddSocialSkill} // Ajoutez l'événement pour le bouton
        >
          Ajouter
        </Button>
      </Form>

    </div>
  );
};

export default AffectSkill;
