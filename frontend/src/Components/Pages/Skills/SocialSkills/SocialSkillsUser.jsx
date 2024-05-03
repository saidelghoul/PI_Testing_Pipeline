import { React, useContext, useEffect, useState } from 'react';
import { UserContext } from "../../../../../context/userContext";
import { Link } from "react-router-dom";
import SocialSkillService from "../../../../services/socialSkill-service";
import { Modal, Button, Badge, OverlayTrigger, Tooltip, DropdownButton , Dropdown } from 'react-bootstrap';
import { FaUser, FaStar, FaHeart, FaLevelUpAlt, FaInfoCircle, FaTrashAlt } from 'react-icons/fa';

function SocialSkillsUSer() {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [assigned, setAssigned] = useState([]);
  const [skills, setSkills] = useState([]);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [displayCount, setDisplayCount] = useState(4); // Initialisez avec 4 compétences à afficher
  const [filterLevel, setFilterLevel] = useState("⭐⭐⭐");
  const [filteredSkills, setFilteredSkills] = useState([]);

  const getAssigned = async () => {
    try {
      const skillsData = await SocialSkillService.getSocialSkillsByUser(user.id);
      setAssigned(skillsData.socialSkills);
      setFilteredSkills(skillsData.socialSkills); // Initialiser avec toutes les compétences

      
    } catch (error) {
      console.error("Erreur lors de la récupération des compétences assignées:", error);
    }
  };

  const totalSocialPoints = assigned.reduce(
    (total, skill) => total + (skill.pointSocial || 0),
    0
  );

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
  
  const applyFilter = (level) => {
    setFilterLevel(level);
    console.log("levelLLLL",level);
    if (level === "Tous") {
      setFilteredSkills(assigned); // Afficher toutes les compétences
    } else if (level === "bas"){
      setFilterLevel("⭐");
      setFilteredSkills(assigned.filter((skill) => {
        console.log("skill cible :", skill.niveau);
        return skill.niveau === level; // Filtrer par niveau
      }));
    }else if (level === "intermédiaire"){
      setFilterLevel("⭐⭐");
      setFilteredSkills(assigned.filter((skill) => {
        console.log("skill cible :", skill.niveau);
        return skill.niveau === level; // Filtrer par niveau
      }));
    }else {
      setFilterLevel("⭐⭐⭐");
      setFilteredSkills(assigned.filter((skill) => {
        console.log("skill cible :", skill.niveau);
        return skill.niveau === level; // Filtrer par niveau
      }));
    }
    console.log("Filter", filteredSkills);
  };
  
  

  const handleRemove = async (skillId) => {
    try {
      await SocialSkillService.unassignSocialSkillFromUser(skillId, user.id);
      setAssigned(assigned.filter((skill) => skill._id !== skillId));
      setFilteredSkills(filteredSkills.filter(skill => skill._id !== skillId)); // Mettre à jour la liste filtrée
    } catch (error) {
      console.error("Erreur lors de la suppression de la compétence sociale:", error);
    }
  };

  const SocialSkillPopup = ({ skill, show, handleClose }) => (
    <Modal show={show} onHide={handleClose} centered animation>
      <Modal.Body>
      <div style={{ textAlign: 'center' }}>
        <br />
  <Badge pill variant="info" style={{ fontSize: '1.1em' }}> {/* Augmenter la taille du texte */}
    Niveau {skill.niveau}
  </Badge>
</div>

        <hr />
        {skill.description && (
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <FaInfoCircle style={{ color: '#6c757d' }} />
            <span style={{ paddingLeft: '5px' }}>{skill.description}</span>
          </div>
        )}
        <p style={{ textAlign: 'center', fontWeight: 'bold' ,fontSize: '1.1em'}}>
          <FaHeart style={{ color: 'red' }} /> Points Sociaux: {skill.pointSocial}
        </p>
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: 'center' }}>
        <Button variant="secondary" onClick={handleClose}>
          <FaStar /> Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const handleShowSkillModal = (skill) => {
    setSelectedSkill(skill);
    setShowSkillModal(true);
  };

  const handleCloseSkillModal = () => {
    setSelectedSkill(null);
    setShowSkillModal(false);
  };

  const showMoreSkills = () => {
    setDisplayCount(displayCount + 4); // Ajouter 4 compétences supplémentaires à afficher
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <div className="user-profile-ov">
        <h3>
          Compétences Sociales (Score Total: <strong style={{ color: 'red' }}>{totalSocialPoints} points</strong>)
          <Link to={`/affectSkill/${user.id}`}>
            <i className="fa fa-plus-square"></i>
          </Link>
        </h3>
        <br />
        {/* Dropdown pour le filtrage */}
        <DropdownButton
          id="dropdown-filter-level"
          title={`Filtrer les SocialSkills par niveau (${filterLevel})`}
          onSelect={(eventKey) => applyFilter(eventKey)}
        >
          <hr />
          <Dropdown.Item eventKey="Tous"><span>Tous les niveaux</span></Dropdown.Item>
          <hr />
          <Dropdown.Item eventKey="bas"> <span>⭐</span>niveau bas</Dropdown.Item>
          <hr />
          <Dropdown.Item eventKey="intermédiaire"><span>⭐⭐ </span>niveau intermédiaire</Dropdown.Item>
          <hr />
          <Dropdown.Item eventKey="élevé"><span>⭐⭐⭐ </span>niveau élevé</Dropdown.Item>
        </DropdownButton><hr />

        {filteredSkills.length > 0 ? (
          <ul className="skill-tags" style={{ listStyle: 'none', paddingLeft: '0' }}>
            {filteredSkills.slice(0, displayCount).map((skill) => ( // Afficher les compétences selon le nombre défini
              <OverlayTrigger
                key={skill._id}
                placement="top"
                overlay={
                  <Tooltip id={`tooltip-${skill._id}`}>
                    Points sociaux: {skill.pointSocial} <br />
                    Priorité: {skill.niveau} {/* Vous pouvez également afficher la priorité */}
                  </Tooltip>
                }
              >
                <li 
                  style={{ 
                    border: '2px solid #ddd', 
                    padding: '10px', 
                    marginBottom: '10px', 
                    borderRadius: '5px', 
                    position: 'relative' 
                  }}
                >
                  <span 
                    onClick={() => handleShowSkillModal(skill)} 
                    style={{ cursor: 'pointer', color: '#007bff' }}
                  >
                    {skill.name}
                  </span>
                  <span 
                    onClick={() => handleRemove(skill._id)} 
                    style={{ position: 'absolute', top: '10px', right: '-10px', cursor: 'pointer' }}
                  >
                    <FaTrashAlt style={{ color: 'red' }} />
                  </span>
                </li>
              </OverlayTrigger>
            ))}
          </ul>
        ) : (
          <div>Vous n'avez pas encore de compétences sociales.</div>
        )}

        {assigned.length > displayCount && (
          <Button variant="primary" onClick={showMoreSkills}>
            Voir plus
          </Button>
        )}

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
