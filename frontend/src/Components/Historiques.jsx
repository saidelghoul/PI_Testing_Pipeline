import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Importer useParams depuis react-router-dom
import axios from 'axios';
import moment from 'moment'; // Assurez-vous que Moment.js est correctement importé

export default function Historiques() {
    const [historiques, setHistoriques] = useState([]);
    const { id } = useParams(); // Utiliser useParams pour récupérer l'ID du créateur à partir de l'URL

    useEffect(() => {
        const fetchHistoriques = async () => {
            try {
                const response = await axios.get(`/notifications/historiques/creator/${id}`);
                setHistoriques(response.data.historiques);
            } catch (error) {
                console.error("Erreur lors de la récupération des historiques :", error);
            }
        };
        fetchHistoriques();
    }, [id]); // Utiliser l'ID dans le tableau de dépendances de useEffect

    return (
        <div className="col-lg-12">
            <div className="acc-setting">
                <h3>Votre Historiques</h3>
                <div className="notifications-list">
                    {historiques.map(historique => (
                        <div className="notfication-details" key={historique._id}>
                            <div className="noty-user-img">
                                <img src="/assets/images/resources/ny-img1.png" alt="" />
                            </div>
                            <div className="notification-info">
                                <h3>
                                    <a href="#" title=""> 
                                        <p>vous avez {historique.action} la demande de participation du {" "}
                                         {historique.notification.details.name} au groupe {historique.notification.groupId.nomgroups}
</p>
                                    </a>{" "}
                                </h3>
                                <span>{moment(historique.date).fromNow()} {/* Afficher le temps de création dans un format relatif */}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
