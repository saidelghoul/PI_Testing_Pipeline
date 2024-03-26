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
import { useState, useEffect } from "react";

export default function Home() {
  const [publication, setPublication] = useState([]);
  const [events, setEvent] = useState([]);

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
  });
  const handleChange = (event) => {
    setEventData({ ...eventData, [event.target.name]: event.target.value });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/evenemnt/add", eventData);

      setEventData({
        Titre: "",
        Contenu: "",
        DateDebut: "",
        DateFin: "",
        Capacite: "",
        Prix: "",
      });
      alert("Evenement ajouté avec succès");
    } catch (error) {
      console.error("error ", error);
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
  });
  const handleChanged = (pub) => {
    setPubData({ ...pubData, [pub.target.name]: pub.target.value });
  };
  const handelSubmited = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/publications/add", pubData);

      setPubData({
        Sujet: "",
        Contenue: "",
      });
      alert("publication ajout avec success");
    } catch (error) {
      console.error("error ", error);
      alert("cant add");
    }
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
                    <div className="suggestions full-width">
                      <div className="sd-title">
                        <h3>Suggestions</h3>
                        <i className="la la-ellipsis-v"></i>
                      </div>
                      <div className="suggestions-list">
                        <div className="suggestion-usd">
                          <img src="/assets/images/resources/s1.png" alt="" />
                          <div className="sgt-text">
                            <h4>Jessica William</h4>
                            <span>Graphic Designer</span>
                          </div>
                          <span>
                            <i className="la la-plus"></i>
                          </span>
                        </div>
                        <div className="suggestion-usd">
                          <img src="/assets/images/resources/s2.png" alt="" />
                          <div className="sgt-text">
                            <h4>John Doe</h4>
                            <span>PHP Developer</span>
                          </div>
                          <span>
                            <i className="la la-plus"></i>
                          </span>
                        </div>
                        <div className="suggestion-usd">
                          <img src="/assets/images/resources/s3.png" alt="" />
                          <div className="sgt-text">
                            <h4>Poonam</h4>
                            <span>Wordpress Developer</span>
                          </div>
                          <span>
                            <i className="la la-plus"></i>
                          </span>
                        </div>
                        <div className="suggestion-usd">
                          <img src="/assets/images/resources/s4.png" alt="" />
                          <div className="sgt-text">
                            <h4>Bill Gates</h4>
                            <span>C & C++ Developer</span>
                          </div>
                          <span>
                            <i className="la la-plus"></i>
                          </span>
                        </div>
                        <div className="suggestion-usd">
                          <img src="/assets/images/resources/s5.png" alt="" />
                          <div className="sgt-text">
                            <h4>Jessica William</h4>
                            <span>Graphic Designer</span>
                          </div>
                          <span>
                            <i className="la la-plus"></i>
                          </span>
                        </div>
                        <div className="suggestion-usd">
                          <img src="/assets/images/resources/s6.png" alt="" />
                          <div className="sgt-text">
                            <h4>John Doe</h4>
                            <span>PHP Developer</span>
                          </div>
                          <span>
                            <i className="la la-plus"></i>
                          </span>
                        </div>
                        <div className="view-more">
                          <a href="#" title="">
                            View More
                          </a>
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
                            <div className="job-status-bar">
                              <div
                                key={publication._id}
                                className="post_topbar"
                              >
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
                                  <li
                                    className="fa fa-trash"
                                    style={{ color: "red", cursor: "pointer" }}
                                    onClick={() =>
                                      handleDeletePub(publication._id)
                                    }
                                  ></li>
                                </ul>
                              </div>
                            </div>
                          ))}
                          {/* commentaire */}
                        </div>
                        <div className="comment-section">
                          <a href="#" className="plus-ic">
                            <i className="la la-plus"></i>
                          </a>
                          <div className="comment-sec">
                            <ul>
                              <li>
                                <div className="comment-list">
                                  <div className="bg-img">
                                    <img
                                      src="/assets/images/resources/bg-img1.png"
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
                                    <p>Lorem ipsum dolor sit amet, </p>
                                    <a href="#" title="" className="active">
                                      <i className="fa fa-reply-all"></i>Reply
                                    </a>
                                  </div>
                                </div>
                                <ul>
                                  <li>
                                    <div className="comment-list">
                                      <div className="bg-img">
                                        <img
                                          src="/assets/images/resources/bg-img2.png"
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
                                        <p>Hi John </p>
                                        <a href="#" title="">
                                          <i className="fa fa-reply-all"></i>
                                          Reply
                                        </a>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </li>
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
                                    <a href="#" title="">
                                      <i className="fa fa-reply-all"></i>Reply
                                    </a>
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
                            </div>
                          ))}
                          {/* commentaire */}
                        </div>
                        <div className="comment-section">
                          <a href="#" className="plus-ic">
                            <i className="la la-plus"></i>
                          </a>
                          <div className="comment-sec">
                            <ul>
                              <li>
                                <div className="comment-list">
                                  <div className="bg-img">
                                    <img
                                      src="/assets/images/resources/bg-img1.png"
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
                                    <p>Lorem ipsum dolor sit amet, </p>
                                    <a href="#" title="" className="active">
                                      <i className="fa fa-reply-all"></i>Reply
                                    </a>
                                  </div>
                                </div>
                                <ul>
                                  <li>
                                    <div className="comment-list">
                                      <div className="bg-img">
                                        <img
                                          src="/assets/images/resources/bg-img2.png"
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
                                        <p>Hi John </p>
                                        <a href="#" title="">
                                          <i className="fa fa-reply-all"></i>
                                          Reply
                                        </a>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </li>
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
                                    <a href="#" title="">
                                      <i className="fa fa-reply-all"></i>Reply
                                    </a>
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
