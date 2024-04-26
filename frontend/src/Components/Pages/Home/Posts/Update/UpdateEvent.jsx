import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Titre: "",
    Contenu: "",
    DateDebut: "",
    DateFin: "",
    Capacite: "",
    Prix: "",
  });

  useEffect(() => {
    async function fetchEvenement() {
      try {
        const response = await axios.get(`/evenemnt/getbyid/${id}`);
        const eventData = response.data;
        setFormData({
          Titre: eventData.Titre,
          Contenu: eventData.Contenu,
          DateDebut: formatDateString(eventData.DateDebut),
          DateFin: formatDateString(eventData.DateFin),
          Capacite: eventData.Capacite,
          Prix: eventData.Prix,
        });
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'événement:",
          error
        );
      }
    }
    fetchEvenement();
  }, [id]);
  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; // Format "jour/mois/année"
    // Vous pouvez personnaliser le format de date selon vos besoins
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/evenemnt/update/${id}`, formData);
      alert("L'événement a été modifié avec succès");
      navigate("/home");
    } catch (error) {
      console.error("Erreur lors de la modification de l'événement :", error);
      alert("Erreur lors de la modification de l'événement.");
    }
  };

  return (
    <>
      <div className="col-12" style={{ alignContent: "center" }}>
        <div className="acc-setting">
          <h3>Modifier un Événement</h3>
          <form onSubmit={handleSubmit}>
            <div className="cp-field">
              <h5>Titre</h5>
              <div className="cpp-fiel">
                <input
                  type="text"
                  id="nomgroups"
                  placeholder="Titre"
                  name="Titre"
                  value={formData.Titre}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="cp-field">
              <h5>Contenu</h5>
              <textarea
                id="description"
                name="Contenu"
                value={formData.Contenu}
                onChange={handleChange}
              />
            </div>
            <div className="cp-field">
              <h5>Date Début </h5>
              <input
                type="datetime-local"
                name="DateDebut"
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
                name="DateFin"
                placeholder="Date de fin"
                value={formData.DateFin}
                onChange={handleChange}
                required
              />
            </div>
            <div className="cp-field">
              <h5>Capacité</h5>
              <input
                type="number"
                name="Capacite"
                placeholder="Capacité"
                value={formData.Capacite}
                onChange={handleChange}
                required
              />
            </div>
            <div className="cp-field">
              <h5>Prix</h5>
              <input
                type="number"
                name="Prix"
                placeholder="Prix"
                value={formData.Prix}
                onChange={handleChange}
                required
              />
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
    </>
  );
}
