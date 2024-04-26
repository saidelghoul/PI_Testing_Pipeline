import { UserContext } from '../../../../context/userContext';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment'; // Importer moment.js
import { Button } from 'react-bootstrap';

export default function ListNotification() {
  const { user } = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);
  const [id, setId] = useState(null);
  const params = useParams();

  useEffect(() => {
    setId(params.id); // Mettre à jour l'état de l'ID du paramètre
    // Récupérer les notifications lorsque le composant est monté
    axios.get(`/notifications/getalls/${params.id}`, { params: { userId: user.id } })
      .then(response => {
        setNotifications(response.data.notifications);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des notifications :", error);
      });
  }, [params.id, user.id]); // Mettre à jour l'effet lorsque l'ID du paramètre ou l'ID de l'utilisateur change

  const toggleUserActivation = async (notifId, isAccept) => {
    try {
      await axios.put(`/notifications/${isAccept ? 'update' : 'reject'}/${notifId}`);
      // Mettre à jour les notifications après l'activation ou la désactivation de l'utilisateur
      setNotifications(prevNotifications => prevNotifications.filter(notification => notification._id !== notifId));
    } catch (error) {
      console.error("Erreur lors du basculement de l'activation de l'utilisateur :", error);
    }
  };
  
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

                  <Button onClick={()=>toggleUserActivation(notification._id,true)}>Accepter</Button>
                  {" "}
                  <Button onClick={()=>toggleUserActivation(notification._id,false)}>Refuser</Button>
                               
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
