import { React, useContext, useEffect, useState } from 'react';
import { UserContext } from "../../../../../context/userContext";
import { Link } from "react-router-dom";
import SocialSkillService from "../../../../services/socialSkill-service";
import { Modal, Button } from 'react-bootstrap';

function SocialSkillsUSer() {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [assigned, setAssigned] = useState([]);
  const [skills, setSkills] = useState([]);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const getAssigned = async () => {
    try {
      const skillsData = await SocialSkillService.getSocialSkillsByUser(user.id);
      setAssigned(skillsData.socialSkills); 
    } catch (error) {
      console.error("Erreur lors de la récupération des compétences assignées:", error);
    }
  };

  // Calculer le score total des points sociaux
  const totalSocialPoints = assigned.reduce((total, skill) => {
    return total + (skill.pointSocial || 0); // Si pointSocial est défini, ajoutez-le au total
  }, 0); // Initialisez le total à zéro pour éviter les erreurs

  const fetchSkills = async () => {
    try {
      const availableSkills = await SocialSkillService.getAvailableSocialSkills(user.id);
      setSkills(availableSkills); 
    } catch (error) {
      console.error("Erreur lors de la récupération des compétences disponibles:", error);
    }
  };

  useEffect(() => {
    if (user) {
      setIsLoading(false);
      getAssigned(); 
      fetchSkills(); 
    }
  }, [user]);


  const handleRemove = async (skillId) => {
    try {
      await SocialSkillService.unassignSocialSkillFromUser(skillId, user.id);
      setAssigned(assigned.filter((skill) => skill._id !== skillId));
    } catch (error) {
      console.error("Erreur lors de la suppression de la compétence sociale:", error);
    }
  };





  const SocialSkillPopup = ({ skill, show, handleClose }) => (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Informations sur {skill.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Nom:</strong> {skill.name}</p>
        <p><strong>Niveau:</strong> {skill.niveau}</p>
        {/* Point social en rouge */}
        <p style={{ color: 'red' }}><strong>Points Sociaux:</strong> {skill.pointSocial}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );


    // Fonction pour ouvrir le pop-up
    const handleShowSkillModal = (skill) => {
      setSelectedSkill(skill);
      setShowSkillModal(true); // Ouvre le pop-up
    };
  
    // Fonction pour fermer le pop-up
    const handleCloseSkillModal = () => {
      setShowSkillModal(false);
      setSelectedSkill(null); // Réinitialise le skill sélectionné
    };
  


  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <div className="user-profile-ov">
        <h3>
        Compétences Sociales (Score Total: <strong style={{ color: 'red' }}>{totalSocialPoints} points</strong>)
          <a href="#" title="" className="skills-open">
            <i className="fa fa-pencil"></i>
          </a>{" "}
          <Link to={`/affectSkill/${user?.id}`}>
            <i className="fa fa-plus-square"></i>
          </Link>
        </h3>

        {assigned.length > 0 ? (
          <ul className="skill-tags">
            {assigned.map((skill) => (
              <li key={skill._id}>
                <a 
                  title={skill.name} 
                  onClick={() => handleShowSkillModal(skill)}
                >
                  {skill.name}
                </a>
                {/* Icône pour supprimer */}
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRemove(skill._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-x-octagon-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708"
                    />
                  </svg>
                </span>
              </li>
            ))}
          </ul>
        ) : ( 
          <div>Vous n'avez pas encore de compétences sociales.</div>
        )}

        {/* Utilisation du pop-up */}
        {selectedSkill && (
          <SocialSkillPopup 
            skill={selectedSkill} 
            show={showSkillModal} 
            handleClose={handleCloseSkillModal} 
          />
        )}
      </div>
    </div>
  );
}

export default SocialSkillsUSer;
