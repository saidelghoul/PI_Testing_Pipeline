import "../../../../public/assets/css/animate.css";
import "../../../../public/assets/css/line-awesome.css";
import "../../../../public/assets/css/bootstrap.min.css";
import "../../../../public/assets/css/line-awesome-font-awesome.min.css";
import "../../../../public/assets/vendor/fontawesome-free/css/all.min.css";
import "../../../../public/assets/css/font-awesome.min.css";
import "../../../../public/assets/css/jquery.mCustomScrollbar.min.css";
import "../../../../public/assets/css/style.css";
import "../../../../public/assets/css/responsive.css";
import "../../../../public/assets/lib/slick/slick.css";
import "../../../../public/assets/lib/slick/slick-theme.css";
import { React, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../../../../context/userContext";
import PubGroups from "./PubGroups";

export default function Groups() {
  const [page, setPage] = useState({});
  const { id } = useParams(); // Récupérer l'ID depuis l'URL
  const { user } = useContext(UserContext);
  const [isParticipating, setIsParticipating] = useState(true);
  const [userIsCreator, setUserIsCreator] = useState(true); // Mettez la valeur correcte ici, true si l'utilisateur est le créateur, false sinon
  const [pageScore, setPageScore] = useState(0);
  const [publications, setPublications] = useState([]);
  const [publicationsCount, setPublicationsCount] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalDislikes, setTotalDislikes] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);
  const [comments, setComments] = useState([]);







  useEffect(() => {
    // Effectuer une requête GET pour récupérer les données de la page selon l'ID depuis le backend

    axios
      .get(`/groups/getbyid/${id}`)
      .then((response) => {
        setPage(response.data);
        setIsParticipating(response.data.participants.includes(user.id));
        setUserIsCreator(response.data.creator === user.id);

        const { totalPublications, groupScore, totalLikes, totalDislikes } = calculateScore(response.data);
        setPageScore(groupScore);
        setPublicationsCount(totalPublications);
        setTotalLikes(totalLikes);
        setTotalDislikes(totalDislikes);
      
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des données de la page:",
          error
        );
      });
  }, [id]);
  
  const fetchComments = async () => {
    try {
        const response = await axios.get(`/commentGroupe/comments/${postId}`);
        setComments(response.data);
    } catch (error) {
        console.error("Erreur lors de la récupération des commentaires :", error.message);
    }
};

const fetchLikesAndDislikesCount = async () => {
  try {
    const response = await axios.get(`/pubGroupe/publications/${postId}/reactions`);
    setLikesCount(response.data.likes);
    setDislikesCount(response.data.dislikes);
  } catch (error) {
    console.error('Erreur lors de la récupération du nombre de likes et de dislikes :', error);
  }
};

const calculateScore = (page) => {
  let groupScore = 0;
  let totalPublications = 0;
  let totalLikes = 0;
  let totalDislikes = 0;

  if (page.publications && page.publications.length > 0) {
    totalPublications = page.publications.length;
    page.publications.forEach((publication) => {
      if (publication.Like) {
        totalLikes += publication.Like;
      }
      if (publication.dislike) {
        totalDislikes += publication.dislike;
      }
    });

    groupScore = totalLikes - totalDislikes;
  }

  return { totalPublications, groupScore, totalLikes, totalDislikes };
};


    

  
  
  
  const participerPage = async () => {
    try {
      const response = await axios.post(`/groups/${id}/participer`, {
        userId: user.id,
      });

      console.log(response.data.message);
      alert(
        "votre participation est bien effectuer attendez admin pour l acceptation"
      );
      setIsParticipating(false);

      // afficher le message de succès dans la console ou traiter comme nécessaire
      // Mettre à jour l'état de la page ou afficher un message de succès à l'utilisateur si nécessaire
    } catch (error) {
      if (
        error.response &&
        error.response.data.error === "L'utilisateur participe déjà à ce groupe"
      ) {
        alert("Vous participez déjà à ce groupe !");
      } else {
        console.error("Erreur lors de la participation à la page:", error);

        // Gérer les autres erreurs ici
      }
    }
  };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  // Exécuter cet effet chaque fois que l'ID change
  return (
    <>
  
      <section className="cover-sec">
        <img
          src={`http://localhost:8000/images/${page.coverImage}`}
          alt="cover"
          style={{ height: "362px" }}
        />
      </section>

      <main>
        <div className="main-section">
          <div className="container">
            <div className="main-section-data">
              <div className="row">
                <div className="col-lg-3">
                  <div className="main-left-sidebar">
                    <div className="user_profile">
                      <div className="user-pro-img">
                        <img
                          src={`http://localhost:8000/images/${page.profileImage}`}
                          alt="Profile"
                        />
                      </div>
                      <div className="user_pro_status">
                      {user && page && user.id !== page.creator && !isParticipating && (
        <div>
          {user.id !== page.creator && page.notifications && page.notifications.isAccept === false && (
            <div className="alert alert-danger" role="alert">
              Le créateur a refusé la notification.
            </div>
          )}
          <ul className="flw-hr">
            <li>
              <a href="#" onClick={participerPage} title="" className="flww">
                <i className="la la-plus"></i> Regoindre
              </a>
            </li>
          </ul>
        </div>
      )}
                        <ul className="flw-status">
                          <li>
                            <span> 👫Members 👫</span>
                            <b>
                              {" "}
                              {page.participants ? page.participants.length : 0}
<br></br>
                           <span> 🥇Score du Page🥇 </span>
 <b>{publicationsCount * (page.participants ? page.participants.length : 0)}</b>
   
                            </b>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="main-ws-sec">
                    <div className="user-tab-sec">
                      <h3>{page.nomgroups}</h3>
                      <div className="star-descp">
                        <ul>
                          <li>
                            <i className="fa fa-star"></i>
                          </li>
                          <li>
                            <i className="fa fa-star"></i>
                          </li>
                          <li>
                            <i className="fa fa-star"></i>
                          </li>
                          <li>
                            <i className="fa fa-star"></i>
                          </li>
                          <li>
                            <i className="fa fa-star-half-o"></i>
                          </li>
                        </ul>
                      </div>

                      <div className="post-topbar">
                        <div className="user-picy">
                          <img
                            src="/assets/images/resources/user-pic.png"
                            alt=""
                          /> 
                        </div>
                        <br></br>
                       
                        <div className="post-st">
                          <ul>
                            <li>
                              <Link className="post-jb active" to={`/addPub/${page._id}`} title="">
                                Add Publication
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <PubGroups groupId={id} />

                 
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="right-sidebar">
                   
                    <div className="widget widget-portfolio">
                      <div className="wd-heady">
                        <h3> 🗓️ Date création {" "}</h3>{""}
                        <span>{formatDate(page.date)}</span>


                      </div>
                      <div className="wd-heady">
                        <h3> 📝 Description {" "}</h3>{""}
                        <span>{page.description}</span>


                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      

     
    </>
  );
}
