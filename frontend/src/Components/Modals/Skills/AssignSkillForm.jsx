import { Button, Col, Row, Form, Modal } from "react-bootstrap";
import { useContext, useEffect, useState } from 'react';
import SocialSkillService from "../../../services/socialSkill-service";

import { UserContext } from "../../../../context/userContext"

const AssignSkillForm = ({show, handleClose }) => {

    const [validated, setValidated] = useState(false);

    const id = "65df6f7a904814fc0404a57a"
  
    const [socialSkillItem, setSocialSkillItem] = useState([]);
  
    const onValueChange = (e) => {
      setSocialSkillItem([...socialSkillItem,e.target.value]);
    };
  
    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      handleAddSocialSkill();
    };
  
    const handleAddSocialSkill = async () => {
      const result = await SocialSkillService.assignSocialSkillToUser(id,socialSkillItem);
      if (result.status === 200) {
        alert("SocialSkill added successfully");
        handleClose();
      }
    };
  

    const [skills,setSkills] = useState([])

    useEffect(() => {

      const fetchSkills = async() => {
        const result = await SocialSkillService.getAvailableSocialSkills(id);
        setSkills(result);
      }

      fetchSkills();
    },[]);
  
    return (
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Row>
            <Modal.Title as={Col}>
              <h1>Add socialSkill</h1>
            </Modal.Title>
            <Button
              as={Col}
              md="3"
              variant="secondary"
              onClick={handleClose}
              style={{
                backgroundColor: "#fff",
                color: "#e44d3a",
                cursor: "pointer",
              }}
            >
              Close
            </Button>
          </Row>
        </Modal.Header>
  
        <Modal.Body>
          <Form
            className=" container-fluid p-4  "
            noValidate
            validated={validated}
          >
            <Row className="mb-3">

    <p>Choisissez la liste des compétences qui vous caractérise le mieux !</p>
    <select className="browser-default custom-select" onChange={(e)=>onValueChange(e)} name="socialSkill">
  {skills.map((sk, index) => (
    <option key={index} value={sk._id}>{sk.name}</option>
  ))}
  </select>

            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className={validated ? "disabled" : ""}
            style={{ backgroundColor: "#e44d3a" }}
            onClick={handleSubmit}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };


export default AssignSkillForm
