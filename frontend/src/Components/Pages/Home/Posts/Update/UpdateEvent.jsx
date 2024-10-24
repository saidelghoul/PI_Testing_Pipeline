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
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { DateDebut, DateFin } = formData;

    if (new Date(DateDebut) >= new Date(DateFin)) {
      alert("La date de début doit être avant la date de fin.");
      return;
    }
    const today = new Date();
    if (new Date(DateDebut) <= today) {
      alert("La date de début doit être ultérieure à aujourd'hui.");
      return;
    }

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
    <div className="col-12" style={{ alignContent: "center" }}>
      <div className="acc-setting">
        <h3>Update your Event</h3>
        <form onSubmit={handleSubmit}>
          <div className="cp-field">
            <h5>Title</h5>
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
            <h5>Content</h5>
            <textarea
              id="description"
              name="Contenu"
              value={formData.Contenu}
              onChange={handleChange}
            />
          </div>
          <div className="cp-field">
            <h5>Start Date </h5>
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
            <h5> Finish Date </h5>
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
            <h5>Capacite</h5>
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
            <h5>Price</h5>
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
                <button type="submit">Update</button>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
}
