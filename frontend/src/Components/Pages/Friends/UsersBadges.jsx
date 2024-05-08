import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../../context/userContext";
import { useParams } from "react-router-dom";
export default function Badges() {
    const { user } = useContext(UserContext);
    const [badges, setBadges] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        const fetchBadges = async () => {
            try {
                const response = await axios.get(`/badges/${id}/badges`);
                setBadges(response.data);
            } catch (error) {
                console.error('Error fetching badges:', error);
            }
        };

        if (id) {
            fetchBadges();
        }
    }, [user,id]);

    const getBadgeImage = (badge) => {
        switch (badge) {
            case 'New Member':
                return '/assets/images/badges/new member.png';
            case 'Profil Completed':
                return '/assets/images/badges/profile.png';
            case 'advanced':
                return '/assets/images/badges/advanced.png'
            default:
                return '/assets/images/badges/new member.png'; 
        }
    };

    
    return (
<>
            <div>
                <br/>
                <span style={{ display: 'flex', justifyContent: 'center' }}>My Badges</span>
                <br/>
                <ul style={{ marginLeft: '2.4%'}} >
                    {badges.length > 0 ? (
                        badges.map((badge, index) => (
                            <li key={index} className="badge-item">
                                <img src={getBadgeImage(badge)} alt={badge} />
                            </li>
                        ))
                    ) : (
                        <li className="badge-item">
                            <img src="/assets/images/badges/new member.png" alt="No badges" />
                        </li>
                    )}
                </ul>
            </div>
        </>
    );
}