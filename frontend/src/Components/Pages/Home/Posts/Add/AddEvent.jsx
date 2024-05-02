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
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.type === "file") {
      // For file input, update the state with the selected file
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0], // Get the first file if multiple files are selected
      });
    } else {
      // For other inputs, update the state with the input value
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithUser = new FormData(); // Create a FormData object to send form data including files
      for (const key in formData) {
        formDataWithUser.append(key, formData[key]);
      }
      formDataWithUser.append("creator", user.id); // Append user ID to form data

      // Send form data with image file to server for adding the event
      await axios.post("/evenemnt/add", formDataWithUser, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type as multipart/form-data for file upload
        },
      });

      setFormData({
        titre: "",
        contenu: "",
        datedeb: "",
        datefin: "",
        cap: "",
        prix: "",
        image: null,
      });
      alert("Event creatad succefuly");
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
          <h3>Create your event</h3>
          <form onSubmit={handleSubmit}>
            <div className="cp-field">
              <h5>Title</h5>
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
              <h5>Content</h5>
              <textarea
                id="description"
                name="contenu"
                value={formData.contenu}
                onChange={handleChange}
              />
            </div>
            <div className="cp-field">
              <h5>Start Date </h5>
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
              <h5>Finish Date</h5>
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
              <h5>Places Available</h5>
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
              <h5>Price</h5>
              <input
                type="number"
                name="prix"
                placeholder="Prix"
                value={formData.prix}
                onChange={handleChange}
              />
            </div>
            <div className="cp-field">
              <h5>Image</h5>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*" // Accept only image files
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
