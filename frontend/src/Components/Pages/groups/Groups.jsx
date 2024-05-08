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
import { Spinner } from "react-bootstrap";

export default function Groups() {
  const [page, setPage] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams(); // Récupérer l'ID depuis l'URL
  const { user } = useContext(UserContext);
  const [isParticipating, setIsParticipating] = useState(true);
  const [userIsCreator, setUserIsCreator] = useState(true); // Mettez la valeur correcte ici, true si l'utilisateur est le créateur, false sinon
  const [pageScore, setPageScore] = useState(0);
  const [publicationsCount, setPublicationsCount] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalDislikes, setTotalDislikes] = useState(0);
  const userId = user ? user.id : null;

  //const imageUrl = userId ? `http://localhost:8000/user/${userId}/profile` : "/assets/images/resources/user-pro-img.png";
  const imageUrl =
    userId && user && user.profileImage
      ? `${process.env.REACT_APP_BACKEND_URL}/user/${userId}/profile`
      : "/assets/images/resources/user-pro-img.png";

  useEffect(() => {
    // Effectuer une requête GET pour récupérer les données de la page selon l'ID depuis le backend

    axios
      .get(`/groups/getbyid/${id}`)
      .then((response) => {
        setPage(response.data);
        setIsParticipating(response.data.participants.includes(user.id));
        setUserIsCreator(response.data.creator === user.id);

        const { totalPublications, groupScore, totalLikes, totalDislikes } =
          calculateScore(response.data);

        setPageScore(groupScore);
        setPublicationsCount(totalPublications);
        setTotalLikes(totalLikes);
        setTotalDislikes(totalDislikes);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des données de la page:",
          error
        );
        setIsLoading(false);
      });
  }, [id]);

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
  if (isLoading) {
    // Afficher un spinner pendant le chargement
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <section className="cover-sec">
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/images/${page.coverImage}`}
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
                          src={`${process.env.REACT_APP_BACKEND_URL}/images/${page.profileImage}`}
                          alt="Profile"
                        />
                      </div>
                      <div className="user_pro_status">
                        {user &&
                          page &&
                          user.id !== page.creator &&
                          !isParticipating &&
                          !page.visibilite && (
                            <ul className="flw-hr">
                              <li>
                                <a
                                  href="#"
                                  onClick={participerPage}
                                  title=""
                                  className="flww"
                                >
                                  <i className="la la-plus"></i> Follow
                                </a>
                              </li>
                            </ul>
                          )}
                        <ul className="flw-status">
                          <li
                            className="text-center"
                            style={{ paddingLeft: "50px" }}
                          >
                            <span className="text-center">👫 Membres 👫</span>
                            <b>
                              {page.participants ? page.participants.length : 0}
                            </b>
                          </li>
                          <hr />
                          <li>
                            <span>🥇 Score du Groupe</span>
                            <b>
                              {publicationsCount +
                                (page.participants
                                  ? page.participants.length
                                  : 0)}
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
                          <img src={imageUrl} alt="" />
                        </div>
                        {user.id === page.creator ||
                        isParticipating ||
                        (page.notifications.isAccept && page.visibilite) ? (
                          <div className="post-st">
                            <ul>
                              <li>
                                <Link
                                  className="post-jb active"
                                  to={`/addPub/${page._id}`}
                                  title=""
                                >
                                  Ajouter une Publication
                                </Link>
                              </li>
                            </ul>
                          </div>
                        ) : (
                          <span>👋😊</span>
                        )}
                      </div>
                    </div>
                    {user.id === page.creator ||
                    isParticipating ||
                    page.notifications.isAccept ||
                    page.visibilite ? (
                      <PubGroups groupId={id} />
                    ) : !isParticipating && !page.notifications.isAccept ? (
                      <div>
                        <p>
                          Vous n'êtes pas autorisé à voir les publications de
                          cette page car vos notifications sont désactivées.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p>
                          Vous n'êtes pas autorisé à voir les publications de
                          cette page car vous n'êtes pas le créateur.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="right-sidebar">
                    <div className="widget widget-portfolio">
                      <div className="wd-heady">
                        <h3>🗓️ Date de Création</h3>
                        <span>{formatDate(page.date)}</span>
                      </div>
                      <div className="wd-heady">
                        <h3>📝 Description</h3>
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
