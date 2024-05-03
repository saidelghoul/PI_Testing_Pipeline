import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function UpdatePubGroups() {
  const { postId,groupId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    contenu: '',
  });

  useEffect(() => {
        async function fetchGroup() {
            try {
              const response = await axios.get(`/pubGroupe/getById/${postId}`);
              const groupData = response.data;
              setFormData({
                contenu: groupData.Contenue,
              });
            } catch (error) {
              console.error('Erreur lors de la récupération des données de la page:', error);
            }
    }
    fetchGroup();
  }, [postId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/pubGroupe/update/${postId}`, formData);
      alert('La pub a été modifiée avec succès');
      navigate('/groupes');
    } catch (error) {
      console.error('Erreur lors de la modification de la page :', error);
      alert('Erreur lors de la modification de la page.');
    }
  };

  return (
    <>
      <div className="col-12" style={{ alignContent: "center" }}>
        <div className="acc-setting">
          <h3>Création d'une publication</h3>
          <form onSubmit={handleSubmit}>
            <div className="cp-field">
              <h5>Contenu</h5>
              <textarea
                id="Contenue"
                name="contenu"
                value={formData.contenu}
                onChange={handleChange}
              />
            </div>
            <div className="save-stngs pd3">
              <ul>
                <li>
                  <button type="submit">Save</button>
                </li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
