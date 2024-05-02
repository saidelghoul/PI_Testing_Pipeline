import { Link } from "react-router-dom";
import { UserContext } from "../../../../../context/userContext";
import { useContext, useEffect, useState } from "react";

export default function CreatPost() {
  const { user } = useContext(UserContext);
  console.log(user);

  // Ajoutez un état pour indiquer si les données sont chargées
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Supposons que l'utilisateur soit chargé par défaut ou avec un léger retard
    if (user) {
      setIsLoading(false); // Les données sont chargées, désactivez le chargement
    }
  }, [user]); // Surveillez les changements dans les données utilisateur

  const imageUrl = (usrId, usr) => {
    if (usrId && usr?.profileImage) {
      return `http://localhost:8000/user/${usrId}/profile`;
    } else {
      return "/assets/images/resources/user-pro-img.png";
    }
  };

  if (isLoading) {
    // Si nous sommes encore en train de charger, affichez un indicateur de chargement
    return <div>Chargement...</div>;
  }

  return (
    <div className="post-topbar d-flex flex-row">
      <div className="user-picy col-6" >
        <img
          src={imageUrl(user.id, user)}
          alt={user.name}
          style={{ width: '55px', height: '55px', borderRadius: '50%' }}
        />
        <span className="h4">{user.name}</span>
      </div>
      <div className="post-st col-6">
        <ul>
          <li>
            <Link className="post_project" to="/addEvent" title="">
              Add Event
            </Link>
          </li>
          <li>
            <Link className="post" to="/addPub" title="">
              Add Post
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
