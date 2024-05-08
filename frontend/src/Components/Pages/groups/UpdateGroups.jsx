import React, { useState, useEffect } from "react";
import axios from "axios"; // Assurez-vous d'importer axios correctement
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

export default function UpdateGroups() {
  const { id } = useParams();
  const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation

  const [formData, setFormData] = useState({
    nomgroups: "",
    description: "",
    visibilite: false,
    profileImage: null,
    coverImage: null,
  });

  useEffect(() => {
    async function fetchGroup() {
      try {
        const response = await axios.get(`/groups/getbyid/${id}`);
        const groupData = response.data;
        setFormData({
          nomgroups: groupData.nomgroups,
          description: groupData.description,
          visibilite: groupData.visibilite,
        });
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de la page:",
          error
        );
      }
    }
    fetchGroup();
  }, [id]);

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handlechangeFile = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      await axios.put(`/groups/update/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data", // Assurez-vous d'envoyer les données avec le bon type de contenu
        },
      });
      alert("La page a été modifiée avec succès");
      navigate("/groupes");
    } catch (error) {
      console.error("Erreur lors de la modification de la page :", error);
      alert("Erreur lors de la modification de la page.");
    }
  };

  return (
    <div className="col-12" style={{ alignContent: "center" }}>
      <div className="acc-setting">
        <h3>Modification d'une Page</h3>
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
            <label htmlFor="visibilite">Visibilité:</label>
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
                name="coverImage"
                onChange={handlechangeFile}
                required
              />
            </Form.Group>
          </div>
          <div className="save-stngs pd3">
            <ul>
              <li>
                <button type="submit">Modifier</button>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
}
