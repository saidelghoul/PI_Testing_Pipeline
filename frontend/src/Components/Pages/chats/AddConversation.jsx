import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../../context/userContext";

export default function AddConversation() {
  const [users, setUsers] = useState([]);
  const [clickedUserId, setClickedUserId] = useState(null); // Ajout de l'état pour clickedUserId
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/messages/users");
        setUsers(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs : ",
          error
        );
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = async (id, name) => {
    setClickedUserId(id); // Mise à jour de l'état clickedUserId
    try {
      const response = await axios.post("/messages/add", {
        members: [user.id, id],
        name: name, // Utilisateur connecté et utilisateur cliqué
        creator: user.id, // Utilisateur connecté comme créateur de la conversation
      });

      console.log("Conversation créée avec succès : ", response.data);
      navigate("/message");
    } catch (error) {
      console.error("Erreur lors de la création de la conversation : ", error);
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error ===
          "Une conversation entre ces utilisateurs existe déjà"
      ) {
        alert("Une conversation entre ces utilisateurs existe déjà.");
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
