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
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../../context/userContext";
import { Link } from "react-router-dom";
import moment from 'moment';
import { Button } from "react-bootstrap";

export default function Home() {
  const { user } = useContext(UserContext);

  const [currentPublicationId, setCurrentPublicationId] = useState(null);
  const [currentEventId, setCurrentEventId] = useState(null);

  const [publication, setPublication] = useState([]);
  const [events, setEvent] = useState([]);
  const [reservationMade, setReservationMade] = useState(false);

  useEffect(() => {
    fetchPublication();
    fetchEvent();
    
  }, []);

  //get all publication
  const fetchPublication = async () => {
    try {
      const res = await axios.get("/publications/getall");
      setPublication(res.data);
    } catch (error) {
      console.error("error fetching publication", error);
    }
  };
  //get all event
  const fetchEvent = async () => {
    try {
      const res = await axios.get("/evenemnt/getall");
      setEvent(res.data);
    } catch (error) {
      console.error("error fetching events", error);
    }
  };
  events.sort(
    (a, b) => new Date(b.DatePublication) - new Date(a.DatePublication)
  );
  publication.sort(
    (a, b) => new Date(b.DatePublication) - new Date(a.DatePublication)
  );

 
  const handleReservation = async (eventId) => {
    try {
      // Envoyer la demande de réservation au serveur
      const response = await axios.post(`/evenemnt/reservations/${eventId}`, {

        creator: user.id, // Utilisez l'ID de l'utilisateur connecté
      });
  
      // Mettre à jour la capacité de l'événement localement
  
      // Mettre à jour l'état de la réservation
      setReservationMade(true);
  
      console.log('Réservation réussie:', response.data);
    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
    }
  };
  

  //delet event
  const handleDeleteEvent = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ?")) {
      try {
        await axios.delete(`/evenemnt/remove/${id}`);
        fetchEvent();
      } catch (error) {
        console.error("Erreur lors de la suppression ", error.message);
      }
    }
  };
  //delete publication
  const handleDeletePub = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ?")) {
      try {
        await axios.delete(`/publications/delete/${id}`);
        fetchPublication();
      } catch (error) {
        console.error("Erreur lors de la suppression ", error.message);
      }
    }
  };
  //add comentaire to pub
  const [commentData, setCommentData] = useState({
    contenu: "",
  });
  const handleChangeComent = (e) => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value });
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!currentPublicationId) {
      console.error("ID de la publication non défini.");
      return;
    }
    try {
      const response = await axios.post(
        `/commentaire/addToPub/${currentPublicationId}`,
        {
          ...commentData,
          creator: user.id, // Utilisez l'ID de l'utilisateur connecté
        }
      );
      setCommentData({
        contenu: ""
      });
      alert("Commentaire ajouté avec succès");
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire :", error);
    }
  };

  const handleCommentClick = (id) => {
    setCurrentPublicationId(id);
  };

  //add comentaire to event
  
  const handleChangeComentEvent = (e) => {
    setCommentData({
      ...commentData,
      [e.target.name]: e.target.value,
    });
  };
  const handelSubmitComentEvent = async (e) => {
    e.preventDefault();
    if (!setCurrentEventId) {
      console.error("ID de l'evenement non défini.");
      return;
    }
    try {
      await axios.post(
        `/commentaire/addToEvent/${currentEventId}`,
        {
          ...commentData,
          creator: user.id, // Utilisez l'ID de l'utilisateur connecté
        }
      );
      setCommentData({
        contenu: "",
      });
      alert("commentaire ajout avec success");
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire :", error);

    }
  };
  const handleCommentClicked = (id) => {
    setCurrentEventId(id);
  };

  return (
    <>
      <main>
        <div className="main-section">
          <div className="container">
            <div className="main-section-data">
              <div className="row">
                <div className="col-lg-3 col-md-4 pd-left-none no-pd">
                  <div className="main-left-sidebar no-margin">
                    <div className="user-data full-width">
                      <div className="user-profile">
                        <div className="username-dt">
                          <div className="usr-pic">
                            <img
                              src="/assets/images/resources/user-pic.png"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="user-specs">
                          <> {!!user && <h1>{user.name}</h1>}</>
                          <span> {!!user && <h2>{user.role}</h2>}</span>
                          <span>
                            Département {!!user && <h2>{user.departement}</h2>}
                          </span>
                        </div>
                      </div>
                    </div>
                   
                  </div>
                </div>
                {/* acceiul */}
                <div className="col-lg-6 col-md-8 no-pd">
                  <div className="main-ws-sec">
                    <div className="post-topbar">
                      <div className="user-picy">
                        <img
                          src="/assets/images/resources/user-pic.png"
                          alt=""
                        />
                      </div>
                      {/* ajout evenemtn / publication */}
                      <div className="post-st">
                        <ul>
                          <li>
                            <a className="post_project" href="/addEvent" title="">
                              Ajout Evenement
                            </a>
                          </li>
                          <li>
                          <a className="post" href="/addPub" title="">
                              Ajout Publication
                            </a>
                            </li>
                        </ul>
                      </div>
                    </div>

                    {/*  publications  */}

                    <div className="posts-section">
                      <div className="posty">
                        <div className="post-bar no-margin">
                          {publication.map((publication) => (
                            <div
                              className="job-status-bar"
                              key={publication._id}
                            >
                              <div className="post_topbar">
                                <div className="usy-dt">
                                  <img
                                    src="/assets/images/resources/us-pc2.png"
                                    alt=""
                                  />
                                  <div className="usy-name">
                                    <h3>John Doe</h3>
                                    <span>
                                      <img
                                        src="/assets/images/clock.png"
                                        alt=""
                                      />
                                      publier le:{" "}
                                      {publication.DatePublication
                                        ? new Date(
                                            publication.DatePublication
                                          ).toLocaleDateString("fr-FR")
                                        : "Date"}
                                    </span>
                                  </div>
                                </div>
                                <div className="ed-opts">
                                {user.id === publication.creator && 
                                  <a
                                    href="#"
                                    title=""
                                    className="ed-opts-open"
                                    onClick={() =>
                                      handleDeletePub(publication._id)
                                    }
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="currentColor"
                                      className="bi bi-trash3"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                    </svg>{" "}
                                  </a>}
                                  {user.id === publication.creator && 
  <Link
    to={`/update/${publication._id}`}
    title="Update"
    className="ed-opts-open"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-pencil-square"
      viewBox="0 0 16 16"
    >
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
      <path
        fillRule="evenodd"
        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
      />
    </svg>
  </Link>
}

                                </div>
                              </div>
                              <div className="epi-sec">
                                <ul className="descp"></ul>
                              </div>
                              <div className="job_descp">
                                <h3>{publication.Sujet}</h3>{" "}
                                <p>{publication.Contenue}</p>
                              </div>
                              <div className="job-status-bar">
                                <ul className="like-com">
                                  <li>
                                    <a href="#">
                                      <i className="fas fa-heart"></i> Like
                                    </a>
                                    <img
                                      src="/assets/images/liked-img.png"
                                      alt=""
                                    />
                                    <span>25</span>
                                  </li>
                                  <li>
                                    <a href="#" className="com">
                                      <i className="fas fa-comment-alt"></i>{" "}
                                      Comment 15
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              {/* ajout d'un commentaire pour publication  */}
                             

                                <div className="comment-section">
                         
                                <div className="comment-sec">
  <ul>
    {publication.comments.length > 0 ? (
      publication.comments.map((comment, index) => (
        <li key={index}>
          <div className="comment-list">
            <div className="bg-img">
              <img src="/assets/images/resources/bg-img3.png" alt="" />
            </div>
            <div className="comment">
              <h3>{comment.creator.name}</h3>
              <span>
                <img src="/assets/images/clock.png" alt="" />{" "}
                {moment(comment.DateCreation).format('lll')}
              </span>
              <p>{comment.contenu}</p>
            </div>
          </div>
        </li>
      ))
    ) : (
      <li>
        <p>Aucun commentaire pour cette publication.</p>
      </li>
    )}
  </ul>
</div>

                         <div className="post-comment">
                           <div className="cm_img">
                             <img
                               src="/assets/images/resources/bg-img4.png"
                               alt=""
                             />
                           </div>
                           <div className="comment_box" onClick={() =>handleCommentClick(publication._id)} >
                                  <form onSubmit={handleSubmitComment}>
                                    <input
                                      type="text"
                                      name="contenu"
                                      placeholder="Post a comment"
                                      value={commentData.contenu}
                                      onChange={handleChangeComent}
                                      required
                                    />
                                    <button type="submit">Send</button>
                                  </form>
                                </div>
                         </div>
                       </div>
                              </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* evenement */}
                    <div className="posts-section">
                      <div className="posty">
                        <div className="post-bar no-margin">
                          {events.map((event) => (
                            <div className="job-status-bar">
                              <div key={event._id} className="post_topbar">
                                <div className="usy-dt">
                                  <img
                                    src="/assets/images/resources/us-pc2.png"
                                    alt=""
                                  />
                                  <div className="usy-name">
                                    <h3>John Doe</h3>
                                    <span>
                                      <img
                                        src="/assets/images/clock.png"
                                        alt=""
                                      />
                                      publier le :{" "}
                                      {event.DatePublication
                                        ? new Date(
                                            event.DatePublication
                                          ).toLocaleDateString("fr-FR")
                                        : "Date"}
                                    </span>
                                  </div>
                                </div>
                                <div className="ed-opts">
                                {user.id === event.creator && 
                                  <a
                                    href="#"
                                    title=""
                                    className="ed-opts-open"
                                    onClick={() =>
                                      handleDeleteEvent(event._id)
                                    }
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="currentColor"
                                      className="bi bi-trash3"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                    </svg>{" "}
                                  </a>}
                                  {user.id === event.creator && 
  <Link
    to={`/updateEvent/${event._id}`}
    title="Update"
    className="ed-opts-open"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-pencil-square"
      viewBox="0 0 16 16"
    >
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
      <path
        fillRule="evenodd"
        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
      />
    </svg>
  </Link>
}

                                </div>
                              </div>
                              <div className="epi-sec">
                                <ul className="descp"></ul>
                              </div>
                              <div className="job_descp">
                                <ul className="job-dt">
                                  <li>
                                    <a href="#" title="">
                                      capacite :{event.Capacite}
                                    </a>
                                  </li>
                                  <li>
                                    prix:
                                    <span> ${event.Prix}</span>
                                  </li>
                                </ul>
                                <span>
                                  <img src="/assets/images/clock.png" alt="" />
                                  <h3>
                                    Date de début :{" "}
                                    {event.DateDebut
                                      ? new Date(
                                          event.DateDebut
                                        ).toLocaleDateString("fr-FR")
                                      : "Date"}
                                  </h3>
                                  <img src="/assets/images/clock.png" alt="" />

                                  <h3>
                                    Date fin :{" "}
                                    {event.DateFin
                                      ? new Date(
                                          event.DateFin
                                        ).toLocaleDateString("fr-FR")
                                      : "Date"}
                                  </h3>
                                </span>
                                <h3>{event.Titre}</h3> <p>{event.Contenu}</p>
                              </div>
                              <div className="job-status-bar">
                                <ul className="like-com">
                                  <li>
                                    <a href="#">
                                      <i className="fas fa-heart"></i> Like
                                    </a>
                                    <img
                                      src="/assets/images/liked-img.png"
                                      alt=""
                                    />
                                    <span>25</span>
                                  </li>
                                  <li>
                                    <a href="#" className="com">
                                      <i className="fas fa-comment-alt"></i>{" "}
                                      Comment 15
                                    </a>
                                  </li>
                                  {!reservationMade && (
            <li>
              <Button onClick={() => handleReservation(event._id)}>Réserver</Button>
            </li>
          )}
                                </ul>
                              </div>
                              {/* ajout d'un commentaire a un evenement  */}
                              <div className="comment-section">
                         
                              <div className="comment-sec">
  <ul>
    {event.comments.length > 0 ? (
      event.comments.map((comment, index) => (
        <li key={index}>
          <div className="comment-list">
            <div className="bg-img">
              <img src="/assets/images/resources/bg-img3.png" alt="" />
            </div>
            <div className="comment">
              <h3>{comment.creator.name}</h3>
              <span>
                <img src="/assets/images/clock.png" alt="" />{" "}
                {moment(comment.DateCreation).format('lll')}
              </span>
              <p>{comment.contenu}</p>
              <div>
              {user.id == comment.creator && 

                <a href="/update">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                  </svg>
                </a>}
                {user.id === comment.creator && 
                  <a
                    href="#"
                    title=""
                    className="ed-opts-open"
                    onClick={() => handleDeleteEvent(comment._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06l.5-8.5a.5.5 0 0 1 .528-.47M5.542 4.5a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg>{" "}
                  </a>
                }
              </div>
            </div>
          </div>
        </li>
      ))
    ) : (
      <li>
        <p>Aucun commentaire pour cet événement.</p>
      </li>
    )}
  </ul>
</div>

                           <div className="post-comment">
                                <div className="cm_img">
                                  <img
                                    src="/assets/images/resources/bg-img4.png"
                                    alt=""
                                  />
                                </div>
                                <div
                                  className="comment_box"
                                  onClick={() =>
                                    handleCommentClicked(event._id)
                                  }
                                >
                                  <form onSubmit={handelSubmitComentEvent}>
                                    <input
                                      type="text"
                                      name="contenu"
                                      placeholder="Post a comment"
                                      value={commentData.contenu}
                                      onChange={handleChangeComentEvent}
                                      required
                                    />
                                    <button type="submit">Send</button>
                                  </form>
                                </div>
                              </div>
                       </div>
                            </div>
                          ))}
                          {/* commentaire */}
                        </div>
                        
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