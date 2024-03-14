import React from 'react';
import { Modal, Button } from 'react-bootstrap'; // Assurez-vous d'importer les composants nécessaires

function SkillModal({ skill, show, handleClose, handleRemove}) {
    console.log(skill);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Social Skill Description</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {skill && (
          <>
          <p>Nom de la compétence: {skill.name}</p>
            <p>Points sociaux: {skill.pointSocial}</p>
            <p>attribué le : {skill.dateAttribution.substr(0,10)}</p>
            {/* Affichez d'autres informations du skill ici */}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button style={{ backgroundColor: "#e44d3a" }} onClick={() => handleClose()}>Fermer</Button>
        
        <Button style={{ backgroundColor: "#e44d3a" }} onClick={() => handleRemove(skill._id)}>Supprimer</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SkillModal;
