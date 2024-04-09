import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Sujet: '', // Renommé de sujet à Sujet
    Contenue: '', // Renommé de contenu à Contenue
  });

  useEffect(() => {
    async function fetchPublication() {
      try {
        const response = await axios.get(`/publications/getbyid/${id}`);
        const pubData = response.data;
        setFormData({
          Sujet: pubData.Sujet,
          Contenue: pubData.Contenue,
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des données de la publication:', error);
      }
    }
    fetchPublication();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/publications/update/${id}`, formData);
      alert('La publication a été modifiée avec succès');
      navigate('/home');
    } catch (error) {
      console.error('Erreur lors de la modification de la publication :', error);
      alert('Erreur lors de la modification de la publication.');
    }
  };

  return (
    <>
      <div className="col-12" style={{ alignContent: 'center' }}>
        <div className="acc-setting">
          <h3>Modification d'une publication</h3>
          <form onSubmit={handleSubmit}>
            <div className="cp-field">
              <h5>Sujet</h5>
              <div className="cpp-fiel">
                <input type="text" id="Sujet" placeholder="Sujet" name="Sujet" value={formData.Sujet} onChange={handleChange} />
              </div>
            </div>
            <div className="cp-field">
              <h5>Contenu</h5>
              <textarea id="Contenue" name="Contenue" value={formData.Contenue} onChange={handleChange} />
            </div>
            <div className="save-stngs pd3">
              <ul>
                <li><button type="submit">Modifier</button></li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
