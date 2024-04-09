import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function UpdateConversation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    async function fetchConversation() {
      try {
        const response = await axios.get(`/messages/getbyid/${id}`);
        const conversationData = response.data;
        setFormData({
          name: conversationData.name,
        });
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de la page:",
          error
        );
      }
    }
    fetchConversation();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/messages/update/${id}`, formData);
      alert("La conversation a été mise à jour avec succès");
      navigate("/message");
    } catch (error) {
      console.error(
        "Erreur lors de la modification de la conversation :",
        error
      );
      alert("Erreur lors de la modification de la conversation.");
    }
  };

  return (
    <div className="col-12" style={{ alignContent: "center" }}>
      <div className="acc-setting">
        <h3>Modification d'une Conversation</h3>
        <form onSubmit={handleSubmit}>
          <div className="cp-field">
            <h5>Nom de la Conversation</h5>
            <div className="cpp-fiel">
              <input
                type="text"
                id="name"
                placeholder="Nom de la conversation"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="save-stngs pd3">
            <ul>
              <li>
                <button type="submit">Modifier</button>
              </li>
            </ul>
          </div>{" "}
        </form>
      </div>
    </div>
  );
}
