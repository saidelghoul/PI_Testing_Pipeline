import { Button, Col, Row, Form, Card, Dropdown, Alert } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import TechnicalSkillService from "../../../../services/technicalSkill-service";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle, FaTimesCircle } from "react-icons/fa";
import { UserContext } from "../../../../../context/userContext";


const TechnicalSkillAffect = () => {
  const { user } = useContext(UserContext);
  // console.log(user);
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [technologies, setTechnologies] = useState([]);
  const [selectedTechnology, setSelectedTechnology] = useState(null);
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [level, setLevel] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAvailableTechnologies = async () => {
      try {
        const response = await TechnicalSkillService.getAvailableTechnologiesForUser(user.id);
        setTechnologies(response);
      } catch (error) {
        console.error("Erreur lors de la récupération des technologies disponibles:", error.message);
        setError("Erreur lors de la récupération des technologies disponibles");
      }
    };

    fetchAvailableTechnologies();
  }, [user.id]);

  const handleTechnologySelect = (technology) => {
    setSelectedTechnology(technology);
    setYearsOfExperience("");
    setLevel("");
  };

  const handleYearsOfExperienceChange = (value) => {
    setYearsOfExperience(value);
    const level = getLevel(value);
    setLevel(level);
  };

  const getLevel = (yearsOfExperience) => {
    if (yearsOfExperience <= 3) {
      return "Beginner";
    } else if (yearsOfExperience <= 5) {
      return "Intermediate";
    } else if (yearsOfExperience <= 10) {
      return "Advanced";
    } else if (yearsOfExperience <= 15) {
      return "Expert";
    } else {
      setError("Le nombre d'années d'expérience ne peut pas dépasser 15.");
      return "";
    }
  };

  const handleSaveTechnicalSkill = async () => {
    if (!selectedTechnology || !yearsOfExperience || !level) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const data = {
        technology: selectedTechnology._id,
        users: [
          {
            user: user.id,
            niveau: level,
            yearsOfExperience: parseInt(yearsOfExperience),
          },
        ],
      };
      await TechnicalSkillService.addTechnicalSkill(data);
      alert("Compétence technique ajoutée avec succès");
      navigate("/profil/");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la compétence technique :", error.message);
      setError("Erreur lors de l'ajout de la compétence technique : " + error.message);
    }
  };

  return (
    <div className="container">
      {error && <Alert variant="danger">{error}</Alert>}
      <Card className="my-4 p-4">
        <Row className="mb-3">
          <Col>
            <h2 className="text-center h4">Ajouter une compétence technique 🛠️</h2>
            <p className="text-center"></p>
          </Col>
        </Row>

        <Form noValidate validated={validated}>
          <Form.Group controlId="technologySelect">
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                {selectedTechnology
                  ? selectedTechnology.name
                  : "Sélectionnez une technologie"}
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ maxHeight: '100px', overflowY: 'auto', paddingRight: '10px' }}>
                {technologies.map((technology) => (
                  <Dropdown.Item key={technology._id} onClick={() => handleTechnologySelect(technology)}>
                    ➡ {technology.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>

          {selectedTechnology && (
            <>
              <Row className="mt-4">
                <Col>
                  <hr />
                  <h5>Technologie sélectionnée : {selectedTechnology.name}</h5> <br />
                  <Form.Group controlId="yearsOfExperience">
                    <Form.Label>Années d'expérience</Form.Label> <br />
                    <Form.Control
                      type="number"
                      min="0"
                      max="15"
                      value={yearsOfExperience}
                      onChange={(e) => handleYearsOfExperienceChange(e.target.value)}
                      required
                    />
                  </Form.Group>
                  {level && (
                    <div>
                      <Form.Label>Niveau d'expertise</Form.Label>
                      <Form.Control value={level} disabled />
                    </div>
                  )}
                </Col>
              </Row>
            </>
          )}

          <Row className="mt-4">
            <Col className="">
              <Button variant="success" onClick={handleSaveTechnicalSkill}>
                <FaPlusCircle /> Confirmer
              </Button>
              <Button
                style={{ marginLeft: '10px' }}
                variant="danger"
                onClick={() => navigate("/profil/")}
              >
                <FaTimesCircle /> Annuler
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default TechnicalSkillAffect;
