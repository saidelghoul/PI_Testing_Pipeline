import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../../context/userContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
export default function AddPage() {
  const { user } = useContext(UserContext);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation

  const [formData, setFormData] = useState({
    nomgroups: "",
    description: "",
    creator: user.id,
    visibilite: false,
  });

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handlechangeFile = (e) => {
    const file = e.target.files[0];
    if (file && e.target.name === "profileImage") {
      setProfileImage(file);
    } else if (file && e.target.name === "coverImage") {
      setCoverImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("nomgroups", formData.nomgroups);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("visibilite", formData.visibilite);
      formDataToSend.append("creator", formData.creator);
      if (profileImage) {
        formDataToSend.append("profileImage", profileImage);
      }
      if (coverImage) {
        formDataToSend.append("coverImage", coverImage);
      }

      await axios.post("/groups/add", formDataToSend);
      setFormData({
        nomgroups: "",
        description: "",
        creator: user.id,
        visibilite: false,
      });
      setProfileImage(null);
      setCoverImage(null);

      alert("La page a été ajoutée avec succès !");
      navigate("/groupes");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la page:", error);
      alert("Une erreur s'est produite lors de l'ajout de la page.");
    }
  };

  return (
    <div className="col-12" style={{ alignContent: "center" }}>
      <div className="acc-setting">
        <h3>Création d'une Page</h3>
        <form onSubmit={handleSubmit}>
          <div className="cp-field">
            <h5>Nom de la Page</h5>
            <div className="cpp-fiel">
              <input
                type="text"
                id="nomgroups"
                placeholder="Nom de la page"
                name="nomgroups"
                value={formData.nomgroups}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="cp-field">
            <h5>Description</h5>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="cp-field">
            <h5>Visibilité:</h5>
            <input
              type="checkbox"
              id="visibilite"
              name="visibilite"
              checked={formData.visibilite}
              onChange={handleChange}
            />
          </div>
          <div className="cp-field">
            <h5>Image de Profile:</h5>
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Control
                type="file"
                multiple
                name="profileImage"
                onChange={handlechangeFile}
                required
              />
            </Form.Group>
          </div>
          <div className="cp-field">
            <h5>Image de couverture:</h5>
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Control
                type="file"
                multiple
                name="coverImage"
                onChange={handlechangeFile}
                required
              />
            </Form.Group>
          </div>

          <div className="save-stngs pd3">
            <ul>
              <li>
                <button type="submit">Ajouter</button>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
}
