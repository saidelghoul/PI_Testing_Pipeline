/* eslint-disable react-hooks/rules-of-hooks */
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
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext";
import axios from "axios";

export default function profil() {
  const { user } = useContext(UserContext);
  const [departements, setDepartements] = useState([]);
  const [unites, setUnités] = useState([]);
  //const [selectedUnit, setSelectedUnit] = useState(null);

  const isAdmin = user && user.role === "Directeur d'étude";
  const isChefDep = user && user.role === "Chef département";

  const [departement, setDepartement] = useState({
    name: "",
    description: "",
    nbrUnite: 0,
  });

  useEffect(() => {
    fetchDepartements();
    fetchUnités();
  }, []);

  const fetchDepartements = async () => {
    try {
      const response = await axios.get("/departement/getAlldep");
      setDepartements(response.data);
    } catch (error) {
      console.error("Error fetching departements:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Appelez l'API pour ajouter le département
      const response = await axios.post("/departement/add", departement);
      console.log("Département ajouté avec succès:", response.data);
      // Réinitialisez le formulaire
      setDepartement({
        name: "",
        description: "",
        nbrUnite: 0,
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du département:", error.message);
    }
  };

  const [unite, setUnite] = useState({
    name: "",
    departement: "",
  });

  const fetchUnités = async () => {
    try {
      const response = await axios.get("/unite/getAll");
      setUnités(response.data);
    } catch (error) {
      console.error("Error fetching unités:", error);
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    try {
      // Appelez l'API pour ajouter le département
      const response = await axios.post("/unite/add", unite);
      console.log("Unité ajouté avec succès:", response.data);
      // Réinitialisez le formulaire

      setUnite({
        name: "",
        departement: "",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du unite:", error.message);
    }
  };
  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setUnite({ ...unite, [name]: value });
  };

  const [updatedUser, setUpdatedUser] = useState({
    // addresse: "",
    // gouvernorat: "",
    // telephone: "",
    // dateNaissance: "",
    // gender: "",
    addresse: user?.addresse || "",
    gouvernorat: user?.gouvernorat || "",
    telephone: user?.telephone || "",
    dateNaissance: user?.dateNaissance || "",
    gender: user?.gender || "",
  });

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      // Appelez l'API pour mettre à jour le profil utilisateur
      const response = await axios.put(`/user/${user.id}`, updatedUser);
      console.log("Profil utilisateur mis à jour avec succès:", response.data);
      // Réinitialisez le formulaire
      setUpdatedUser({
        addresse: "",
        gouvernorat: "",
        telephone: "",
        dateNaissance: "",
        gender: "",
      });
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleDeleteUnit = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette unité ?")) {
      try {
        await axios.delete(`/unite/remove/${id}`);
        fetchUnités();
      } catch (error) {
        console.error(
          "Erreur lors de la suppression de l'unité:",
          error.message
        );
      }
    }
  };

  return (
    <>
      <section className="cover-sec">
        <img src="/assets/images/resources/cover-img.jpg" alt="" />
        <div className="add-pic-box">
          <div className="container">
            <div className="row no-gutters">
              <div className="col-lg-12 col-sm-12">
                <input type="file" id="file" />
                <label htmlFor="file">Change Image</label>
              </div>
            </div>
          </div>
        </div>
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
                          src="/assets/images/resources/user-pro-img.png"
                          alt=""
                        />
                        <div className="add-dp" id="OpenImgUpload">
                          <input type="file" id="file" />
                          <label htmlFor="file">
                            <i className="fas fa-camera"></i>
                          </label>
                        </div>
                      </div>
                      <div className="user_pro_status">
                        <ul className="flw-status">
                          <li>
                            <span>Following</span>
                            <b>34</b>
                          </li>
                          <li>
                            <span>Followers</span>
                            <b>155</b>
                          </li>
                        </ul>
                      </div>
                      <div>
                        {/* <a href="/completerProfil" title="">
                            <i className="la la-user"></i> completer mon profil
                          </a> */}
                        <ul>
                          <li>
                            <a className="post_project" href="#" title="">
                              Completer mon profil
                            </a>
                          </li>
                        </ul>
                      </div>

                      <div className="post-popup pst-pj">
                        <div className="post-project">
                          <h3>completer mon profil</h3>
                          <div className="post-project-fields">
                            <form onSubmit={handleSubmit1}>
                              <div className="row">
                                <div className="col-lg-12">
                                  <label htmlFor="addresse">Ville :</label>
                                  <input
                                    type="text"
                                    id="addresse"
                                    name="addresse"
                                    placeholder="ville"
                                    value={updatedUser.addresse}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="col-lg-12">
                                  <div className="inp-field">
                                    <label htmlFor="gouvernorat">
                                      Gouvernorat :
                                    </label>
                                    <select
                                      id="gouvernorat"
                                      name="gouvernorat"
                                      value={updatedUser.gouvernorat}
                                      onChange={handleChange}
                                    >
                                      <option>
                                        Sélectionnez un gouvernorat
                                      </option>
                                      <option value="Ariana">Ariana</option>
                                      <option value="Béja">Béja</option>
                                      <option value="Ben Arous">
                                        Ben Arous
                                      </option>
                                      <option value="Bizerte">Bizerte</option>
                                      <option value="Gabès">Gabès</option>
                                      <option value="Gafsa">Gafsa</option>
                                      <option value="Jendouba">Jendouba</option>
                                      <option value="Kairouan">Kairouan</option>
                                      <option value="Kasserine">
                                        Kasserine
                                      </option>
                                      <option value="Kébili">Kébili</option>
                                      <option value="Kef">Le Kef</option>
                                      <option value="Mahdia">Mahdia</option>
                                      <option value="Manouba">Manouba</option>
                                      <option value="Médenine">Médenine</option>
                                      <option value="Monastir">Monastir</option>
                                      <option value="Nabeul">Nabeul</option>
                                      <option value="Sfax">Sfax</option>
                                      <option value="Sidi Bouzid">
                                        Sidi Bouzid
                                      </option>
                                      <option value="Siliana">Siliana</option>
                                      <option value="Sousse">Sousse</option>
                                      <option value="Tataouine">
                                        Tataouine
                                      </option>
                                      <option value="Tozeur">Tozeur</option>
                                      <option value="Tunis">Tunis</option>
                                      <option value="Zaghouan">Zaghouan</option>
                                    </select>
                                  </div>
                                </div>

                                <div className="col-lg-12">
                                  <label htmlFor="telephone">Téléphone :</label>
                                  <input
                                    type="text"
                                    id="telephone"
                                    name="telephone"
                                    placeholder="telephone"
                                    value={updatedUser.telephone}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="col-lg-12">
                                  <div className="price-sec">
                                    <label htmlFor="dateNaissance">
                                      Date de Naissance :
                                    </label>

                                    <input
                                      type="date"
                                      id="dateNaissance"
                                      name="dateNaissance"
                                      placeholder="Price"
                                      value={updatedUser.dateNaissance}
                                      onChange={handleChange}
                                    />
                                    <i className="la la-dollar"></i>
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <label htmlFor="gender">Genre :</label>
                                  <select
                                    id="gender"
                                    name="gender"
                                    value={updatedUser.gender}
                                    onChange={handleChange}
                                  >
                                    <option value="homme">Homme</option>
                                    <option value="femme">Femme</option>
                                  </select>
                                </div>
                                <div className="col-lg-12">
                                  <ul>
                                    <li>
                                      <button
                                        className="active"
                                        type="submit"
                                        value="post"
                                      >
                                        Submit
                                      </button>
                                    </li>
                                    {/* <li><a href="#" type="close" title="">Cancel</a></li> */}
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
                      <ul className="social_links">
                        {!!user && user.gouvernorat && (
                          <li>
                            <i className="la la-globe"> Gouvernorat : </i>
                            <h3>{user.gouvernorat}</h3>
                          </li>
                        )}
                        {!!user && user.addresse && (
                          <li>
                            <i className="la la-globe"> Ville : </i>
                            <h3>{user.addresse}</h3>
                          </li>
                        )}
                        {!!user && user.dateNaissance && (
                          <li>
                            <i className="la la-globe"> Date de naissance : </i>
                            <h3>
                              {new Date(user.dateNaissance).toLocaleDateString(
                                "fr-FR"
                              )}
                            </h3>
                          </li>
                        )}
                        {!!user && user.telephone && (
                          <li>
                            <i className="la la-globe"> Telephone : </i>
                            <h3>{user.telephone}</h3>
                          </li>
                        )}
                        {/* <li>
                          <a href="#" title="">
                            <i className="fa fa-instagram"></i>{" "}
                            Http://www.instagram.com/john...
                          </a>
                        </li>
                        <li>
                          <a href="#" title="">
                            <i className="fa fa-youtube"></i>{" "}
                            Http://www.youtube.com/john...
                          </a>
                        </li> */}
                      </ul>
                    </div>
                    <div className="suggestions full-width">
                      <div className="sd-title">
                        <h3>People Viewed Profile</h3>
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
                <div className="col-lg-6">
                  <div className="main-ws-sec">
                    <div className="user-tab-sec rewivew">
                      <h3> {!!user && <>{user.name}</>}</h3>
                      <div className="star-descp">
                        <span> {!!user && <>{user.role}</>}</span>

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
                        <a href="#" title="">
                          Status
                        </a>
                      </div>
                      <div className="tab-feed st2 settingjb">
                        <ul>
                          <li data-tab="feed-dd" className="active">
                            <a href="#" title="">
                              <img src="/assets/images/ic1.png" alt="" />
                              <span>Feed</span>
                            </a>
                          </li>
                          <li data-tab="info-dd">
                            <a href="#" title="">
                              <img src="/assets/images/ic2.png" alt="" />
                              <span>Info</span>
                            </a>
                          </li>
                          <li data-tab="saved-jobs">
                            <a href="#" title="">
                              <img src="/assets/images/ic4.png" alt="" />
                              <span>Jobs</span>
                            </a>
                          </li>
                          <li data-tab="my-bids">
                            <a href="#" title="">
                              <img src="/assets/images/ic5.png" alt="" />
                              <span>Bids</span>
                            </a>
                          </li>
                          <li data-tab="portfolio-dd">
                            <a href="#" title="">
                              <img src="/assets/images/ic3.png" alt="" />
                              <span>Portfolio</span>
                            </a>
                          </li>
                          <li data-tab="rewivewdata">
                            <a href="#" title="">
                              <img src="/assets/images/review.png" alt="" />
                              <span>Reviews</span>
                            </a>
                          </li>
                          <li data-tab="payment-dd">
                            <a href="#" title="">
                              <img src="/assets/images/ic6.png" alt="" />
                              <span>Settings</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="product-feed-tab" id="saved-jobs">
                      <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            id="mange-tab"
                            data-toggle="tab"
                            href="#mange"
                            role="tab"
                            aria-controls="home"
                            aria-selected="true"
                          >
                            Manage Jobs
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="saved-tab"
                            data-toggle="tab"
                            href="#saved"
                            role="tab"
                            aria-controls="profile"
                            aria-selected="false"
                          >
                            Saved Jobs
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="contact-tab"
                            data-toggle="tab"
                            href="#applied"
                            role="tab"
                            aria-controls="applied"
                            aria-selected="false"
                          >
                            Applied Jobs
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="cadidates-tab"
                            data-toggle="tab"
                            href="#cadidates"
                            role="tab"
                            aria-controls="contact"
                            aria-selected="false"
                          >
                            Applied cadidates
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content" id="myTabContent">
                        <div
                          className="tab-pane fade show active"
                          id="mange"
                          role="tabpanel"
                          aria-labelledby="mange-tab"
                        >
                          <div className="posts-bar">
                            <div className="post-bar bgclr">
                              <div className="wordpressdevlp">
                                <h2>Senior Wordpress Developer</h2>

                                <p>
                                  <i className="la la-clock-o"></i>Posted on 30
                                  August 2018
                                </p>
                              </div>
                              <br />
                              <div className="row no-gutters">
                                <div className="col-md-6 col-sm-12">
                                  <div className="cadidatesbtn">
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                    >
                                      <span className="badge badge-light">
                                        3
                                      </span>
                                      Candidates
                                    </button>
                                    <a href="#">
                                      <i className="far fa-edit"></i>
                                    </a>
                                    <a href="#">
                                      <i className="far fa-trash-alt"></i>
                                    </a>
                                  </div>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                  <ul className="bk-links bklink">
                                    <li>
                                      <a href="#" title="">
                                        <i className="la la-bookmark"></i>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#" title="">
                                        <i className="la la-envelope"></i>
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="posts-bar">
                            <div className="post-bar bgclr">
                              <div className="wordpressdevlp">
                                <h2>Senior Php Developer</h2>

                                <p>
                                  <i className="la la-clock-o"></i> Posted on 29
                                  August 2018
                                </p>
                              </div>
                              <br />
                              <div className="row no-gutters">
                                <div className="col-md-6 col-sm-12">
                                  <div className="cadidatesbtn">
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                    >
                                      <span className="badge badge-light">
                                        3
                                      </span>
                                      Candidates
                                    </button>
                                    <a href="#">
                                      <i className="far fa-edit"></i>
                                    </a>
                                    <a href="#">
                                      <i className="far fa-trash-alt"></i>
                                    </a>
                                  </div>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                  <ul className="bk-links bklink">
                                    <li>
                                      <a href="#" title="">
                                        <i className="la la-bookmark"></i>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#" title="">
                                        <i className="la la-envelope"></i>
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="posts-bar">
                            <div className="post-bar bgclr">
                              <div className="wordpressdevlp">
                                <h2>Senior UI UX Designer</h2>

                                <div className="row no-gutters">
                                  <div className="col-md-6 col-sm-12">
                                    <p className="posttext">
                                      <i className="la la-clock-o"></i>Posted on
                                      5 June 2018
                                    </p>
                                  </div>
                                  <div className="col-md-6 col-sm-12">
                                    <p>
                                      <i className="la la-clock-o"></i>Expiried
                                      on 5 October 2018
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <br />
                              <div className="row no-gutters">
                                <div className="col-md-6 col-sm-12">
                                  <div className="cadidatesbtn">
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                    >
                                      <span className="badge badge-light">
                                        3
                                      </span>
                                      Candidates
                                    </button>
                                    <a href="#">
                                      <i className="far fa-trash-alt"></i>
                                    </a>
                                  </div>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                  <ul className="bk-links bklink">
                                    <li>
                                      <a href="#" title="">
                                        <i className="la la-bookmark"></i>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#" title="">
                                        <i className="la la-envelope"></i>
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="saved"
                          role="tabpanel"
                          aria-labelledby="saved-tab"
                        >
                          <div className="post-bar">
                            <div className="p-all saved-post">
                              <div className="usy-dt">
                                <div className="wordpressdevlp">
                                  <h2>Senior Wordpress Developer</h2>

                                  <p>
                                    <i className="la la-clock-o"></i>Posted on
                                    30 August 2018
                                  </p>
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
                            <ul className="savedjob-info saved-info">
                              <li>
                                <h3>Applicants</h3>
                                <p>10</p>
                              </li>
                              <li>
                                <h3>Job Type</h3>
                                <p>Full Time</p>
                              </li>
                              <li>
                                <h3>Salary</h3>
                                <p>$600 - Mannual</p>
                              </li>
                              <li>
                                <h3>Posted : 5 Days Ago</h3>
                                <p>Open</p>
                              </li>
                              <div className="devepbtn saved-btn">
                                <a className="clrbtn" href="#">
                                  Unsaved
                                </a>
                                <a className="clrbtn" href="#">
                                  Message
                                </a>
                              </div>
                            </ul>
                          </div>
                          <div className="post-bar">
                            <div className="p-all saved-post">
                              <div className="usy-dt">
                                <div className="wordpressdevlp">
                                  <h2>Senior PHP Developer</h2>

                                  <p>
                                    <i className="la la-clock-o"></i>Posted on
                                    30 August 2018
                                  </p>
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
                            <ul className="savedjob-info saved-info">
                              <li>
                                <h3>Applicants</h3>
                                <p>10</p>
                              </li>
                              <li>
                                <h3>Job Type</h3>
                                <p>Full Time</p>
                              </li>
                              <li>
                                <h3>Salary</h3>
                                <p>$600 - Mannual</p>
                              </li>
                              <li>
                                <h3>Posted : 5 Days Ago</h3>
                                <p>Open</p>
                              </li>
                              <div className="devepbtn saved-btn">
                                <a className="clrbtn" href="#">
                                  Unsaved
                                </a>
                                <a className="clrbtn" href="#">
                                  Message
                                </a>
                              </div>
                            </ul>
                          </div>
                          <div className="post-bar">
                            <div className="p-all saved-post">
                              <div className="usy-dt">
                                <div className="wordpressdevlp">
                                  <h2>UI UX Designer</h2>

                                  <p>
                                    <i className="la la-clock-o"></i>Posted on
                                    30 August 2018
                                  </p>
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
                            <ul className="savedjob-info saved-info">
                              <li>
                                <h3>Applicants</h3>
                                <p>10</p>
                              </li>
                              <li>
                                <h3>Job Type</h3>
                                <p>Full Time</p>
                              </li>
                              <li>
                                <h3>Salary</h3>
                                <p>$600 - Mannual</p>
                              </li>
                              <li>
                                <h3>Posted : 5 Days Ago</h3>
                                <p>Open</p>
                              </li>
                              <div className="devepbtn saved-btn">
                                <a className="clrbtn" href="#">
                                  Unsaved
                                </a>
                                <a className="clrbtn" href="#">
                                  Message
                                </a>
                              </div>
                            </ul>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="applied"
                          role="tabpanel"
                          aria-labelledby="applied-tab"
                        >
                          <div className="post-bar">
                            <div className="p-all saved-post">
                              <div className="usy-dt">
                                <div className="wordpressdevlp">
                                  <h2>Senior Wordpress Developer</h2>

                                  <p>
                                    <i className="la la-clock-o"></i>Posted on
                                    30 August 2018
                                  </p>
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
                            <ul className="savedjob-info saved-info">
                              <li>
                                <h3>Applicants</h3>
                                <p>10</p>
                              </li>
                              <li>
                                <h3>Job Type</h3>
                                <p>Full Time</p>
                              </li>
                              <li>
                                <h3>Salary</h3>
                                <p>$600 - Mannual</p>
                              </li>
                              <li>
                                <h3>Posted : 5 Days Ago</h3>
                                <p>Open</p>
                              </li>
                              <div className="devepbtn saved-btn">
                                <a className="clrbtn" href="#">
                                  Applied
                                </a>
                                <a className="clrbtn" href="#">
                                  Message
                                </a>
                                <a href="#">
                                  <i className="far fa-trash-alt"></i>
                                </a>
                              </div>
                            </ul>
                          </div>
                          <div className="post-bar">
                            <div className="p-all saved-post">
                              <div className="usy-dt">
                                <div className="wordpressdevlp">
                                  <h2>Senior PHP Developer</h2>

                                  <p>
                                    <i className="la la-clock-o"></i>Posted on
                                    30 August 2018
                                  </p>
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
                            <ul className="savedjob-info saved-info">
                              <li>
                                <h3>Applicants</h3>
                                <p>10</p>
                              </li>
                              <li>
                                <h3>Job Type</h3>
                                <p>Full Time</p>
                              </li>
                              <li>
                                <h3>Salary</h3>
                                <p>$600 - Mannual</p>
                              </li>
                              <li>
                                <h3>Posted : 5 Days Ago</h3>
                                <p>Open</p>
                              </li>
                              <div className="devepbtn saved-btn">
                                <a className="clrbtn" href="#">
                                  Applied
                                </a>
                                <a className="clrbtn" href="#">
                                  Message
                                </a>
                                <a href="#">
                                  <i className="far fa-trash-alt"></i>
                                </a>
                              </div>
                            </ul>
                          </div>
                          <div className="post-bar">
                            <div className="p-all saved-post">
                              <div className="usy-dt">
                                <div className="wordpressdevlp">
                                  <h2>UI UX Designer</h2>

                                  <p>
                                    <i className="la la-clock-o"></i>Posted on
                                    30 August 2018
                                  </p>
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
                            <ul className="savedjob-info saved-info">
                              <li>
                                <h3>Applicants</h3>
                                <p>10</p>
                              </li>
                              <li>
                                <h3>Job Type</h3>
                                <p>Full Time</p>
                              </li>
                              <li>
                                <h3>Salary</h3>
                                <p>$600 - Mannual</p>
                              </li>
                              <li>
                                <h3>Posted : 5 Days Ago</h3>
                                <p>Open</p>
                              </li>
                              <div className="devepbtn saved-btn">
                                <a className="clrbtn" href="#">
                                  Applied
                                </a>
                                <a className="clrbtn" href="#">
                                  Message
                                </a>
                                <a href="#">
                                  <i className="far fa-trash-alt"></i>
                                </a>
                              </div>
                            </ul>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="cadidates"
                          role="tabpanel"
                          aria-labelledby="cadidates-tab"
                        >
                          <div className="post-bar">
                            <div className="post_topbar applied-post">
                              <div className="usy-dt">
                                <img
                                  src="/assets/images/resources/us-pic.png"
                                  alt=""
                                />
                                <div className="usy-name">
                                  <h3>John Doe</h3>
                                  <div className="epi-sec epi2">
                                    <ul className="descp descptab bklink">
                                      <li>
                                        <img
                                          src="/assets/images/icon8.png"
                                          alt=""
                                        />
                                        <span>Epic Coder</span>
                                      </li>
                                      <li>
                                        <img
                                          src="/assets/images/icon9.png"
                                          alt=""
                                        />
                                        <span>India</span>
                                      </li>
                                    </ul>
                                  </div>
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
                                      Accept
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
                              <div className="job_descp noborder">
                                <div className="star-descp review profilecnd">
                                  <ul className="bklik">
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
                                    <a href="#" title="">
                                      5.0 of 5 Reviews
                                    </a>
                                  </ul>
                                </div>
                                <div className="devepbtn appliedinfo noreply">
                                  <a className="clrbtn" href="#">
                                    Accept
                                  </a>
                                  <a className="clrbtn" href="#">
                                    View Profile
                                  </a>
                                  <a className="clrbtn" href="#">
                                    Message
                                  </a>
                                  <a href="#">
                                    <i className="far fa-trash-alt"></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="post-bar">
                            <div className="post_topbar  applied-post">
                              <div className="usy-dt">
                                <img
                                  src="/assets/images/resources/us-pic.png"
                                  alt=""
                                />
                                <div className="usy-name">
                                  <h3>John Doe</h3>
                                  <div className="epi-sec epi2">
                                    <ul className="descp descptab bklink">
                                      <li>
                                        <img
                                          src="/assets/images/icon8.png"
                                          alt=""
                                        />
                                        <span>Epic Coder</span>
                                      </li>
                                      <li>
                                        <img
                                          src="/assets/images/icon9.png"
                                          alt=""
                                        />
                                        <span>India</span>
                                      </li>
                                    </ul>
                                  </div>
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
                                      Accept
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
                              <div className="job_descp noborder">
                                <div className="star-descp review profilecnd">
                                  <ul className="bklik">
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
                                    <a href="#" title="">
                                      5.0 of 5 Reviews
                                    </a>
                                  </ul>
                                </div>
                                <div className="devepbtn appliedinfo noreply">
                                  <a className="clrbtn" href="#">
                                    Accept
                                  </a>
                                  <a className="clrbtn" href="#">
                                    View Profile
                                  </a>
                                  <a className="clrbtn" href="#">
                                    Message
                                  </a>
                                  <a href="#">
                                    <i className="far fa-trash-alt"></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="post-bar">
                            <div className="post_topbar applied-post">
                              <div className="usy-dt">
                                <img
                                  src="/assets/images/resources/us-pic.png"
                                  alt=""
                                />
                                <div className="usy-name">
                                  <h3>John Doe</h3>
                                  <div className="epi-sec epi2">
                                    <ul className="descp descptab bklink">
                                      <li>
                                        <img
                                          src="/assets/images/icon8.png"
                                          alt=""
                                        />
                                        <span>Epic Coder</span>
                                      </li>
                                      <li>
                                        <img
                                          src="/assets/images/icon9.png"
                                          alt=""
                                        />
                                        <span>India</span>
                                      </li>
                                    </ul>
                                  </div>
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
                                      Accept
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
                              <div className="job_descp noborder">
                                <div className="star-descp review profilecnd">
                                  <ul className="bklik">
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
                                    <a href="#" title="">
                                      5.0 of 5 Reviews
                                    </a>
                                  </ul>
                                </div>
                                <div className="devepbtn appliedinfo noreply">
                                  <a className="clrbtn" href="#">
                                    Accept
                                  </a>
                                  <a className="clrbtn" href="#">
                                    View Profile
                                  </a>
                                  <a className="clrbtn" href="#">
                                    Message
                                  </a>
                                  <a href="#">
                                    <i className="far fa-trash-alt"></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-feed-tab current" id="feed-dd">
                      <div className="posts-section">
                        <div className="post-bar">
                          <div className="post_topbar">
                            <div className="usy-dt">
                              <img
                                src="/assets/images/resources/us-pic.png"
                                alt=""
                              />
                              <div className="usy-name">
                                <h3>John Doe</h3>
                                <span>
                                  <img src="/assets/images/clock.png" alt="" />3
                                  min ago
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
                            <ul className="descp">
                              <li>
                                <img src="/assets/images/icon8.png" alt="" />
                                <span>Epic Coder</span>
                              </li>
                              <li>
                                <img src="/assets/images/icon9.png" alt="" />
                                <span>India</span>
                              </li>
                            </ul>
                            <ul className="bk-links">
                              <li>
                                <a href="#" title="">
                                  <i className="la la-bookmark"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  <i className="la la-envelope"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="job_descp">
                            <h3>Senior Wordpress Developer</h3>
                            <ul className="job-dt">
                              <li>
                                <a href="#" title="">
                                  Full Time
                                </a>
                              </li>
                              <li>
                                <span>$30 / hr</span>
                              </li>
                            </ul>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Aliquam luctus hendrerit metus, ut
                              ullamcorper quam finibus at. Etiam id magna sit
                              amet...{" "}
                              <a href="#" title="">
                                view more
                              </a>
                            </p>
                            <ul className="skill-tags">
                              <li>
                                <a href="#" title="">
                                  HTML
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  PHP
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  CSS
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  Javascript
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  Wordpress
                                </a>
                              </li>
                            </ul>
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
                                  <i className="fas fa-comment-alt"></i> Comment
                                  15
                                </a>
                              </li>
                            </ul>
                            <a href="#">
                              <i className="fas fa-eye"></i>Views 50
                            </a>
                          </div>
                        </div>
                        <div className="post-bar">
                          <div className="post_topbar">
                            <div className="usy-dt">
                              <img
                                src="/assets/images/resources/us-pic.png"
                                alt=""
                              />
                              <div className="usy-name">
                                <h3>John Doe</h3>
                                <span>
                                  <img src="/assets/images/clock.png" alt="" />3
                                  min ago
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
                            <ul className="descp">
                              <li>
                                <img src="/assets/images/icon8.png" alt="" />
                                <span>Front End Developer</span>
                              </li>
                              <li>
                                <img src="/assets/images/icon9.png" alt="" />
                                <span>India</span>
                              </li>
                            </ul>
                            <ul className="bk-links">
                              <li>
                                <a href="#" title="">
                                  <i className="la la-bookmark"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  <i className="la la-envelope"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#" title="" className="bid_now">
                                  Bid Now
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="job_descp">
                            <h3>Simple classNameified Site</h3>
                            <ul className="job-dt">
                              <li>
                                <span>$300 - $350</span>
                              </li>
                            </ul>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Aliquam luctus hendrerit metus, ut
                              ullamcorper quam finibus at. Etiam id magna sit
                              amet...{" "}
                              <a href="#" title="">
                                view more
                              </a>
                            </p>
                            <ul className="skill-tags">
                              <li>
                                <a href="#" title="">
                                  HTML
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  PHP
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  CSS
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  Javascript
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  Wordpress
                                </a>
                              </li>
                            </ul>
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
                                  <i className="fas fa-comment-alt"></i> Comment
                                  15
                                </a>
                              </li>
                            </ul>
                            <a href="#">
                              <i className="fas fa-eye"></i>Views 50
                            </a>
                          </div>
                        </div>
                        <div className="post-bar">
                          <div className="post_topbar">
                            <div className="usy-dt">
                              <img
                                src="/assets/images/resources/us-pc2.png"
                                alt=""
                              />
                              <div className="usy-name">
                                <h3>John Doe</h3>
                                <span>
                                  <img src="/assets/images/clock.png" alt="" />3
                                  min ago
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
                            <ul className="descp">
                              <li>
                                <img src="/assets/images/icon8.png" alt="" />
                                <span>Epic Coder</span>
                              </li>
                              <li>
                                <img src="/assets/images/icon9.png" alt="" />
                                <span>India</span>
                              </li>
                            </ul>
                            <ul className="bk-links">
                              <li>
                                <a href="#" title="">
                                  <i className="la la-bookmark"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  <i className="la la-envelope"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="job_descp">
                            <h3>Senior UI / UX designer</h3>
                            <ul className="job-dt">
                              <li>
                                <a href="#" title="">
                                  Par Time
                                </a>
                              </li>
                              <li>
                                <span>$10 / hr</span>
                              </li>
                            </ul>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Aliquam luctus hendrerit metus, ut
                              ullamcorper quam finibus at. Etiam id magna sit
                              amet...{" "}
                              <a href="#" title="">
                                view more
                              </a>
                            </p>
                            <ul className="skill-tags">
                              <li>
                                <a href="#" title="">
                                  HTML
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  PHP
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  CSS
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  Javascript
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  Wordpress
                                </a>
                              </li>
                            </ul>
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
                                  <i className="fas fa-comment-alt"></i> Comment
                                  15
                                </a>
                              </li>
                            </ul>
                            <a href="#">
                              <i className="fas fa-eye"></i>Views 50
                            </a>
                          </div>
                        </div>
                        <div className="post-bar">
                          <div className="post_topbar">
                            <div className="usy-dt">
                              <img
                                src="/assets/images/resources/us-pic.png"
                                alt=""
                              />
                              <div className="usy-name">
                                <h3>John Doe</h3>
                                <span>
                                  <img src="/assets/images/clock.png" alt="" />3
                                  min ago
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
                            <ul className="descp">
                              <li>
                                <img src="/assets/images/icon8.png" alt="" />
                                <span>Epic Coder</span>
                              </li>
                              <li>
                                <img src="/assets/images/icon9.png" alt="" />
                                <span>India</span>
                              </li>
                            </ul>
                            <ul className="bk-links">
                              <li>
                                <a href="#" title="">
                                  <i className="la la-bookmark"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  <i className="la la-envelope"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#" title="" className="bid_now">
                                  Bid Now
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="job_descp">
                            <h3>Ios Shopping mobile app</h3>
                            <ul className="job-dt">
                              <li>
                                <span>$300 - $350</span>
                              </li>
                            </ul>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Aliquam luctus hendrerit metus, ut
                              ullamcorper quam finibus at. Etiam id magna sit
                              amet...{" "}
                              <a href="#" title="">
                                view more
                              </a>
                            </p>
                            <ul className="skill-tags">
                              <li>
                                <a href="#" title="">
                                  HTML
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  PHP
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  CSS
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  Javascript
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  Wordpress
                                </a>
                              </li>
                            </ul>
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
                                  <i className="fas fa-comment-alt"></i> Comment
                                  15
                                </a>
                              </li>
                            </ul>
                            <a href="#">
                              <i className="fas fa-eye"></i>Views 50
                            </a>
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

                    <div className="product-feed-tab" id="my-bids">
                      <ul
                        className="nav nav-tabs bid-tab"
                        id="myTab"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            id="home-tab"
                            data-toggle="tab"
                            href="#home"
                            role="tab"
                            aria-controls="home"
                            aria-selected="true"
                          >
                            Manage Bids
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="bidders-tab"
                            data-toggle="tab"
                            href="#bidders"
                            role="tab"
                            aria-controls="contact"
                            aria-selected="false"
                          >
                            Manage Bidders
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="profile-tab"
                            data-toggle="tab"
                            href="#profile"
                            role="tab"
                            aria-controls="profile"
                            aria-selected="false"
                          >
                            My Active Bids
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content" id="myTabContent">
                        <div
                          className="tab-pane fade show active"
                          id="home"
                          role="tabpanel"
                          aria-labelledby="home-tab"
                        >
                          <div className="post-bar">
                            <div className="post_topbar">
                              <div className="wordpressdevlp">
                                <h2>Travel Wordpress Theme</h2>

                                <p>
                                  <i className="la la-clock-o"></i>5 Hour Lefts
                                </p>
                              </div>
                              <ul className="savedjob-info mangebid manbids">
                                <li>
                                  <h3>Bids</h3>
                                  <p>4</p>
                                </li>
                                <li>
                                  <h3>Avg Bid (USD)</h3>
                                  <p>$510</p>
                                </li>
                                <li>
                                  <h3>Project Budget (USD)</h3>
                                  <p>$500 - $600</p>
                                </li>
                                <ul className="bk-links bklink">
                                  <li>
                                    <a href="#" title="">
                                      <i className="la la-bookmark"></i>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" title="">
                                      <i className="la la-envelope"></i>
                                    </a>
                                  </li>
                                </ul>
                              </ul>
                              <br />
                              <div className="cadidatesbtn bidsbtn">
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                >
                                  <span className="badge badge-light">3</span>
                                  Candidates
                                </button>
                                <a href="#">
                                  <i className="far fa-edit"></i>
                                </a>
                                <a href="#">
                                  <i className="far fa-trash-alt"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="post-bar">
                            <div className="post_topbar">
                              <div className="wordpressdevlp">
                                <h2>Travel Wordpress Theme</h2>

                                <p>
                                  <i className="la la-clock-o"></i>5 Hour Lefts
                                </p>
                              </div>
                              <ul className="savedjob-info mangebid manbids">
                                <li>
                                  <h3>Bids</h3>
                                  <p>4</p>
                                </li>
                                <li>
                                  <h3>Avg Bid (USD)</h3>
                                  <p>$510</p>
                                </li>
                                <li>
                                  <h3>Project Budget (USD)</h3>
                                  <p>$500 - $600</p>
                                </li>
                                <ul className="bk-links bklink">
                                  <li>
                                    <a href="#" title="">
                                      <i className="la la-bookmark"></i>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" title="">
                                      <i className="la la-envelope"></i>
                                    </a>
                                  </li>
                                </ul>
                              </ul>
                              <br />
                              <div className="cadidatesbtn bidsbtn">
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                >
                                  <span className="badge badge-light">3</span>
                                  Candidates
                                </button>
                                <a href="#">
                                  <i className="far fa-edit"></i>
                                </a>
                                <a href="#">
                                  <i className="far fa-trash-alt"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="post-bar">
                            <div className="post_topbar">
                              <div className="wordpressdevlp">
                                <h2>Travel Wordpress Theme</h2>

                                <p>
                                  <i className="la la-clock-o"></i>5 Hour Lefts
                                </p>
                              </div>
                              <ul className="savedjob-info mangebid manbids">
                                <li>
                                  <h3>Bids</h3>
                                  <p>4</p>
                                </li>
                                <li>
                                  <h3>Avg Bid (USD)</h3>
                                  <p>$510</p>
                                </li>
                                <li>
                                  <h3>Project Budget (USD)</h3>
                                  <p>$500 - $600</p>
                                </li>
                                <ul className="bk-links bklink">
                                  <li>
                                    <a href="#" title="">
                                      <i className="la la-bookmark"></i>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" title="">
                                      <i className="la la-envelope"></i>
                                    </a>
                                  </li>
                                </ul>
                              </ul>
                              <br />
                              <div className="cadidatesbtn bidsbtn">
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                >
                                  <span className="badge badge-light">3</span>
                                  Candidates
                                </button>
                                <a href="#">
                                  <i className="far fa-edit"></i>
                                </a>
                                <a href="#">
                                  <i className="far fa-trash-alt"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="profile"
                          role="tabpanel"
                          aria-labelledby="profile-tab"
                        >
                          <div className="post-bar">
                            <div className="post_topbar active-bids">
                              <div className="usy-dt">
                                <div className="wordpressdevlp">
                                  <h2>Travel Wordpress Theme</h2>
                                </div>
                              </div>
                            </div>
                            <ul className="savedjob-info activ-bidinfo">
                              <li>
                                <h3>Fixed Price</h3>
                                <p>$500</p>
                              </li>
                              <li>
                                <h3>Delivery Time</h3>
                                <p>8 Days</p>
                              </li>
                              <div className="devepbtn activebtn">
                                <a href="#">
                                  <i className="far fa-edit"></i>
                                </a>
                                <a href="#">
                                  <i className="far fa-trash-alt"></i>
                                </a>
                              </div>
                            </ul>
                          </div>
                          <div className="post-bar">
                            <div className="post_topbar active-bids">
                              <div className="usy-dt">
                                <div className="wordpressdevlp">
                                  <h2>Restaurant Android Application</h2>
                                </div>
                              </div>
                            </div>
                            <ul className="savedjob-info activ-bidinfo">
                              <li>
                                <h3>Fixed Price</h3>
                                <p>$1500</p>
                              </li>
                              <li>
                                <h3>Delivery Time</h3>
                                <p>15 Days</p>
                              </li>
                              <div className="devepbtn activebtn">
                                <a href="#">
                                  <i className="far fa-edit"></i>
                                </a>
                                <a href="#">
                                  <i className="far fa-trash-alt"></i>
                                </a>
                              </div>
                            </ul>
                          </div>
                          <div className="post-bar">
                            <div className="post_topbar active-bids">
                              <div className="usy-dt">
                                <div className="wordpressdevlp">
                                  <h2>
                                    Online Shopping Html Template with PHP
                                  </h2>
                                </div>
                              </div>
                            </div>
                            <ul className="savedjob-info activ-bidinfo">
                              <li>
                                <h3>Fixed Price</h3>
                                <p>$1500</p>
                              </li>
                              <li>
                                <h3>Delivery Time</h3>
                                <p>15 Days</p>
                              </li>
                              <div className="devepbtn activebtn">
                                <a href="#">
                                  <i className="far fa-edit"></i>
                                </a>
                                <a href="#">
                                  <i className="far fa-trash-alt"></i>
                                </a>
                              </div>
                            </ul>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="contact"
                          role="tabpanel"
                          aria-labelledby="contact-tab"
                        >
                          <div className="post-bar">
                            <div className="post_topbar">
                              <div className="usy-dt">
                                <div className="wordpressdevlp">
                                  <h2>Senior Wordpress Developer</h2>
                                  <br />
                                  <p>
                                    <i className="la la-clock-o"></i>Posted on
                                    30 August 2018
                                  </p>
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
                            <ul className="savedjob-info">
                              <li>
                                <h3>Applicants</h3>
                                <p>10</p>
                              </li>
                              <li>
                                <h3>Job Type</h3>
                                <p>Full Time</p>
                              </li>
                              <li>
                                <h3>Salary</h3>
                                <p>$600 - Mannual</p>
                              </li>
                              <li>
                                <h3>Posted : 5 Days Ago</h3>
                                <p>Open</p>
                              </li>
                              <div className="devepbtn">
                                <a className="clrbtn" href="#">
                                  Applied
                                </a>
                                <a className="clrbtn" href="#">
                                  Message
                                </a>
                                <a href="#">
                                  <i className="far fa-trash-alt"></i>
                                </a>
                              </div>
                            </ul>
                          </div>
                          <div className="post-bar">
                            <div className="post_topbar">
                              <div className="usy-dt">
                                <div className="wordpressdevlp">
                                  <h2>Senior PHP Developer</h2>
                                  <br />
                                  <p>
                                    <i className="la la-clock-o"></i>Posted on
                                    30 August 2018
                                  </p>
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
                            <ul className="savedjob-info">
                              <li>
                                <h3>Applicants</h3>
                                <p>10</p>
                              </li>
                              <li>
                                <h3>Job Type</h3>
                                <p>Full Time</p>
                              </li>
                              <li>
                                <h3>Salary</h3>
                                <p>$600 - Mannual</p>
                              </li>
                              <li>
                                <h3>Posted : 5 Days Ago</h3>
                                <p>Open</p>
                              </li>
                              <div className="devepbtn">
                                <a className="clrbtn" href="#">
                                  Applied
                                </a>
                                <a className="clrbtn" href="#">
                                  Message
                                </a>
                                <a href="#">
                                  <i className="far fa-trash-alt"></i>
                                </a>
                              </div>
                            </ul>
                          </div>
                          <div className="post-bar">
                            <div className="post_topbar">
                              <div className="usy-dt">
                                <div className="wordpressdevlp">
                                  <h2>UI UX Designer</h2>
                                  <br />
                                  <p>
                                    <i className="la la-clock-o"></i>Posted on
                                    30 August 2018
                                  </p>
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
                            <ul className="savedjob-info">
                              <li>
                                <h3>Applicants</h3>
                                <p>10</p>
                              </li>
                              <li>
                                <h3>Job Type</h3>
                                <p>Full Time</p>
                              </li>
                              <li>
                                <h3>Salary</h3>
                                <p>$600 - Mannual</p>
                              </li>
                              <li>
                                <h3>Posted : 5 Days Ago</h3>
                                <p>Open</p>
                              </li>
                              <div className="devepbtn">
                                <a className="clrbtn" href="#">
                                  Applied
                                </a>
                                <a className="clrbtn" href="#">
                                  Message
                                </a>
                                <a href="#">
                                  <i className="far fa-trash-alt"></i>
                                </a>
                              </div>
                            </ul>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="bidders"
                          role="tabpanel"
                          aria-labelledby="bidders-tab"
                        >
                          <div className="post-bar">
                            <div className="post_topbar post-bid">
                              <div className="usy-dt">
                                <img
                                  src="/assets/images/resources/us-pic.png"
                                  alt=""
                                />
                                <div className="usy-name">
                                  <h3>John Doe</h3>
                                  <div className="epi-sec epi2">
                                    <ul className="descp descptab bklink">
                                      <li>
                                        <img
                                          src="/assets/images/icon8.png"
                                          alt=""
                                        />
                                        <span>Epic Coder</span>
                                      </li>
                                      <li>
                                        <img
                                          src="/assets/images/icon9.png"
                                          alt=""
                                        />
                                        <span>India</span>
                                      </li>
                                    </ul>
                                  </div>
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
                                      Accept
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
                              <div className="job_descp noborder">
                                <div className="star-descp review profilecnd">
                                  <ul className="bklik">
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
                                    <a href="#" title="">
                                      5.0 of 5 Reviews
                                    </a>
                                  </ul>
                                </div>
                                <ul className="savedjob-info biddersinfo">
                                  <li>
                                    <h3>Fixed Price</h3>
                                    <p>$500</p>
                                  </li>
                                  <li>
                                    <h3>Delivery Time</h3>
                                    <p>10 Days</p>
                                  </li>
                                </ul>
                                <div className="devepbtn appliedinfo bidsbtn">
                                  <a className="clrbtn" href="#">
                                    Accept
                                  </a>
                                  <a className="clrbtn" href="#">
                                    View Profile
                                  </a>
                                  <a className="clrbtn" href="#">
                                    Message
                                  </a>
                                  <a href="#">
                                    <i className="far fa-trash-alt"></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="post-bar">
                            <div className="post_topbar post-bid">
                              <div className="usy-dt">
                                <img
                                  src="/assets/images/resources/Jassica.html"
                                  alt=""
                                />
                                <div className="usy-name">
                                  <h3>John Doe</h3>
                                  <div className="epi-sec epi2">
                                    <ul className="descp descptab bklink">
                                      <li>
                                        <img
                                          src="/assets/images/icon8.png"
                                          alt=""
                                        />
                                        <span>Epic Coder</span>
                                      </li>
                                      <li>
                                        <img
                                          src="/assets/images/icon9.png"
                                          alt=""
                                        />
                                        <span>India</span>
                                      </li>
                                    </ul>
                                  </div>
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
                                      Accept
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
                              <div className="job_descp noborder">
                                <div className="star-descp review profilecnd">
                                  <ul className="bklik">
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
                                    <a href="#" title="">
                                      5.0 of 5 Reviews
                                    </a>
                                  </ul>
                                </div>
                                <ul className="savedjob-info biddersinfo">
                                  <li>
                                    <h3>Fixed Price</h3>
                                    <p>$500</p>
                                  </li>
                                  <li>
                                    <h3>Delivery Time</h3>
                                    <p>10 Days</p>
                                  </li>
                                </ul>
                                <div className="devepbtn appliedinfo bidsbtn">
                                  <a className="clrbtn" href="#">
                                    Accept
                                  </a>
                                  <a className="clrbtn" href="#">
                                    View Profile
                                  </a>
                                  <a className="clrbtn" href="#">
                                    Message
                                  </a>
                                  <a href="#">
                                    <i className="far fa-trash-alt"></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="post-bar">
                            <div className="post_topbar post-bid">
                              <div className="usy-dt">
                                <img
                                  src="/assets/images/resources/rock.jpg"
                                  alt=""
                                />
                                <div className="usy-name">
                                  <h3>John Doe</h3>
                                  <div className="epi-sec epi2">
                                    <ul className="descp descptab bklink">
                                      <li>
                                        <img
                                          src="/assets/images/icon8.png"
                                          alt=""
                                        />
                                        <span>Epic Coder</span>
                                      </li>
                                      <li>
                                        <img
                                          src="/assets/images/icon9.png"
                                          alt=""
                                        />
                                        <span>India</span>
                                      </li>
                                    </ul>
                                  </div>
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
                                      Accept
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
                              <div className="job_descp noborder">
                                <div className="star-descp review profilecnd">
                                  <ul className="bklik">
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
                                    <a href="#" title="">
                                      5.0 of 5 Reviews
                                    </a>
                                  </ul>
                                </div>
                                <ul className="savedjob-info biddersinfo">
                                  <li>
                                    <h3>Fixed Price</h3>
                                    <p>$500</p>
                                  </li>
                                  <li>
                                    <h3>Delivery Time</h3>
                                    <p>10 Days</p>
                                  </li>
                                </ul>
                                <div className="devepbtn appliedinfo bidsbtn">
                                  <a className="clrbtn" href="#">
                                    Accept
                                  </a>
                                  <a className="clrbtn" href="#">
                                    View Profile
                                  </a>
                                  <a className="clrbtn" href="#">
                                    Message
                                  </a>
                                  <a href="#">
                                    <i className="far fa-trash-alt"></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="product-feed-tab" id="info-dd">
                      <div className="user-profile-ov">
                        <h3>
                          <a href="#" title="" className="overview-open">
                            Overview
                          </a>{" "}
                          <a href="#" title="" className="overview-open">
                            <i className="fa fa-pencil"></i>
                          </a>
                        </h3>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Quisque tempor aliquam felis, nec condimentum
                          ipsum commodo id. Vivamus sit amet augue nec urna
                          efficitur tincidunt. Vivamus consectetur aliquam
                          lectus commodo viverra. Nunc eu augue nec arcu
                          efficitur faucibus. Aliquam accumsan ac magna
                          convallis bibendum. Quisque laoreet augue eget augue
                          fermentum scelerisque. Vivamus dignissim mollis est
                          dictum blandit. Nam porta auctor neque sed congue.
                          Nullam rutrum eget ex at maximus. Lorem ipsum dolor
                          sit amet, consectetur adipiscing elit. Donec eget
                          vestibulum lorem.
                        </p>
                      </div>
                      <div className="user-profile-ov st2">
                        <h3>
                          <a href="#" title="" className="exp-bx-open">
                            Experience{" "}
                          </a>
                          <a href="#" title="" className="exp-bx-open">
                            <i className="fa fa-pencil"></i>
                          </a>{" "}
                          <a href="#" title="" className="exp-bx-open">
                            <i className="fa fa-plus-square"></i>
                          </a>
                        </h3>
                        <h4>
                          Web designer{" "}
                          <a href="#" title="">
                            <i className="fa fa-pencil"></i>
                          </a>
                        </h4>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Quisque tempor aliquam felis, nec condimentum
                          ipsum commodo id. Vivamus sit amet augue nec urna
                          efficitur tincidunt. Vivamus consectetur aliquam
                          lectus commodo viverra.{" "}
                        </p>
                        <h4>
                          UI / UX Designer{" "}
                          <a href="#" title="">
                            <i className="fa fa-pencil"></i>
                          </a>
                        </h4>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Quisque tempor aliquam felis, nec condimentum
                          ipsum commodo id.
                        </p>
                        <h4>
                          PHP developer{" "}
                          <a href="#" title="">
                            <i className="fa fa-pencil"></i>
                          </a>
                        </h4>
                        <p className="no-margin">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Quisque tempor aliquam felis, nec condimentum
                          ipsum commodo id. Vivamus sit amet augue nec urna
                          efficitur tincidunt. Vivamus consectetur aliquam
                          lectus commodo viverra.{" "}
                        </p>
                      </div>
                      <div className="user-profile-ov">
                        <h3>
                          <a href="#" title="" className="ed-box-open">
                            Education
                          </a>{" "}
                          <a href="#" title="" className="ed-box-open">
                            <i className="fa fa-pencil"></i>
                          </a>{" "}
                          <a href="#" title="">
                            <i className="fa fa-plus-square"></i>
                          </a>
                        </h3>
                        <h4>Master of Computer Science</h4>
                        <span>2015 - 2018</span>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Quisque tempor aliquam felis, nec condimentum
                          ipsum commodo id. Vivamus sit amet augue nec urna
                          efficitur tincidunt. Vivamus consectetur aliquam
                          lectus commodo viverra.{" "}
                        </p>
                      </div>
                      <div className="user-profile-ov">
                        <h3>
                          <a href="#" title="" className="lct-box-open">
                            Location
                          </a>{" "}
                          <a href="#" title="" className="lct-box-open">
                            <i className="fa fa-pencil"></i>
                          </a>{" "}
                          <a href="#" title="">
                            <i className="fa fa-plus-square"></i>
                          </a>
                        </h3>
                        <h4>India</h4>
                        <p>151/4 BT Chownk, Delhi </p>
                      </div>
                      <div className="user-profile-ov">
                        <h3>
                          <a href="#" title="" className="skills-open">
                            Skills
                          </a>{" "}
                          <a href="#" title="" className="skills-open">
                            <i className="fa fa-pencil"></i>
                          </a>{" "}
                          <a href="#">
                            <i className="fa fa-plus-square"></i>
                          </a>
                        </h3>
                        <ul>
                          <li>
                            <a href="#" title="">
                              HTML
                            </a>
                          </li>
                          <li>
                            <a href="#" title="">
                              PHP
                            </a>
                          </li>
                          <li>
                            <a href="#" title="">
                              CSS
                            </a>
                          </li>
                          <li>
                            <a href="#" title="">
                              Javascript
                            </a>
                          </li>
                          <li>
                            <a href="#" title="">
                              Wordpress
                            </a>
                          </li>
                          <li>
                            <a href="#" title="">
                              Photoshop
                            </a>
                          </li>
                          <li>
                            <a href="#" title="">
                              Illustrator
                            </a>
                          </li>
                          <li>
                            <a href="#" title="">
                              Corel Draw
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="product-feed-tab" id="rewivewdata">
                      <section></section>

                      <div className="posts-section">
                        <div className="post-bar reviewtitle">
                          <h2>Reviews</h2>
                        </div>
                        <div className="post-bar ">
                          <div className="post_topbar">
                            <div className="usy-dt">
                              <img
                                src="/assets/images/resources/bg-img3.png"
                                alt=""
                              />
                              <div className="usy-name">
                                <h3>Rock William</h3>
                                <div className="epi-sec epi2">
                                  <ul className="descp review-lt">
                                    <li>
                                      <img
                                        src="/assets/images/icon8.png"
                                        alt=""
                                      />
                                      <span>Epic Coder</span>
                                    </li>
                                    <li>
                                      <img
                                        src="/assets/images/icon9.png"
                                        alt=""
                                      />
                                      <span>India</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="job_descp mngdetl">
                            <div className="star-descp review">
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
                              <a href="#" title="">
                                5.0 of 5 Reviews
                              </a>
                            </div>
                            <div className="reviewtext">
                              <p>
                                Lorem ipsum dolor sit amet, adipiscing elit.
                                Nulla luctus mi et porttitor ultrices
                              </p>
                              <hr />
                            </div>

                            <div className="post_topbar post-reply">
                              <div className="usy-dt">
                                <img
                                  src="/assets/images/resources/bg-img4.png"
                                  alt=""
                                />
                                <div className="usy-name">
                                  <h3>John Doe</h3>
                                  <div className="epi-sec epi2">
                                    <p>
                                      <i className="la la-clock-o"></i>3 min ago
                                    </p>
                                    <p className="tahnks">Thanks :)</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="post_topbar rep-post rep-thanks">
                              <hr />
                              <div className="usy-dt">
                                <img
                                  src="/assets/images/resources/bg-img4.png"
                                  alt=""
                                />
                                <input
                                  className="reply"
                                  type="text"
                                  placeholder="Reply"
                                />
                                <a className="replybtn" href="#">
                                  Send
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="post-bar post-thanks">
                          <div className="post_topbar">
                            <div className="usy-dt">
                              <img
                                src="/assets/images/resources/bg-img1.png"
                                alt=""
                              />
                              <div className="usy-name">
                                <h3>Jassica William</h3>
                                <div className="epi-sec epi2">
                                  <ul className="descp review-lt">
                                    <li>
                                      <img
                                        src="/assets/images/icon8.png"
                                        alt=""
                                      />
                                      <span>Epic Coder</span>
                                    </li>
                                    <li>
                                      <img
                                        src="/assets/images/icon9.png"
                                        alt=""
                                      />
                                      <span>India</span>
                                    </li>
                                  </ul>
                                </div>
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

                          <div className="job_descp mngdetl">
                            <div className="star-descp review">
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
                              <a href="#" title="">
                                5.0 of 5 Reviews
                              </a>
                              <br />
                              <p>Awesome Work, Thanks John!</p>
                              <hr />
                            </div>
                            <div className="post_topbar rep-post">
                              <div className="usy-dt">
                                <img
                                  src="/assets/images/resources/bg-img4.png"
                                  alt=""
                                />

                                <input
                                  className="reply"
                                  type="text"
                                  placeholder="Reply"
                                />
                                <a className="replybtn" href="#">
                                  Send
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-feed-tab" id="my-bids">
                      <div className="posts-section">
                        <div className="post-bar">
                          <div className="post_topbar">
                            <div className="usy-dt">
                              <img
                                src="/assets/images/resources/us-pic.png"
                                alt=""
                              />
                              <div className="usy-name">
                                <h3>John Doe</h3>
                                <span>
                                  <img src="/assets/images/clock.png" alt="" />3
                                  min ago
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
                            <ul className="descp">
                              <li>
                                <img src="/assets/images/icon8.png" alt="" />
                                <span>Frontend Developer</span>
                              </li>
                              <li>
                                <img src="/assets/images/icon9.png" alt="" />
                                <span>India</span>
                              </li>
                            </ul>
                            <ul className="bk-links">
                              <li>
                                <a href="#" title="">
                                  <i className="la la-bookmark"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  <i className="la la-envelope"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#" title="" className="bid_now">
                                  Bid Now
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="job_descp">
                            <h3>Simple classNameified Site</h3>
                            <ul className="job-dt">
                              <li>
                                <span>$300 - $350</span>
                              </li>
                            </ul>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Aliquam luctus hendrerit metus, ut
                              ullamcorper quam finibus at. Etiam id magna sit
                              amet...{" "}
                              <a href="#" title="">
                                view more
                              </a>
                            </p>
                            <ul className="skill-tags">
                              <li>
                                <a href="#" title="">
                                  HTML
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  PHP
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  CSS
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  Javascript
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  Wordpress
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  Photoshop
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  Illustrator
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  Corel Draw
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="job-status-bar">
                            <ul className="like-com">
                              <li>
                                <a href="#">
                                  <i className="la la-heart"></i> Like
                                </a>
                                <img
                                  src="/assets/images/liked-img.png"
                                  alt=""
                                />
                                <span>25</span>
                              </li>
                              <li>
                                <a href="#" title="" className="com">
                                  <img src="/assets/images/com.png" alt="" />{" "}
                                  Comment 15
                                </a>
                              </li>
                            </ul>
                            <a>
                              <i className="la la-eye"></i>Views 50
                            </a>
                          </div>
                        </div>
                        <div className="post-bar">
                          <div className="post_topbar">
                            <div className="usy-dt">
                              <img
                                src="/assets/images/resources/us-pic.png"
                                alt=""
                              />
                              <div className="usy-name">
                                <h3>John Doe</h3>
                                <span>
                                  <img src="/assets/images/clock.png" alt="" />3
                                  min ago
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
                            <ul className="descp">
                              <li>
                                <img src="/assets/images/icon8.png" alt="" />
                                <span>Frontend Developer</span>
                              </li>
                              <li>
                                <img src="/assets/images/icon9.png" alt="" />
                                <span>India</span>
                              </li>
                            </ul>
                            <ul className="bk-links">
                              <li>
                                <a href="#" title="">
                                  <i className="la la-bookmark"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  <i className="la la-envelope"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#" title="" className="bid_now">
                                  Bid Now
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="job_descp">
                            <h3>Ios Shopping mobile app</h3>
                            <ul className="job-dt">
                              <li>
                                <span>$300 - $350</span>
                              </li>
                            </ul>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Aliquam luctus hendrerit metus, ut
                              ullamcorper quam finibus at. Etiam id magna sit
                              amet...{" "}
                              <a href="#" title="">
                                view more
                              </a>
                            </p>
                            <ul className="skill-tags">
                              <li>
                                <a href="#" title="">
                                  HTML
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  PHP
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  CSS
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  Javascript
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  Wordpress
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  Photoshop
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  Illustrator
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  Corel Draw
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="job-status-bar">
                            <ul className="like-com">
                              <li>
                                <a href="#">
                                  <i className="la la-heart"></i> Like
                                </a>
                                <img
                                  src="/assets/images/liked-img.png"
                                  alt=""
                                />
                                <span>25</span>
                              </li>
                              <li>
                                <a href="#" title="" className="com">
                                  <img src="/assets/images/com.png" alt="" />{" "}
                                  Comment 15
                                </a>
                              </li>
                            </ul>
                            <a>
                              <i className="la la-eye"></i>Views 50
                            </a>
                          </div>
                        </div>
                        <div className="post-bar">
                          <div className="post_topbar">
                            <div className="usy-dt">
                              <img
                                src="/assets/images/resources/us-pic.png"
                                alt=""
                              />
                              <div className="usy-name">
                                <h3>John Doe</h3>
                                <span>
                                  <img src="/assets/images/clock.png" alt="" />3
                                  min ago
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
                            <ul className="descp">
                              <li>
                                <img src="/assets/images/icon8.png" alt="" />
                                <span>Frontend Developer</span>
                              </li>
                              <li>
                                <img src="/assets/images/icon9.png" alt="" />
                                <span>India</span>
                              </li>
                            </ul>
                            <ul className="bk-links">
                              <li>
                                <a href="#" title="">
                                  <i className="la la-bookmark"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  <i className="la la-envelope"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#" title="" className="bid_now">
                                  Bid Now
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="job_descp">
                            <h3>Simple classNameified Site</h3>
                            <ul className="job-dt">
                              <li>
                                <span>$300 - $350</span>
                              </li>
                            </ul>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Aliquam luctus hendrerit metus, ut
                              ullamcorper quam finibus at. Etiam id magna sit
                              amet...{" "}
                              <a href="#" title="">
                                view more
                              </a>
                            </p>
                            <ul className="skill-tags">
                              <li>
                                <a href="#" title="">
                                  HTML
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  PHP
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  CSS
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  Javascript
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  Wordpress
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  Photoshop
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  Illustrator
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  Corel Draw
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="job-status-bar">
                            <ul className="like-com">
                              <li>
                                <a href="#">
                                  <i className="la la-heart"></i> Like
                                </a>
                                <img
                                  src="/assets/images/liked-img.png"
                                  alt=""
                                />
                                <span>25</span>
                              </li>
                              <li>
                                <a href="#" title="" className="com">
                                  <img src="/assets/images/com.png" alt="" />{" "}
                                  Comment 15
                                </a>
                              </li>
                            </ul>
                            <a>
                              <i className="la la-eye"></i>Views 50
                            </a>
                          </div>
                        </div>
                        <div className="post-bar">
                          <div className="post_topbar">
                            <div className="usy-dt">
                              <img
                                src="/assets/images/resources/us-pic.png"
                                alt=""
                              />
                              <div className="usy-name">
                                <h3>John Doe</h3>
                                <span>
                                  <img src="/assets/images/clock.png" alt="" />3
                                  min ago
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
                            <ul className="descp">
                              <li>
                                <img src="/assets/images/icon8.png" alt="" />
                                <span>Frontend Developer</span>
                              </li>
                              <li>
                                <img src="/assets/images/icon9.png" alt="" />
                                <span>India</span>
                              </li>
                            </ul>
                            <ul className="bk-links">
                              <li>
                                <a href="#" title="">
                                  <i className="la la-bookmark"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  <i className="la la-envelope"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#" title="" className="bid_now">
                                  Bid Now
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="job_descp">
                            <h3>Ios Shopping mobile app</h3>
                            <ul className="job-dt">
                              <li>
                                <span>$300 - $350</span>
                              </li>
                            </ul>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Aliquam luctus hendrerit metus, ut
                              ullamcorper quam finibus at. Etiam id magna sit
                              amet...{" "}
                              <a href="#" title="">
                                view more
                              </a>
                            </p>
                            <ul className="skill-tags">
                              <li>
                                <a href="#" title="">
                                  HTML
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  PHP
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  CSS
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  Javascript
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  Wordpress
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  Photoshop
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  Illustrator
                                </a>
                              </li>
                              <li>
                                <a href="#" title="">
                                  Corel Draw
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="job-status-bar">
                            <ul className="like-com">
                              <li>
                                <a href="#">
                                  <i className="la la-heart"></i> Like
                                </a>
                                <img
                                  src="/assets/images/liked-img.png"
                                  alt=""
                                />
                                <span>25</span>
                              </li>
                              <li>
                                <a href="#" title="" className="com">
                                  <img src="/assets/images/com.png" alt="" />{" "}
                                  Comment 15
                                </a>
                              </li>
                            </ul>
                            <a>
                              <i className="la la-eye"></i>Views 50
                            </a>
                          </div>
                        </div>
                        <div className="process-comm">
                          <a href="#" title="">
                            <img src="/assets/images/process-icon.png" alt="" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="product-feed-tab" id="portfolio-dd">
                      <div className="portfolio-gallery-sec">
                        <h3>Portfolio</h3>
                        <div className="portfolio-btn">
                          <a href="#" title="">
                            <i className="fas fa-plus-square"></i> Add Portfolio
                          </a>
                        </div>
                        <div className="gallery_pf">
                          <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                              <div className="gallery_pt">
                                <img
                                  src="/assets/images/resources/pf-img1.jpg"
                                  alt=""
                                />
                                <a href="#" title="">
                                  <img
                                    src="/assets/images/all-out.png"
                                    alt=""
                                  />
                                </a>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                              <div className="gallery_pt">
                                <img
                                  src="/assets/images/resources/pf-img2.jpg"
                                  alt=""
                                />
                                <a href="#" title="">
                                  <img
                                    src="/assets/images/all-out.png"
                                    alt=""
                                  />
                                </a>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                              <div className="gallery_pt">
                                <img
                                  src="/assets/images/resources/pf-img3.jpg"
                                  alt=""
                                />
                                <a href="#" title="">
                                  <img
                                    src="/assets/images/all-out.png"
                                    alt=""
                                  />
                                </a>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                              <div className="gallery_pt">
                                <img
                                  src="/assets/images/resources/pf-img4.jpg"
                                  alt=""
                                />
                                <a href="#" title="">
                                  <img
                                    src="/assets/images/all-out.png"
                                    alt=""
                                  />
                                </a>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                              <div className="gallery_pt">
                                <img
                                  src="/assets/images/resources/pf-img5.jpg"
                                  alt=""
                                />
                                <a href="#" title="">
                                  <img
                                    src="/assets/images/all-out.png"
                                    alt=""
                                  />
                                </a>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                              <div className="gallery_pt">
                                <img
                                  src="/assets/images/resources/pf-img6.jpg"
                                  alt=""
                                />
                                <a href="#" title="">
                                  <img
                                    src="/assets/images/all-out.png"
                                    alt=""
                                  />
                                </a>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                              <div className="gallery_pt">
                                <img
                                  src="/assets/images/resources/pf-img7.jpg"
                                  alt=""
                                />
                                <a href="#" title="">
                                  <img
                                    src="/assets/images/all-out.png"
                                    alt=""
                                  />
                                </a>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                              <div className="gallery_pt">
                                <img
                                  src="/assets/images/resources/pf-img8.jpg"
                                  alt=""
                                />
                                <a href="#" title="">
                                  <img
                                    src="/assets/images/all-out.png"
                                    alt=""
                                  />
                                </a>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                              <div className="gallery_pt">
                                <img
                                  src="/assets/images/resources/pf-img9.jpg"
                                  alt=""
                                />
                                <a href="#" title="">
                                  <img
                                    src="/assets/images/all-out.png"
                                    alt=""
                                  />
                                </a>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                              <div className="gallery_pt">
                                <img
                                  src="/assets/images/resources/pf-img10.jpg"
                                  alt=""
                                />
                                <a href="#" title="">
                                  <img
                                    src="/assets/images/all-out.png"
                                    alt=""
                                  />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {isAdmin && (
                      <div className="product-feed-tab" id="payment-dd">
                        <div className="billing-method">
                          <ul>
                            <li>
                              <h3>Ajouter Departement</h3>
                              <a href="#" title="">
                                <i className="fa fa-plus-circle"></i>
                              </a>
                            </li>
                            {/* <li>
                            <h3>voir unites</h3>
                            <a href="#" title="">
                              View All
                            </a>
                          </li> */}
                          </ul>
                          <div className="lt-sec">
                            <img src="/assets/images/lt-icon.png" alt="" />
                            <h4>liste des departements </h4>
                            <table className="table table-sm">
                              <thead>
                                <tr>
                                  <th scope="col">nom departement </th>
                                  <th scope="col">Description</th>
                                  <th scope="col">Nombre des unités</th>
                                </tr>
                              </thead>
                              <tbody>
                                {departements.map((departement) => (
                                  <tr key={departement._id}>
                                    <td>{departement.name}</td>
                                    <td>{departement.description}</td>
                                    <td>{departement.nbrUnite}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="add-billing-method">
                          <h3>Ajouter un departement</h3>

                          <div className="payment_methods">
                            <form onSubmit={handleSubmit}>
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="cc-head">
                                    <h5>nom de departement</h5>
                                  </div>
                                  <div className="inpt-field pd-moree">
                                    <input
                                      type="text"
                                      name="name"
                                      placeholder="nom departement ..."
                                      value={departement.name}
                                      onChange={(e) =>
                                        setDepartement({
                                          ...departement,
                                          name: e.target.value,
                                        })
                                      }
                                    />
                                    <i className="fa fa-university"></i>
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="cc-head">
                                    <h5>Description</h5>
                                  </div>
                                  <div className="inpt-field pd-moree">
                                    <input
                                      type="text"
                                      name="description"
                                      placeholder="description ..."
                                      value={departement.description}
                                      onChange={(e) =>
                                        setDepartement({
                                          ...departement,
                                          description: e.target.value,
                                        })
                                      }
                                    />
                                    <i className="fa fa-university"></i>
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="cc-head">
                                    <h5>nombre des unités </h5>
                                  </div>
                                  <div className="inpt-field">
                                    <input
                                      type="number"
                                      name="nbrUnite"
                                      placeholder=""
                                      value={departement.nbrUnite}
                                      onChange={(e) =>
                                        setDepartement({
                                          ...departement,
                                          nbrUnite: parseInt(e.target.value),
                                        })
                                      }
                                    />
                                  </div>
                                </div>

                                <div className="col-lg-12">
                                  <button type="submit">ajouter</button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}

                    {isChefDep && (
                      <div className="product-feed-tab" id="payment-dd">
                        <div className="billing-method">
                          <ul>
                            <li>
                              <h3>Ajouter Unité</h3>
                              <a href="#" title="">
                                <i className="fa fa-plus-circle"></i>
                              </a>
                            </li>
                          </ul>
                          <div className="lt-sec">
                            <img src="/assets/images/lt-icon.png" alt="" />
                            <h4>liste des unités </h4>
                            <table className="table table-sm">
                              <thead>
                                <tr>
                                  <th scope="col">nom unité </th>
                                  <th scope="col">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {unites.map((unite) => (
                                  <tr key={unite._id}>
                                    <td>{unite.name}</td>
                                    <td>
                                      <i
                                        className="fa fa-trash"
                                        style={{
                                          color: "red",
                                          cursor: "pointer",
                                        }}
                                        onClick={() =>
                                          handleDeleteUnit(unite._id)
                                        }
                                      ></i>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="add-billing-method">
                          <h3>Ajouter une unité</h3>

                          <div className="payment_methods">
                            <form onSubmit={handleSubmit2}>
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="cc-head">
                                    <h5>nom de l`unité</h5>
                                  </div>
                                  <div className="inpt-field pd-moree">
                                    <input
                                      type="text"
                                      name="name"
                                      placeholder="nom de l`unité ..."
                                      value={unite.name}
                                      onChange={handleChange2}
                                    />
                                    <i className="fa fa-university"></i>
                                  </div>
                                  <div className="inpt-field pd-moree">
                                    <select
                                      name="departement"
                                      value={unite.departement}
                                      onChange={handleChange2}
                                    >
                                      <option value="">
                                        Sélectionnez un département
                                      </option>
                                      {departements.map((departement) => (
                                        <option
                                          key={departement._id}
                                          value={departement._id}
                                        >
                                          {departement.name}
                                        </option>
                                      ))}
                                    </select>
                                    <i className="fa fa-university"></i>
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <button type="submit">ajouter</button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="right-sidebar">
                    <div className="message-btn">
                      <a href="/settings" title="">
                        <i className="fas fa-cog"></i> Setting
                      </a>
                    </div>
                    <div className="widget widget-portfolio">
                      <div className="wd-heady">
                        <h3>Portfolio</h3>
                        <img src="/assets/images/photo-icon.png" alt="" />
                      </div>
                      <div className="pf-gallery">
                        <ul>
                          <li>
                            <a href="#" title="">
                              <img
                                src="/assets/images/resources/pf-gallery1.png"
                                alt=""
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="">
                              <img
                                src="/assets/images/resources/pf-gallery2.png"
                                alt=""
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="">
                              <img
                                src="/assets/images/resources/pf-gallery3.png"
                                alt=""
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="">
                              <img
                                src="/assets/images/resources/pf-gallery4.png"
                                alt=""
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="">
                              <img
                                src="/assets/images/resources/pf-gallery5.png"
                                alt=""
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="">
                              <img
                                src="/assets/images/resources/pf-gallery6.png"
                                alt=""
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="">
                              <img
                                src="/assets/images/resources/pf-gallery7.png"
                                alt=""
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="">
                              <img
                                src="/assets/images/resources/pf-gallery8.png"
                                alt=""
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="">
                              <img
                                src="/assets/images/resources/pf-gallery9.png"
                                alt=""
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="">
                              <img
                                src="/assets/images/resources/pf-gallery10.png"
                                alt=""
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="">
                              <img
                                src="/assets/images/resources/pf-gallery11.png"
                                alt=""
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="">
                              <img
                                src="/assets/images/resources/pf-gallery12.png"
                                alt=""
                              />
                            </a>
                          </li>
                        </ul>
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
