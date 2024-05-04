import React, { useContext } from 'react'
import { Button, Col, Row, Form, Card, Dropdown, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import SocialSkillService from "../../../services/socialSkill-service";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlusCircle, FaTimesCircle } from "react-icons/fa";
import { UserContext } from '../../../../context/userContext';


function AffectSkillOtherUser( targetUserId ) {

    const { id } = useParams();
    const { user} = useContext(UserContext);
    const [validated, setValidated] = useState(false);
    const [socialSkillItem, setSocialSkillItem] = useState(null); // Utilisez null comme valeur par défaut
    const [skills, setSkills] = useState([]);
    const [error, setError] = useState(null); // Utilisez un état pour les erreurs
    const navigate = useNavigate(); // Utilisation de useNavigate pour rediriger
    targetUserId = id ;
    console.log("HEEEEEEYYYY",targetUserId);
    //console.log("userrrrrrr: ",user);
  
    useEffect(() => {
      const fetchSkills = async () => {
        try {
          const response = await SocialSkillService.getAvailableSocialSkills(id); // Obtenir les compétences disponibles
          setSkills(response); // Mettre à jour l'état avec les compétences
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
          await SocialSkillService.assignSocialSkillToUser(socialSkillItem, id, user.id);
          alert("Compétence sociale ajoutée avec succès");
          navigate(`/profileuser/${targetUserId}`); // Redirection vers le profil du user auquel nous avons ajouté
        } catch (error) {
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

  return (
     <div className="container">
      {error && <Alert variant="danger">{error}</Alert>} {/* Afficher les erreurs */}
      <Card className="my-4 p-4">
        <Row className="mb-3">
          <Col>
            <h2 className="text-center h4" >Ajouter une compétence sociale 💝 <br /><span className="h6">( Le nombre de "⭐" équivaut à la demande de cette compétence dans le marché)</span></h2>
            <p className="text-center"></p>
          </Col>
          
        </Row>

        <Form noValidate validated={validated}>
          <Form.Group controlId="socialSkillSelect">

          <Dropdown>
  <Dropdown.Toggle variant="primary" id="dropdown-basic">
    {socialSkillItem
      ? skills.find((sk) => sk._id === socialSkillItem)?.name
      : "Sélectionnez une compétence qui vous représente le mieux !!!"}
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
              >
                <FaPlusCircle /> Add
              </Button>
              <Button
              style={{ marginLeft: '10px' }}
              variant="danger"
              onClick={() => navigate(`/profileuser/${targetUserId}`)}
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
  )
}

export default AffectSkillOtherUser