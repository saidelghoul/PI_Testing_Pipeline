import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Importer useParams depuis react-router-dom
import axios from 'axios';
import moment from 'moment'; // Assurez-vous que Moment.js est correctement importé
import Spinner from 'react-bootstrap/Spinner'; // Pour l'indicateur de chargement

export default function Historiques() {
    const [historiques, setHistoriques] = useState([]);
    const { id } = useParams(); // Utiliser useParams pour récupérer l'ID du créateur à partir de l'URL
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHistoriques = async () => {
            try {
                const response = await axios.get(`/notifications/historiques/creator/${id}`);
                setHistoriques(response.data.historiques);
                console.log("ICI",response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des historiques :", error);
            }finally{
                setIsLoading(false);
            }
        };
        fetchHistoriques();
    }, [id]); // Utiliser l'ID dans le tableau de dépendances de useEffect

    if (isLoading) {
        // Afficher un indicateur de chargement pendant le chargement
        return (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Chargement...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <div className="col-lg-12">
            <div className="acc-setting">
                <h3>Votre Historique</h3>
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
                                        {historique.notification.details.name} dans votre groupe{/*   {historique.notification.groupId.nomgroups} */}
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
