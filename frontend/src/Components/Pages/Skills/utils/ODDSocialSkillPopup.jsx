import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import odd4 from '../../../../../public/assets/images/ODD/4_EducationQuality.jpg';
import odd5 from '../../../../../public/assets/images/ODD/5_EgaliteSexes.jpg';
import odd8 from '../../../../../public/assets/images/ODD/8_EmploiesDecent.jpg';
import odd10 from '../../../../../public/assets/images/ODD/10_ReductionInegalites.jpg';
import odd15 from '../../../../../public/assets/images/ODD/15_Faune_Flore_Terrestre.jpg';
import odds from '../../../../../public/assets/images/ODD/ODDs.png';

function ODDSocialSkillPopup() {
  const [show, setShow] = useState(false);
  const [visibleSections, setVisibleSections] = useState(2); // Nombre de sections à afficher au début

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleViewMore = () => setVisibleSections(visibleSections + 2); // Augmente le nombre de sections visibles

  // Liste des ODD à afficher
  const oddSections = [
    {
      title: "✔️ Accès à une éducation de qualité",
      img: odd4,
      desc: "👨🏻‍🎓 : \"Grâce à cette application, nous favorisons un accès équitable à travers une éducation de qualité pour tous. Venez apprendre les bonnes pratiques en travaillant dans des activités/projets en groupe !\"",
    },
    {
      title: "✔️ Egalité entre les sexes",
      img: odd5,
      desc: "👩 : \"Pas de discrimination ni de sexisme. Tous vos investissements et votre travail sont promus grâce à l'intelligence du système.\" 🧑 : \"Génial, sympa et honnête !!\"",
    },
    {
      title: "✔️ Accès à des emplois décents",
      img: odd8,
      desc: "🧑🏻‍💻 : \"Grâce à notre application, nous vous assurons un emploi décent et une croissance économique durable qui seront récompensés par votre dur labeur!\"",
    },
    {
      title: "✔️ Réduction des inégalités",
      img: odd10,
      desc: "🧑🏿🤝🏼🧑🏼 : \"Dans notre application, vous pouvez oublier le racisme et toute autre forme d'inégalité au sein du pays et entre nous!\"",
    },
    {
      title: "✔️ Protection de la faune et de la flore terrestre",
      img: odd15,
      desc: "🌱🌍🌱 : \"La déforestation et le gaspillage de papier, c'est terminé!\"",
    },
  ];

  // Filtrer les sections à afficher en fonction du nombre visible
  const displayedSections = oddSections.slice(0, visibleSections);

  return (
    <>
      <img src={odds} alt="ODD" style={{ width: '40px', height: '40px' }} onClick={handleShow} />

      <Modal show={show} onHide={handleClose} centered animation>
        <Modal.Header closeButton style={{ backgroundColor: '#f5f5f5' }}>
          <Modal.Title>Objectifs de Développement Durable (ODD)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {displayedSections.map((section, index) => (
            <div key={index}>
              <h1 className="text-center">{section.title}</h1>
              <div className='row'>
                <img src={section.img} alt={section.title} style={{ width: '70px', height: '70px' }} />
                <p className='col-10'>{section.desc}</p>
              </div>
              {index < displayedSections.length - 1 && <hr />} {/* Ligne de séparation entre sections */}
            </div>
          ))}
          {visibleSections < oddSections.length && ( // Afficher le bouton "Voir plus" si des sections supplémentaires existent
            <div className="text-center">
              <Button variant="link" onClick={handleViewMore}>
                Voir plus
              </Button>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Fermer</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ODDSocialSkillPopup;
