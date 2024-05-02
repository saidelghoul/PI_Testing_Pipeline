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
      await axios.post("/publications/add", formDataWithUser, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type as multipart/form-data for file upload
        },
      });
      setFormData({
        sujet: "",
        contenu: "",
        image: null,
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
