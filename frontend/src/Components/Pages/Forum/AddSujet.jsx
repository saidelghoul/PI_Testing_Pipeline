import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'; // N'oubliez pas d'importer axios
import Form from 'react-bootstrap/Form';
import { UserContext } from "../../../../context/userContext";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

export default function AddSujet() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false); // Ajoutez un état de chargement

    const [sujetData, setSujetData] = useState({
        title: '',
        content: '',
        activity: '',
        Creator: user.id
    });

    const [activities, setActivities] = useState([]);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSujetData({ ...sujetData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true); // Début du chargement

        axios
            .post('/forum/add', sujetData)
            .then((response) => {
                console.log('Sujet ajouté avec succès:', response.data);
                // Réinitialisez les champs après la soumission si nécessaire
                setSujetData({
                    title: '',
                    content: '',
                    activity: ''
                });
                alert("La page a été ajoutée avec succès !");
                navigate("/forum");
            })
            .catch((error) => {
                console.error('Erreur lors de l\'ajout du sujet:', error);
            })
            .finally(() => {
                setIsLoading(false); // Fin du chargement
            });
    };

    return (
        <div className="col-12" style={{ alignContent: "center" }}>
            <div className="acc-setting">
                <h3>New post</h3>
                <form onSubmit={handleSubmit}>
                    <div className="cp-field">
                        <h5>Title Sujet</h5>
                        <div className="cpp-fiel">
                            <input
                                type="text"
                                id="title"
                                placeholder="Title Post"
                                name="title"
                                value={sujetData.title}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="cp-field">
                        <h5>Description</h5>
                        <textarea
                            id="content"
                            name="content"
                            value={sujetData.content}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="cp-field">
                        <h5>Activity:</h5>
                        <Form.Select aria-label="Default select example"
                            id="activity"
                            name="activity"
                            value={sujetData.activity}
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
                                <button type="submit">Ajouter</button>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
        </div>
    );
}
