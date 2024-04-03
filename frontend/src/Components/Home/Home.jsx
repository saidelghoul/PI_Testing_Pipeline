import "../../../public/assets/css/animate.css";
import "../../../public/assets/css/bootstrap.min.css";
import "../../../public/assets/css/line-awesome.css";
import "../../../public/assets/css/line-awesome-font-awesome.min.css";
import "../../../public/assets/vendor/fontawesome-free/css/all.min.css";
import "../../../public/assets/css/font-awesome.min.css";
import "../../../public/assets/css/jquery.mCustomScrollbar.min.css";
import "../../../public/assets/css/style.css";
import "../../../public/assets/css/responsive.css";
import "../../../public/assets/lib/slick/slick.css";
import "../../../public/assets/lib/slick/slick-theme.css";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { Link, useParams } from "react-router-dom";

export default function Home() {
  const user = useContext(UserContext);

  const [currentPublicationId, setCurrentPublicationId] = useState(null);
  const [currentEventId, setCurrentEventId] = useState(null);

  const [publication, setPublication] = useState([]);
  const [events, setEvent] = useState([]);
  const { id } = useParams();
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
  const combinedItems = [
    ...events.map((event) => ({ type: "Evenement", ...event })),
    ...publication.map((publication) => ({
      type: "Publication",
      ...publication,
    })),
  ];

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
  // add event
  const [eventData, setEventData] = useState({
    Titre: "",
    Contenu: "",
    DateDebut: "",
    DateFin: "",
    Capacite: "",
    Prix: "",
    Creator:user
  });
  
  const handleChange = (event) => {
    setEventData({ ...eventData, [event.target.name]: event.target.value });
  };
  
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const newData={
        titre:eventData.Titre,
        contenue:eventData.Contenu,
        dateDebut:eventData.DateDebut,
        dateFin:eventData.DateFin,
        cap:eventData.Capacite,
        prix:eventData.Prix,
        user:user
      }
      await axios.post("/evenemnt/add", newData);

      setEventData({
        Titre: "",
        Contenu: "",
        DateDebut: "",
        DateFin: "",
        Capacite: "",
        Prix: "",
        Creator:user
      });
  
      alert("Événement ajouté avec succès");
    } catch (error) {
      console.error("Erreur :", error);
      console.log(user.id)
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert("Une erreur s'est produite, veuillez réessayer.");
      }
    }
  };
  
  //add publication

  const [pubData, setPubData] = useState({
    Sujet: "",
    Contenue: "",
    creator: user.id// Utilisation directe de l'ID de l'utilisateur depuis le contexte
  });

  const handleChanged = (event) => {
    setPubData({ ...pubData, [event.target.name]: event.target.value });
  };

  const handelSubmited = async (e) => {
    e.preventDefault();
    try {
      const newData = {
        sujet: pubData.Sujet,
        contenu: pubData.Contenue,
        creator: user.id// Utilisez la propriété creator de pubData
      };

      await axios.post("/publications/add", newData);

      // Effacez les champs du formulaire
      setPubData({
        Sujet: "",
        Contenue: "",
      });

      alert("Publication ajoutée avec succès");
    } catch (error) {
      console.error(user)

      console.error("Erreur :", error);
      alert("Impossible d'ajouter la publication");
    }
  };



  //add comentaire to pub
  const [commentData, setCommentData] = useState({
    Contenue: "",
    creator: user,
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
        commentData
      );
      setCommentData({
        Contenue: "",
        creator: "user", // Assurez-vous de remplacer "user" par l'ID réel de l'utilisateur si nécessaire
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
  const [comentEventData, setComentEventData] = useState({
    Contenue: "",
    creator: "user",
  });
  const handleChangeComentEvent = (e) => {
    setComentEventData({
      ...comentEventData,
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
        comentEventData
      );
      setComentEventData({
        Contenue: "",
        creator: "user",
      });
      alert("commentaire ajout avec success");
    } catch (error) {
      console.error("error ", error);
      alert("cant add");
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
                            <a className="post_project" href="#" title="">
                              Ajout Evenement
                            </a>
                          </li>
                          <li>
                            <a className="post-jb active" href="#" title="">
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
                                  </a>
                                  <Link
                                    to={`/update/${publication._id} `}
                                    title=""
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
                                    handleCommentClick(publication._id)
                                  }
                                >
                                  <form onSubmit={handleSubmitComment}>
                                    <input
                                      type="text"
                                      name="Contenue"
                                      placeholder="Post a comment"
                                      value={commentData.Contenue}
                                      onChange={handleChangeComent}
                                      required
                                    />
                                    <button type="submit">Send</button>
                                  </form>
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
                                  <a href="#" title="" className="ed-opts-open">
                                    <i className="la la-ellipsis-v"></i>
                                  </a>
                                  <ul className="ed-options">
                                    <li>
                                      <a href="#" title="">
                                        Edit Post
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#" title="">
                                        Unsaved
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#" title="">
                                        Unbid
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#" title="">
                                        Close
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#" title="">
                                        Hide
                                      </a>
                                    </li>
                                  </ul>
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
                                  <li>
                                    <i
                                      className="fa fa-trash"
                                      style={{
                                        color: "red",
                                        cursor: "pointer",
                                        marginLeft: "auto",
                                      }}
                                      onClick={() =>
                                        handleDeleteEvent(event._id)
                                      }
                                    ></i>
                                  </li>
                                </ul>
                              </div>
                              {/* ajout d'un commentaire a un evenement  */}
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
                                      name="Contenue"
                                      placeholder="Post a comment"
                                      value={comentEventData.Contenue}
                                      onChange={handleChangeComentEvent}
                                      required
                                    />
                                    <button type="submit">Send</button>
                                  </form>
                                </div>
                              </div>
                            </div>
                          ))}
                          {/* commentaire */}
                        </div>
                        <div className="comment-section">
                         
                          <div className="comment-sec">
                            <ul>
                             
                              <li>
                                <div className="comment-list">
                                  <div className="bg-img">
                                    <img
                                      src="/assets/images/resources/bg-img3.png"
                                      alt=""
                                    />
                                  </div>
                                  <div className="comment">
                                    <h3>John Doe</h3>
                                    <span>
                                      <img
                                        src="/assets/images/clock.png"
                                        alt=""
                                      />{" "}
                                      3 min ago
                                    </span>
                                    <p>
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipiscing elit. Aliquam luctus hendrerit
                                      metus, ut ullamcorper quam finibus at.
                                    </p>
                                    
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className="post-comment">
                            <div className="cm_img">
                              <img
                                src="/assets/images/resources/bg-img4.png"
                                alt=""
                              />
                            </div>
                            <div className="comment_box">
                              <form>
                                <input
                                  type="text"
                                  placeholder="Post a comment"
                                />
                                <button type="submit">Send</button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="process-comm">
                        <div className="spinner">
                          <div className="bounce1"></div>
                          <div className="bounce2"></div>
                          <div className="bounce3"></div>
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

      {/* Ajout d un Evenement */}
      <div className="post-popup pst-pj">
        <div className="post-project">
          <h3>Ajout Evenement</h3>
          <div className="post-project-fields">
            <form onSubmit={handelSubmit}>
              <div className="row">
                <div className="col-lg-12">
                  <input
                    type="text"
                    name="Titre"
                    placeholder="Titre"
                    value={eventData.Titre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-lg-12">
                  <textarea
                    name="Contenu"
                    placeholder="Contenu"
                    value={eventData.Contenu}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="col-lg-12">
                  <h1>Date debut</h1>
                  <input
                    type="datetime-local"
                    name="DateDebut"
                    placeholder="Date de début"
                    value={eventData.DateDebut}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-lg-12">
                  <h1>Date fin</h1>

                  <input
                    type="datetime-local"
                    name="DateFin"
                    placeholder="Date de fin"
                    value={eventData.DateFin}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-lg-12">
                  <input
                    type="number"
                    name="Capacite"
                    placeholder="Capacité"
                    value={eventData.Capacite}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-lg-12">
                  <input
                    type="number"
                    name="Prix"
                    placeholder="Prix"
                    value={eventData.Prix}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-lg-12">
                  <ul>
                    <li>
                      <button className="active" type="submit">
                        Post
                      </button>
                    </li>
                    <li>
                      <a href="#" title="">
                        Cancel
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </form>
          </div>
          <a href="#" title="">
            <i className="la la-times-circle-o"></i>
          </a>
        </div>
      </div>

      {/* Ajout dune publication  */}
      <div className="post-popup job_post">
        <div className="post-project">
          <h3> Ajout Publication</h3>
          <div className="post-project-fields">
            <form onSubmit={handelSubmited}>
              <div className="row">
                <div className="col-lg-12">
                  <input
                    type="text"
                    name="Sujet"
                    placeholder="Sujet"
                    value={pubData.Sujet}
                    onChange={handleChanged}
                    required
                  />
                </div>
                <div className="col-lg-12">
                  <textarea
                    name="Contenue"
                    placeholder="Contenue"
                    value={pubData.Contenue}
                    onChange={handleChanged}
                    required
                  ></textarea>
                </div>
                <div className="col-lg-12">
                  <ul>
                    <li>
                      <button className="active" type="submit">
                        Post
                      </button>
                    </li>
                    <li>
                      <a href="#" title="">
                        Cancel
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </form>
          </div>
          <a href="#" title="" color="black">
            <i className="la la-times-circle-o"></i>
          </a>
        </div>
      </div>
    </>
  );
}
