import "../../public/assets/css/animate.css";
import "../../public/assets/css/bootstrap.min.css";
import "../../public/assets/css/line-awesome.css";
import "../../public/assets/css/line-awesome-font-awesome.min.css";
import "../../public/assets/vendor/fontawesome-free/css/all.min.css";
import "../../public/assets/css/font-awesome.min.css";
import "../../public/assets/css/style.css";
import "../../public/assets/css/responsive.css";
import "../../public/assets/lib/slick/slick.css";
import "../../public/assets/lib/slick/slick-theme.css";

import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import axios from "axios";
import ODDSocialSkillPopup from "./Pages/Skills/utils/ODDSocialSkillPopup";

export default function Navbar() {
  const { user } = useContext(UserContext);
  const userId = user ? user.id : null;
  const imageUrl =
    userId && user && user.profileImage
      ? `http://localhost:8000/user/${userId}/profile`
      : "/assets/images/resources/user-pro-img.png";
  const handleLogout = async () => {
    try {
      await axios.get("/logout");
      window.location.href = "/";
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };
  return (
    <header>
      <div style={{marginTop : '25px' }} className="container">
        <div className="header-data">
          <div className="logo">
            <img src="/assets/images/esprit.png" alt="" width="100em" />
          </div>
          <div className="logo">
            <ODDSocialSkillPopup></ODDSocialSkillPopup>
          </div>
          <div className="search-bar col-2" >
            <form>
              <input type="text" name="search" placeholder="Search..." />
              <button type="submit">
                <i className="la la-search"></i>
              </button>
            </form>
          </div>
          <nav style={{paddingRight:'60px'}}>
            <ul>
              <li>
                <a href="/home" title="">
                  <span>
                    <img src="/assets/images/icon1.png" alt="" />
                  </span>
                  Home
                </a>
              </li>
              <li>
                <Link to="/friends" title="">
                  <span>
                    <img src="/assets/images/icon4.png" alt="" />
                  </span>
                  Friends
                </Link>
              </li>
              <li>
                <Link to="/groupes" title="">
                  <span>
                    <img src="/assets/images/icon2.png" alt="" />
                  </span>
                  Pages
                </Link>
              </li>
              <li>
                <Link to="/myGroups" title="">
                  <span>
                    <img src="/assets/images/icon2.png" alt="" />
                  </span>
                   My Pages
                </Link>
              </li>
              <li>
                {user?.role !== "Enseignant" && (
                  <Link to="/activities" title="Manage activities">
                    <span>
                      <img src="/assets/images/icon5.png" alt="" />
                    </span>
                    Activites
                  </Link>)}
                </li>
              
              <li>
                <Link to={`/${user?.id}/tasks`} title="My tasks">
                  <span>
                    <img src="/assets/images/icon3.png" alt="" />
                  </span>
                  My Tasks
                </Link>
              </li>
              <li>
                <Link to="/Leaderboard" title="" className="not-box-openm">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trophy-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5q0 .807-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33 33 0 0 1 2.5.5m.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935m10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935" />
                    </svg>
                  </span>
                  Leaderboard
                </Link>
              </li>

              <li>
                <Link to="/message" title="" className="not-box-openm">
                  <span>
                    <img src="/assets/images/icon6.png" alt="" />
                  </span>
                  Messages
                </Link>
              </li>
              {/* <li>
                <Link
                  to={`/Historiques/${user?.id}`}
                  title=""
                  className="not-box-open"
                >
                  <span>
                    <img src="/assets/images/icon7.png" alt="" />
                  </span>
                  Historiques
                </Link>
              </li> */}
            </ul>
          </nav>
          <div className="menu-btn">
            <a href="#" title="">
              <i className="fa fa-bars"></i>
            </a>
          </div>
          <div className="user-account" style={{marginLeft:'10px'}}>
            <div className="user-info">
              <img
                src={imageUrl}
                alt="Image de profil"
                width="40px"
                height="40px"
              />
              <a href="#" title="">
                {!!user && <h1>{user.name}</h1>}
              </a>
              <i className="la la-sort-down"></i>
            </div>
            <div className="user-account-settingss" id="users">
              <h3 className="tc">
                <Link to="/profil" title="">
                  Profil 🧑
                </Link>
              </h3>
              



              <div className="user-account-settingss" id="users">
                {user?.role === "Directeur d'étude" && ( // Afficher les liens uniquement pour le Directeur d'étude
                  <>
                    <h3 className="text-center">Skills 🏆</h3>
                    <ul className="us-links">
                      <li>
                        <div className="text-center">
                          <Link to={`/socialSkills/`}>
                            <h4 span className="h6">➡ Social Skills 🗣️</h4>
                          </Link>
                        </div>
                      </li>
                      <li> <br />
                        <div className="text-center">
                          <Link to={`/technicalSkills/`}>
                            <h4> ➡Technical Skills<><br /> (COMING SOON )</></h4>
                          </Link>
                        </div>
                      </li>
                    </ul>
                  </>
                )}
                <div className="text-center">
                <Link to={`/Historiques/${user?.id}`}>
                            <h3 className="h5">📒 Historique 📒</h3>
                          </Link>
                          <hr />

                </div>
                
                <h3 className="text-center">Setting ⚙️</h3>
                <ul className="us-links">
                  <li>
                    <Link to="/settings" title="">
                      Account Setting
                    </Link>
                  </li>
                  <li>
                    <a href="#" title="">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" title="">
                      Faqs
                    </a>
                  </li>
                  <li>
                    <a href="#" title="">
                      Terms & Conditions
                    </a>
                  </li>
                </ul>
                <h3 className="tc">
                  <Link to="/" title="" onClick={handleLogout}>
                    Logout 🚪 🏃
                  </Link>
                </h3>
                
              </div>
            </div>
            
          </div>
          

        </div>
        
      </div>
    </header>
  );
}
