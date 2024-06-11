import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../../../../context/userContext";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; // Assurez-vous d'importer axios correctement
import Form from 'react-bootstrap/Form'; // Import Form de react-bootstrap

export default function UpdateSujet() {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    activity: '',
  });
  const [activities, setActivities] = useState([]); // Ajouter un état pour les activités

  useEffect(() => {
      axios
          .get('/forum/activites') // Assurez-vous que l'URL est correcte
          .then((response) => {
              setActivities(response.data); // Assurez-vous que la réponse est correctement analysée
          })
          .catch((error) => {
              console.error('Erreur lors de la récupération des activités:', error);
          });
  }, []); // Cette fonction useEffect sera exécutée une seule fois après le premier rendu

  useEffect(() => {
    async function fetchSujet() {
      try {
        const response = await axios.get(`/forum/getbyid/${id}`);
        const sujetData = response.data;
        setFormData({
          title: sujetData.title,
          content: sujetData.content,
          activity: sujetData.activity._id // Assurez-vous que c'est bien l'ID de l'activité
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des données du sujet:', error);
      }
    }

    // Assurez-vous que fetchActivities est correctement défini
    async function fetchActivities() {
      try {
        const response = await axios.get('/forum/activites');
        setActivities(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des activités:', error);
      }
    }
    
    fetchSujet();
    fetchActivities();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/forum/update/${id}`, formData);
      navigate('/forum'); // Redirigez vers la liste des forums après la mise à jour
    } catch (error) {
      console.error('Erreur lors de la mise à jour du sujet:', error);
    }
  };

  return (
    <div className="col-12" style={{ alignContent: "center" }}>
      <div className="acc-setting">
        <h3>Update post</h3>
        <form onSubmit={handleSubmit}>
          <div className="cp-field">
            <h5>Title Sujet</h5>
            <div className="cpp-fiel">
              <input
                type="text"
                id="title"
                placeholder="Title Post"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="cp-field">
            <h5>Description</h5>
            <textarea
              id="content"
              name="content"
              value={formData.contenu}
              onChange={handleChange}
            />
          </div>

          <div className="cp-field">
            <h5>Activity:</h5>
            <Form.Select
              aria-label="Default select example"
              id="activity"
              name="activity"
              value={formData.activity}
              onChange={handleChange}
            >
              <option value="">-- Select an activity --</option>
              {activities && activities.map((activity) => (
                <option key={activity._id} value={activity._id}>{activity.name}</option>
              ))}
            </Form.Select>
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
