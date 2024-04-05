import { UserContext } from '../../../../context/userContext';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment'; // Importer moment.js

export default function ListNotification() {
  const { user } = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);
const {id}=useParams();
  useEffect(() => {
    // Récupérer les notifications lorsque le composant est monté
    axios.get(`/notifications/getalls/${id}`, { userId: user.id })
      .then(response => {
        setNotifications(response.data.notifications);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des notifications :", error);
      });
  }, [id]); // Passer un tableau vide pour exécuter l'effet une fois au montage du composant

  return (
    <div className="col-lg-12">
      <div className="acc-setting">
        <h3>Notifications</h3>
        <div className="notifications-list">
          {notifications.map(notification => (
            <div className="notfication-details" key={notification._id}>
              <div className="noty-user-img">
                <img src="/assets/images/resources/ny-img1.png" alt="" />
              </div>
              <div className="notification-info">
                <h3>
                  <a href="#" title="">
                    {notification.details.name} {/* Remplacer par le nom de l'utilisateur si disponible */}
                  </a>{" "}
                  {notification.type === 'demande_participation' ? `a demandé à participer à votre groupe ${notification.groupId.nomgroups}. `: ''}
                </h3>
                <span>{moment(notification.createdAt).fromNow()} {/* Afficher le temps de création dans un format relatif */}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
