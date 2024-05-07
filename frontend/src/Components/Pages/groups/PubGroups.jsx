import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from "../../../../context/userContext";
import { Link } from "react-router-dom";
import PubActions from './PubActions';
import AddCommentPub from './AddCommentPub';

export default function PubGroups({ groupId }) {
    const [publications, setPublications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);
  const userId = user ? user.id : null;

  //const imageUrl = userId ? `http://localhost:8000/user/${userId}/profile` : "/assets/images/resources/user-pro-img.png";
  const imageUrl = userId && user && user.profileImage 
  ? `http://localhost:8000/user/${userId}/profile` 
  : "/assets/images/resources/user-pro-img.png";
  console.log(imageUrl);
  

  useEffect(() => {
    axios
      .get(`/pubGroupe/getPubId/${groupId}`)
      .then((response) => {
        
        setPublications(response.data);
        setIsLoading(false);

      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des publications:", error);
      });
  }, [groupId]);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`/pubGroupe/remove/${postId}`);
      setPublications(publications.filter((post) => post._id !== postId));
      alert("La page a été supprimée avec succès.");
    } catch (error) {
      console.error("Erreur lors de la suppression de la page :", error);
      alert("Une erreur s'est produite lors de la suppression de la page.");
    }
  };

  return (
    <div className="product-feed-tab current" id="feed-dd">
      <div className="posts-section">
        {publications.map((post) => (
          <div className="post-bar" key={post._id}>
            {/* Affichage de la publication */}
            <div className="post_topbar">
              <div className="usy-dt">
                <img
                  src={imageUrl }
                  alt={post.creator.name}
                  width={70}
                  style={{ borderRadius: '50%' }}
                />
                <div className="usy-name">
                  <h3>{post.creator.name}</h3>
                  <span>🕙 {formatDate(post.DatePublication)}</span>
                </div>
              </div>
            </div>
            <div className="epi-sec">
              <ul className="bk-links">
                {user.id === post.creator._id && (
                  <li>
                    <Link to={`/modifier/${post._id}`} title="" className="follow">
                      <i className="la ">✏️</i>
                    </Link>
                  </li>
                )}
                {user.id === post.creator._id && (
                  <li>
                    <a href="#" title="">
                      <i className="la la" onClick={() => handleDelete(post._id)}>❌</i>
                    </a>
                  </li>
                )}
              </ul>
            </div>
            <br />
            <div className="job_descp">
              <p>{post.Contenue}</p>
            </div>
            <PubActions postId={post._id} groupId={groupId}/>
            <AddCommentPub postId={post._id}/>
          </div>
        ))}
      </div>
    </div>
  );
}
