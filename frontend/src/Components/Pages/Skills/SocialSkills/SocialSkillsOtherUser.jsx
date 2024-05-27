import { useEffect, useState } from "react";
import SocialSkillService from "../../../../services/socialSkill-service";
import {
  Modal,
  Button,
  Badge,
  OverlayTrigger,
  Tooltip,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { FaStar, FaHeart, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function SocialSkillsUSer({ user }) {
  const [isLoading, setIsLoading] = useState(true);
  const [assigned, setAssigned] = useState([]);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [displayCount, setDisplayCount] = useState(4); // Initialisez avec 4 compétences à afficher
  const [filterLevel, setFilterLevel] = useState("Tous");
  const [filteredSkills, setFilteredSkills] = useState([]);

  const getAssigned = async () => {
    try {
      const skillsData = await SocialSkillService.getSocialSkillsByUser(
        user._id
      );
      setAssigned(skillsData.socialSkills);
      setFilteredSkills(skillsData.socialSkills); // Initialiser avec toutes les compétences
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des compétences assignées:",
        error
      );
    }
  };

  useEffect(() => {
    if (user) {
      setIsLoading(false);
      getAssigned();
      //fetchSkills();
    }
  }, [user]);

  // Calcul du total des points sociaux selon la nouvelle formule
  const totalSocialPoints = Math.round(
    assigned.reduce((total, skill) => {
      const weight = skill.assignedBy === user._id ? 1 : 2;
      return total + (skill.pointSocial || 0) * weight;
    }, 0)
  ); // Arrondi

  // Compter le nombre de compétences auto-affectées et non-auto-affectées
  const countAuto = assigned.filter(
    (skill) => skill.assignedBy === user._id
  ).length;
  const countShared = assigned.filter(
    (skill) => skill.assignedBy !== user._id
  ).length;

  const applyFilter = (level) => {
    setFilterLevel(level);
    if (level === "Tous") {
      setFilteredSkills(assigned); // Afficher toutes les compétences
    } else if (level === "bas") {
      setFilterLevel("⭐");
      setFilteredSkills(
        assigned.filter((skill) => {
          return skill.niveau === level; // Filtrer par niveau
        })
      );
    } else if (level === "intermédiaire") {
      setFilterLevel("⭐⭐");
      setFilteredSkills(
        assigned.filter((skill) => {
          return skill.niveau === level; // Filtrer par niveau
        })
      );
    } else {
      setFilterLevel("⭐⭐⭐");
      setFilteredSkills(
        assigned.filter((skill) => {
          return skill.niveau === level; // Filtrer par niveau
        })
      );
    }
  };

  const handleRemove = async (skillId) => {
    try {
      await SocialSkillService.unassignSocialSkillFromUser(skillId, user._id);
      setAssigned(assigned.filter((skill) => skill._id !== skillId));
      setFilteredSkills(
        filteredSkills.filter((skill) => skill._id !== skillId)
      ); // Mettre à jour la liste filtrée
    } catch (error) {
      console.error(
        "Erreur lors de la suppression de la compétence sociale:",
        error
      );
    }
  };

  const SocialSkillPopup = ({ skill, show, handleClose }) => (
    <Modal show={show} onHide={handleClose} centered animation>
      <Modal.Body>
        <div style={{ handleRemove }}>
          <br />
          <Badge
            pill
            variant="info"
            style={{
              fontSize: "1.1em",
              marginBottom: "10px",
              marginLeft: "200px",
            }}
          >
            {" "}
            {/* Augmenter la taille du texte */}
            Niveau {skill.niveau}
          </Badge>
        </div>

        <hr />
        {skill.description && (
          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            <FaInfoCircle style={{ color: "#6c757d" }} />
            <span style={{ paddingLeft: "5px" }}>{skill.description}</span>
          </div>
        )}
        <p
          style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.1em" }}
        >
          <FaHeart style={{ color: "red" }} /> Points Sociaux:{" "}
          {skill.pointSocial}
        </p>
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: "center" }}>
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
        <h3 style={{ textAlign: "center" }}>
          Social Skills 🧠 of {user.name}
          <Link to={`/affectSkillOtherUser/${user._id}`}>
            <i className="fa fa-plus-square"></i>
          </Link>
        </h3>
        <h3 className="text-center h4">
          ({countShared} 💝 / {countAuto} 😎)
        </h3>

        {/* Dropdown pour le filtrage */}

        {filteredSkills.length > 0 ? (
          <>
            <DropdownButton
              id="dropdown-filter-level"
              title={`Filtrer les SocialSkills par niveau (${filterLevel})`}
              onSelect={(eventKey) => applyFilter(eventKey)}
              style={{ textAlign: "center" }}
            >
              <hr />
              <Dropdown.Item eventKey="Tous">
                <span>Tous les niveaux</span>
              </Dropdown.Item>
              <hr />
              <Dropdown.Item eventKey="bas">
                {" "}
                <span>⭐</span>niveau bas
              </Dropdown.Item>
              <hr />
              <Dropdown.Item eventKey="intermédiaire">
                <span>⭐⭐ </span>niveau intermédiaire
              </Dropdown.Item>
              <hr />
              <Dropdown.Item eventKey="élevé">
                <span>⭐⭐⭐ </span>niveau élevé
              </Dropdown.Item>
            </DropdownButton>
            <hr />
            <ul
              className="skill-tags"
              style={{ listStyle: "none", paddingLeft: "0" }}
            >
              {filteredSkills.slice(0, displayCount).map(
                (
                  skill // Afficher les compétences selon le nombre défini
                ) => (
                  <OverlayTrigger
                    key={skill._id}
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip-${skill._id}`}>
                        Type:{" "}
                        {skill.assignedBy === user._id
                          ? " (Myself 😎) "
                          : " (Shared 💝) "}{" "}
                        {/* Condition pour indiquer le type d'affectation */}{" "}
                        <br />
                        Priorité: {skill.niveau}{" "}
                        {/* Vous pouvez également afficher la priorité */}
                      </Tooltip>
                    }
                  >
                    <li
                      style={{
                        backgroundColor:
                          skill.assignedBy === user._id ? "#c3e6cb" : "#f5c6cb",
                        border: "2px solid #ddd",
                        padding: "10px",
                        marginBottom: "10px",
                        borderRadius: "5px",
                        position: "relative",
                        marginLeft: "20px",
                      }}
                    >
                      <span
                        onClick={() => handleShowSkillModal(skill)}
                        style={{
                          cursor: "pointer",
                          color: "#007bff",
                          textAlign: "center",
                        }}
                      >
                        {skill.name}
                      </span>
                    </li>
                  </OverlayTrigger>
                )
              )}
            </ul>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <hr />
            <h1>
            No social skills available at present (*){" "}
            </h1>

            <p>
              {" "}
              (*) : it is possible that the user has not yet added
              Social Skills 😎.{" "}
            </p>
            <h3 style={{ textAlign: "center" }}>
            Give him some SocialSkills💝
            </h3>
          </div>
        )}

        {assigned.length > displayCount && (
          <Button variant="primary" onClick={showMoreSkills}>
            View More
          </Button>
        )}

        {selectedSkill && (
          <SocialSkillPopup
            skill={selectedSkill}
            show={showSkillModal}
            handleClose={handleCloseSkillModal}
          />
        )}
        <span className="text-center">
          <hr />
          (💝 : Social Skills affected by OTHERS Users)(15 Max)
        </span>
        <span className="text-center">
          (😎 : Social Skills affected by YOURSELF)(10 Max)
        </span>
      </div>
    </div>
  );
}

export default SocialSkillsUSer;
