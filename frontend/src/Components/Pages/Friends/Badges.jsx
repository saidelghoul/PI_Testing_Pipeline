import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../../context/userContext";

export default function Badges() {
    const { user } = useContext(UserContext);
    const [badges, setBadges] = useState([]);

    useEffect(() => {
        const fetchBadges = async () => {
            try {
                const response = await axios.get(`/badges/${user.id}/badges`);
                setBadges(response.data);
            } catch (error) {
                console.error('Error fetching badges:', error);
            }
        };

        if (user) {
            fetchBadges();
        }
    }, [user]);

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
<div >
    <br/>
           <span style={{ display: 'flex', justifyContent: 'center' }}>My Badges</span>
            <br/>
            <ul style={{ marginLeft: '2.4%'}} >
                {badges.map((badge, index) => (
                    <li key={index} className="badge-item">
                        <img src={getBadgeImage(badge)} alt={badge} />
                    </li>
                    
                ))}
              
            </ul>
        </div>
</>
    );
}