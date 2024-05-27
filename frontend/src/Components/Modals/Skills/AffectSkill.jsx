import { Button, Col, Row, Form, Card, Dropdown, Alert } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import SocialSkillService from "../../../services/socialSkill-service";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlusCircle, FaTimesCircle,   FaCheck } from "react-icons/fa";
import { UserContext } from "../../../../context/userContext";



const AffectSkill = () => {
  const { user } = useContext(UserContext); // Pour obtenir les détails de l'utilisateur
  const { id } = useParams();
  const [validated, setValidated] = useState(false);
  const [socialSkillItem, setSocialSkillItem] = useState(null); // Utilisez null comme valeur par défaut
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState(null); // Utilisez un état pour les erreurs
  const navigate = useNavigate(); // Utilisation de useNavigate pour rediriger
  const [autoSkillsCount, setAutoSkillsCount] = useState(0); // Compter les compétences auto-affectées

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await SocialSkillService.getAvailableSocialSkills(id); // Obtenir les compétences disponibles
        setSkills(response); // Mettre à jour l'état avec les compétences

        // Obtenir le nombre de compétences auto-affectées
        const autoSkillsResponse = await SocialSkillService.getSocialSkillsByUser(id);
        const autoSkills = autoSkillsResponse.socialSkills.filter(skill => skill.assignedBy === id);
        setAutoSkillsCount(autoSkills.length); // Mettre à jour le nombre de compétences auto-affectées 😎
      } catch (error) {
        console.error("Erreur lors de la récupération des compétences:", error.message);
        setError("Erreur lors de la récupération des compétences");
      }
    };

    fetchSkills();
  }, [id]);

  const handleSkillSelect = (skill) => {
    setSocialSkillItem(skill._id); // Définir l'ID de la compétence sélectionnée
  };

  const handleAddSocialSkill = async () => {
    if (!socialSkillItem) {
      alert("Veuillez sélectionner une compétence à ajouter.");
      return;
    }

    try {
      await SocialSkillService.assignSocialSkillToUser(socialSkillItem, id , id);
      alert("Compétence sociale ajoutée avec succès");
      navigate("/profil"); // Rediriger vers le profil après le succès
    } catch (error) {
      console.error("Erreur lors de l'ajout de la compétence sociale :", error.message);
      setError("Erreur lors de l'ajout de la compétence sociale : " + error.message);
    }
  };

  const getStarRating = (niveau) => {
    if (niveau === "bas") {
      return "(⭐)"; // Une étoile
    } else if (niveau === "intermédiaire") {
      return "(⭐⭐)"; // Deux étoiles
    } else if (niveau === "élevé") {
      return "(⭐⭐⭐)"; // Trois étoiles
    }
  };

    // Désactiver le bouton si la limite est atteinte
    const isAddButtonDisabled = autoSkillsCount >= 10;


  

  return (
    <div className="container">
      {error && <Alert variant="danger">{error}</Alert>} {/* Afficher les erreurs */}
      <Card className="my-4 p-4">
        <Row className="mb-3">
          <Col>
            <h2 className="text-center h4" >Add a new Social Skill 😎<br /><span className="h6">( The number of “⭐” equals the demand for this skill in the market.)</span></h2>
            <p className="text-center"></p>
          </Col>
          
        </Row>

        <Form noValidate validated={validated}>
          <Form.Group controlId="socialSkillSelect">

          <Dropdown>
  <Dropdown.Toggle variant="primary" id="dropdown-basic">
    {socialSkillItem
      ? skills.find((sk) => sk._id === socialSkillItem)?.name
      : "Select a skill that best represents you!!!"}
  </Dropdown.Toggle>

  <Dropdown.Menu style={{ maxHeight: '100px', overflowY: 'auto', paddingRight: '10px' }}>
  {skills.map((sk) => {
    const stars = getStarRating(sk.niveau);
    return (
      <Dropdown.Item key={sk._id} onClick={() => handleSkillSelect(sk)}>
        ➡ {sk.name} {stars}
      </Dropdown.Item>
    );
  })}
</Dropdown.Menu>

</Dropdown>
          </Form.Group>

          <Row className="mt-4">
            <Col className="">
              <Button
                variant="success"
                onClick={handleAddSocialSkill}
                disabled={isAddButtonDisabled} // Désactiver si limite atteinte
              >
                <FaPlusCircle /> Add
              </Button>
              <Button
              style={{ marginLeft: '10px' }}
              variant="danger"
              onClick={() => navigate("/profil")}
            >
              <FaTimesCircle /> Back
            </Button>
            </Col>
            <Col className="">
            
          </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default AffectSkill;
