import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../../context/userContext";
import { Link } from "react-router-dom";
import TechnicalSkillService from "../../../../services/technicalSkill-service";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaInfoCircle, FaHeart, FaTrashAlt } from "react-icons/fa";

function TechnicalSkillsUser() {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [assignedTechnicalSkills, setAssignedTechnicalSkills] = useState([]);

  useEffect(() => {
    const fetchAssignedTechnicalSkills = async () => {
      try {
        const skillsData = await TechnicalSkillService.getTechnicalSkillsByUser(user.id);
        setAssignedTechnicalSkills(skillsData.technicalSkills);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des compétences techniques assignées:", error);
        setIsLoading(false);
      }
    };

    if (user) {
      fetchAssignedTechnicalSkills();
    }
  }, [user]);

  const TechnicalSkillPopup = ({ skill, show, handleClose }) => (
    <Modal show={show} onHide={handleClose} centered animation>
      <Modal.Body>
        <div style={{ textAlign: "center" }}>
          <br />
          <h2 className="h3 ">{skill.technology.name}</h2>
        </div>

        <hr />

        {skill.technology.description && (
          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            <FaInfoCircle style={{ color: "#6c757d" }} />
            <span style={{ paddingLeft: "5px" }}>{skill.technology.description}</span>
          </div>
        )}
        <p style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.1em" }}>
          <FaHeart style={{ color: "red" }} /> Niveau: {skill.users.find((u) => u.user === user.id).niveau}
        </p>
        <hr />
        <p style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.1em" }}>
          <FaHeart style={{ color: "red" }} /> Années d'expérience: {skill.users.find((u) => u.user === user.id).yearsOfExperience}
        </p>
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: "center" }}>
        <Button variant="secondary" onClick={handleClose}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const [showSkillModal, setShowSkillModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const handleShowSkillModal = (skill) => {
    setSelectedSkill(skill);
    setShowSkillModal(true);
  };

  const handleCloseSkillModal = () => {
    setSelectedSkill(null);
    setShowSkillModal(false);
  };

  const getBackgroundColor = (niveau) => {
    switch (niveau) {
      case "Beginner":
        return "#f0e68c"; // Jaune pâle
      case "Intermediate":
        return "#ffa07a"; // Orange clair
      case "Advanced":
        return "#ff6347"; // Rouge orangé
      case "Expert":
        return "#e91640"; // Rouge foncé
      default:
        return "#f5f5f5"; // Gris clair (couleur par défaut)
    }
  };

  // Fonction pour attribuer un ordre numérique aux niveaux de compétence
  const getLevelOrder = (niveau) => {
    switch (niveau) {
      case "Beginner":
        return 1;
      case "Intermediate":
        return 2;
      case "Advanced":
        return 3;
      case "Expert":
        return 4;
      default:
        return 0;
    }
  };

  // Trier les compétences techniques par niveau décroissant
  const sortedTechnicalSkills = assignedTechnicalSkills.sort((a, b) => {
    const levelA = getLevelOrder(a.users.find((u) => u.user === user.id).niveau);
    const levelB = getLevelOrder(b.users.find((u) => u.user === user.id).niveau);
    return levelB - levelA;
  });

  // Fonction pour gérer la suppression d'une compétence technique
  const handleRemoveTechnicalSkill = async (skillId) => {
    try {
      await TechnicalSkillService.removeUserFromTechnicalSkill(user.id, skillId);
      setAssignedTechnicalSkills(assignedTechnicalSkills.filter((skill) => skill._id !== skillId));
    } catch (error) {
      console.error("Erreur lors de la suppression de la compétence technique :", error);
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <div className="user-profile-ov">
        <h3 className="h1 text-center">
          Compétences Techniques 👨‍💻
          <Link to={`/${user.id}/assign`}>
            <i className="fa fa-plus-square h2"></i>
          </Link>
        </h3>

        <br />

        {sortedTechnicalSkills && sortedTechnicalSkills.length > 0 ? (
          <ul className="skill-tags text-center" style={{ listStyle: "none", paddingLeft: "0" }}>
          {sortedTechnicalSkills.map((skill) => (
            <OverlayTrigger
              key={skill._id}
              placement="top"
              overlay={
                <Tooltip id={`tooltip-${skill._id}`}>
                  <span>
                    {skill.technology.description}
                    <br />
                    Niveau : {skill.users.find((u) => u.user === user.id).niveau}
                    <br />
                    Années d'expérience : {skill.users.find((u) => u.user === user.id).yearsOfExperience}
                  </span>
                </Tooltip>
              }
            >
              <li
                style={{
                  backgroundColor: getBackgroundColor(skill.users.find((u) => u.user === user.id).niveau),
                  border: "2px solid #ddd",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  
                  alignItems: "center",
                }}
                onClick={() => handleShowSkillModal(skill)}
              >
                <span style={{ cursor: "pointer", color: "#003300" }}>{skill.technology.name}</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveTechnicalSkill(skill._id);
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <FaTrashAlt style={{ color: "black" }} />
                </span>
              </li>
            </OverlayTrigger>
          ))}
        </ul>
        
        ) : (
          <div className="text-center h6">
            Vous n'avez pas encore ajouté de compétences techniques.
            <hr />
            <p>Ajoutez-en maintenant et personnalisez votre profil 👨‍💻.</p>
          </div>
        )}

        {selectedSkill && (
          <TechnicalSkillPopup
            skill={selectedSkill}
            show={showSkillModal}
            handleClose={handleCloseSkillModal}
          />
        )}
        <span className="text-center">
          <hr />
          chaque couleur 🔴 représente le Niveau d'expertise 🎓 <br></br> d'un Technical Skill
        </span> 
        <span className="text-center">
        <hr/>
          (🔴 : Expert) 
          (🟠 : Advanced) 
          (🤲🏻 : Intermediate) 
          (🟡 : Beginner) 
        </span>
      </div>
    </div>
  );
}

export default TechnicalSkillsUser;
