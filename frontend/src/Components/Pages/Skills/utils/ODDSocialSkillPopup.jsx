import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import odd4 from "../../../../../public/assets/images/ODD/4_EducationQuality.jpg";
import odd5 from "../../../../../public/assets/images/ODD/5_EgaliteSexes.jpg";
import odd8 from "../../../../../public/assets/images/ODD/8_EmploiesDecent.jpg";
import odd10 from "../../../../../public/assets/images/ODD/10_ReductionInegalites.jpg";
import odd15 from "../../../../../public/assets/images/ODD/15_Faune_Flore_Terrestre.jpg";
import odds from "../../../../../public/assets/images/ODD/ODDs.png";

function ODDSocialSkillPopup() {
  const [show, setShow] = useState(false);
  const [visibleSections, setVisibleSections] = useState(2); // Nombre de sections à afficher au début

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleViewMore = () => setVisibleSections(visibleSections + 2); // Augmente le nombre de sections visibles

  // Liste des ODD à afficher
  const oddSections = [
    {
      title: "✔️ Access to Quality Education",
      img: odd4,
      desc: '👨🏻‍🎓 : "Thanks to this application, we promote equitable access through quality education for all. Come learn best practices by working on group activities/projects!"',
    },
    {
      title: "✔️ Gender Equality",
      img: odd5,
      desc: '👩 : "No discrimination or sexism. All your investments and work are promoted thanks to the system\'s intelligence." 🧑 : "Great, nice and honest!!"',
    },
    {
      title: "✔️ Access to Decent Jobs",
      img: odd8,
      desc: '🧑🏻‍💻 : "Thanks to our application, we ensure you decent employment and sustainable economic growth that will be rewarded by your hard work!"',
    },
    {
      title: "✔️ Reducing Inequalities",
      img: odd10,
      desc: '🧑🏿🤝🏼🧑🏼 : "In our application, you can forget racism and any other form of inequality within the country and among us!"',
    },
    {
      title: "✔️ Protecting Terrestrial Wildlife and Flora",
      img: odd15,
      desc: '🌱🌍🌱 : "Deforestation and paper waste are over!"',
    },
  ];


  // Filtrer les sections à afficher en fonction du nombre visible
  const displayedSections = oddSections.slice(0, visibleSections);

  return (
    <>
      <img
        src={odds}
        alt="ODD"
        style={{
          width: "40px",
          height: "40px",
          marginTop: "5px",
          marginLeft: "5px",
        }}
        onClick={handleShow}
      />

      <Modal show={show} onHide={handleClose} centered animation>
        <Modal.Header style={{ backgroundColor: "#f5f5f5" }}>
          <Modal.Title>Sustainable Development Goals (SDG)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {displayedSections.map((section, index) => (
            <div key={index}>
              <h1 className="text-center">{section.title}</h1>
              <div className="row">
                <img
                  src={section.img}
                  alt={section.title}
                  style={{ width: "70px", height: "70px" }}
                />
                <p className="col-10">{section.desc}</p>
              </div>
              {index < displayedSections.length - 1 && <hr />}{" "}
              {/* Ligne de séparation entre sections */}
            </div>
          ))}
          {visibleSections < oddSections.length && ( 
            <div className="text-center">
              <Button variant="link" onClick={handleViewMore}>
                View More
              </Button>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ODDSocialSkillPopup;
