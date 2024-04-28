import { useContext, useState } from "react";
import { UserContext } from "../../../../../../context/userContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddPub() {
  const { user } = useContext(UserContext); // Obtenez les données de l'utilisateur depuis le contexte
  const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation

  const [formData, setFormData] = useState({
    sujet: "",
    contenu: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const publicationData = {
        ...formData,
        creator: user.id, // Utilisez l'ID de l'utilisateur connecté
      };

      // Envoyez les données au serveur pour ajouter la publication
      await axios.post("/publications/add", publicationData);

      setFormData({
        sujet: "",
        contenu: "",
      });
      alert("Publication ajoutée avec succès");
      navigate("/home");
    } catch (error) {
      // Une erreur s'est produite lors de la configuration de la requête
      console.error(
        "Erreur lors de la configuration de la requête :",
        error.message
      );
      alert("Erreur lors de la configuration de la requête :", error.message);
    }
  };

  return (
    <>
      <div className="col-12" style={{ alignContent: "center" }}>
        <div className="acc-setting">
          <h3>Create a new Post</h3>
          <form onSubmit={handleSubmit}>
            <div className="cp-field">
              <h5>Subject</h5>
              <div className="cpp-fiel">
                <input
                  type="text"
                  id="Sujet"
                  placeholder="Sujet"
                  name="sujet"
                  value={formData.sujet}
                  onChange={handleChange}
                  required
                />{" "}
              </div>
            </div>
            <div className="cp-field">
              <h5>Content</h5>
              <textarea
                id="Contenue"
                name="contenu"
                value={formData.contenu}
                onChange={handleChange}
                required
              />
            </div>
            <div className="save-stngs pd3">
              <ul>
                <li>
                  <button type="submit">Create</button>
                </li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
