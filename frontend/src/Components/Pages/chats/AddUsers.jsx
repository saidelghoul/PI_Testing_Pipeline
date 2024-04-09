import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importez useParams pour récupérer les paramètres d'URL et useNavigate pour la navigation
import axios from "axios";

export default function AddUsers() {
  const { conversationId } = useParams(); // Récupérez l'ID de la conversation depuis l'URL
  const [users, setUsers] = useState([]);
  const [clickedUserId, setClickedUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`/messages/users`); // Utilisez l'ID de la conversation dans l'URL pour récupérer les utilisateurs
        setUsers(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs : ",
          error
        );
      }
    };

    fetchUsers();
  }, [conversationId]);
  const handleUserClick = async (userId, userName) => {
    setClickedUserId(userId);
    try {
      // Envoyer une requête pour mettre à jour la conversation avec l'utilisateur cliqué
      await axios.put(`/messages/updateMembres/${conversationId}`, {
        newMemberId: userId,
      });
      // Rediriger vers la page de modification de la conversation
      navigate(`/message`);
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de la conversation : ",
        error
      );
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error ===
          "L'utilisateur que vous essayez d'ajouter est déjà membre de cette conversation"
      ) {
        alert(
          "L'utilisateur que vous essayez d'ajouter est déjà membre de cette conversation."
        );
      }
    }
  };

  return (
    <div className="suggestions full-width">
      <div className="sd-title">
        <h3>Liste des Amis</h3>
        <i className="la la-ellipsis-v"></i>
      </div>
      <div className="suggestions-list">
        {users.map((userItem) => (
          <div
            className="suggestion-usd"
            key={userItem._id}
            onClick={() => handleUserClick(userItem._id, userItem.name)}
          >
            <img src="/assets/images/resources/s1.png" alt="" />
            <div className="sgt-text">
              <h4>{userItem.name}</h4>
              <span>{userItem.role}</span>
            </div>
            <span>
              <i className="fa fa-envelope"></i>
            </span>
          </div>
        ))}
      </div>
      <div className="view-more">
        <a href="#" title="">
          View More
        </a>
      </div>
    </div>
  );
}
