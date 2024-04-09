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

export default function Groups() {
  const [page, setPage] = useState({});
  const { id } = useParams(); // Récupérer l'ID depuis l'URL
  const { user } = useContext(UserContext);
  const [isParticipating, setIsParticipating] = useState(true);
  const [userIsCreator, setUserIsCreator] = useState(true); // Mettez la valeur correcte ici, true si l'utilisateur est le créateur, false sinon

  useEffect(() => {
    // Effectuer une requête GET pour récupérer les données de la page selon l'ID depuis le backend
    axios
      .get(`/groups/getbyid/${id}`)
      .then((response) => {
        setPage(response.data);
        setIsParticipating(response.data.participants.includes(user.id));
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des données de la page:",
          error
        );
      });
  }, [id]);
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
                        {user.id !== page.creator && !isParticipating && (
                          <ul className="flw-hr">
                            <li>
                              <a
                                href="#"
                                onClick={participerPage}
                                title=""
                                className="flww"
                              >
                                <i className="la la-plus"></i> Regoindre
                              </a>
                            </li>
                          </ul>
                        )}
                        <ul className="flw-status">
                          <li>
                            <span>Membres</span>
                            <b>
                              {" "}
                              {page.participants ? page.participants.length : 0}
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
                    </div>
                    {page.visibilite ? (
                      <div className="product-feed-tab current" id="feed-dd">
                        <div className="product-feed-tab current" id="feed-dd">
                          <div className="user-profile-ov">
                            <h3>
                              <a href="#" title="" className="overview-open">
                                Description
                              </a>{" "}
                            </h3>
                            <p>{page.description}</p>
                          </div>
                          <div className="user-profile-ov st2">
                            <h3>
                              <a href="#" title="" className="esp-bx-open">
                                Date création{" "}
                              </a>
                            </h3>
                            <span>{formatDate(page.date)}</span>
                          </div>
                        </div>
                        <div className="posts-section">
                          <div className="post-bar">
                            <div className="post_topbar">
                              <div className="usy-dt">
                                <img
                                  src="/assets/images/resources/company-pic.png"
                                  alt=""
                                />
                                <div className="usy-name">
                                  <h3>Facebook Inc.</h3>
                                  <span>
                                    <img
                                      src="/assets/images/clock.png"
                                      alt=""
                                    />
                                    3 min ago
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
                              <h3>Senior PHP Developer</h3>
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
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Aliquam luctus hendrerit metus,
                                ut ullamcorper quam finibus at. Etiam id magna
                                sit amet...{" "}
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
                                  <a href="#" className="active">
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
                                    Comments 15
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
                    ) : (
                      <h3>
                        Cette publication n'est pas visible.<br></br>
                        vous avez regoindre la page
                      </h3>
                    )}
                    <div className="product-feed-tab" id="info-dd">
                      {user.id == page.creator && (
                        <div className="user-profile-ov">
                          <h3>
                            <a href="#" title="" className="overview-open">
                              Description
                            </a>{" "}
                            <a href="#" title="" className="overview-open">
                              <i className="fa fa-pencil"></i>
                            </a>
                          </h3>
                          <p>{page.description}</p>
                        </div>
                      )}
                      <div className="user-profile-ov st2">
                        <h3>
                          <a href="#" title="" className="esp-bx-open">
                            Date création{" "}
                          </a>
                        </h3>
                        <span>{formatDate(page.date)}</span>
                      </div>
                      <div className="user-profile-ov">
                        <h3>
                          <a href="#" title="" className="emp-open">
                            Total des participants
                          </a>{" "}
                          <a href="#" title="" className="emp-open">
                            <i className="fa fa-pencil"></i>
                          </a>{" "}
                          <a href="#" title="" className="emp-open">
                            <i className="fa fa-plus-square"></i>
                          </a>
                        </h3>
                        <span>17,048</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="right-sidebar">
                    <div className="message-btn">
                      <a href="#" title="">
                        <i className="fa fa-envelope"></i> Message
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
                                src="images/resources/pf-gallery1.png"
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
      <div className="post-popup pst-pj">
        <div className="post-project">
          <h3>Ajout Evenement</h3>
          <div className="post-project-fields">
            <form>
              <div className="row">
                <div className="col-lg-12">
                  <input type="text" name="title" placeholder="Title" />
                </div>
                <div className="col-lg-12">
                  <div className="inp-field">
                    <select>
                      <option>Category</option>
                      <option>Category 1</option>
                      <option>Category 2</option>
                      <option>Category 3</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-12">
                  <input type="text" name="skills" placeholder="Skills" />
                </div>
                <div className="col-lg-12">
                  <div className="price-sec">
                    <div className="price-br">
                      <input type="text" name="price1" placeholder="Price" />
                      <i className="la la-dollar"></i>
                    </div>
                    <span>To</span>
                    <div className="price-br">
                      <input type="text" name="price1" placeholder="Price" />
                      <i className="la la-dollar"></i>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <textarea
                    name="description"
                    placeholder="Description"
                  ></textarea>
                </div>
                <div className="col-lg-12">
                  <ul>
                    <li>
                      <button className="active" type="submit" value="post">
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

      <div className="post-popup job_post">
        <div className="post-project">
          <h3> Ajout Publication</h3>
          <div className="post-project-fields">
            <form>
              <div className="row">
                <div className="col-lg-12">
                  <input type="text" name="title" placeholder="Title" />
                </div>
                <div className="col-lg-12">
                  <div className="inp-field">
                    <select>
                      <option>Category</option>
                      <option>Category 1</option>
                      <option>Category 2</option>
                      <option>Category 3</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-12">
                  <input type="text" name="skills" placeholder="Skills" />
                </div>
                <div className="col-lg-6">
                  <div className="price-br">
                    <input type="text" name="price1" placeholder="Price" />
                    <i className="la la-dollar"></i>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="inp-field">
                    <select>
                      <option>Full Time</option>
                      <option>Half time</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-12">
                  <textarea
                    name="description"
                    placeholder="Description"
                  ></textarea>
                </div>
                <div className="col-lg-12">
                  <ul>
                    <li>
                      <button className="active" type="submit" value="post">
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
    </>
  );
}
