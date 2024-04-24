import { useContext, useState } from "react";
import { UserContext } from "../../../../../../context/userContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function AddEvent() {
  const { user } = useContext(UserContext); // Obtenez les données de l'utilisateur depuis le contexte
  const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation

  const [formData, setFormData] = useState({
    titre: "",
    contenu: "",
    datedeb: "",
    datefin: "",
    cap: "",
    prix: "",
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
      await axios.post("/evenemnt/add", publicationData);

      setFormData({
        titre: "",
        contenu: "",
        datedeb: "",
        datefin: "",
        cap: "",
        prix: "",
      });
      alert("Evenement ajoutée avec succès");
      navigate("/home");
    } catch (error) {
      console.error(
        "Erreur lors de la configuration de la requête :",
        error.message
      );
      if (error.response && error.response.data && error.response.data.error) {
        alert("Warning : " + error.response.data.error);
      } else {
        alert(
          "Erreur lors de la configuration de la requête : " + error.message
        );
      }
    }
  };
  return (
    <>
      <div className="col-12" style={{ alignContent: "center" }}>
        <div className="acc-setting">
          <h3>Création un Evenement</h3>
          <form onSubmit={handleSubmit}>
            <div className="cp-field">
              <h5>Titre</h5>
              <div className="cpp-fiel">
                <input
                  type="text"
                  id="nomgroups"
                  placeholder="Titre"
                  name="titre"
                  value={formData.titre}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="cp-field">
              <h5>Contenu</h5>
              <textarea
                id="description"
                name="contenu"
                value={formData.contenu}
                onChange={handleChange}
              />
            </div>
            <div className="cp-field">
              <h5>Date Début </h5>
              <input
                type="datetime-local"
                name="datedeb"
                placeholder="Date de début"
                value={formData.DateDebut}
                onChange={handleChange}
                required
              />
            </div>
            <div className="cp-field">
              <h5>Date Fin</h5>
              <input
                type="datetime-local"
                name="datefin"
                placeholder="Date de début"
                value={formData.DateDebut}
                onChange={handleChange}
                required
              />
            </div>
            <div className="cp-field">
              <h5>Capacité</h5>
              <input
                type="number"
                name="cap"
                placeholder="Capacité"
                value={formData.cap}
                onChange={handleChange}
                required
              />
            </div>
            <div className="cp-field">
              <h5>Prix</h5>
              <input
                type="number"
                name="prix"
                placeholder="Prix"
                value={formData.prix}
                onChange={handleChange}
                required
              />
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
    </>
  );
}
