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

export default function Navbar() {
  const { user } = useContext(UserContext);
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
      <div className="container">
        <div className="header-data">
          <div className="logo">
            <img src="/assets/images/esprit.png" alt="" width="100em" />
          </div>
          <div className="search-bar">
            <form>
              <input type="text" name="search" placeholder="Search..." />
              <button type="submit">
                <i className="la la-search"></i>
              </button>
            </form>
          </div>
          <nav>
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
                <Link to="/groupes" title="">
                  <span>
                    <img src="/assets/images/icon2.png" alt="" />
                  </span>
                  Pages
                </Link>
              </li>
              <li>
                {user?.role !== "Enseignant" && (
                  <Link to="/activities" title="Manage activities">
                    <span>
                      <img src="/assets/images/icon5.png" alt="" />
                    </span>
                    Activites
                  </Link>
                )}
              </li>
              <li>
                <Link to="/Leaderboard" title="" className="not-box-openm">
                  <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trophy-fill" viewBox="0 0 16 16">
                  <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5q0 .807-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33 33 0 0 1 2.5.5m.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935m10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935"/>
                  </svg>
                  </span>
                  Leaderboard
                  </Link>
                <Link to={`/${user?.id}/tasks`} title="My tasks">
                  <span>
                    <img src="/assets/images/icon3.png" alt="" />
                  </span>
                  My Tasks
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
              <li>
                <Link to="#" title="" className="not-box-open">
                  <span>
                    <img src="/assets/images/icon7.png" alt="" />
                  </span>
                  Notification
                </Link>
              </li>
            </ul>
          </nav>
          <div className="menu-btn">
            <a href="#" title="">
              <i className="fa fa-bars"></i>
            </a>
          </div>
          <div className="user-account">
            <div className="user-info">
              <img src="/assets/images/resources/user.png" alt="" />
              <a href="#" title="">
                {!!user && <h1>{user.name}</h1>}
              </a>
              <i className="la la-sort-down"></i>
            </div>
            <div className="user-account-settingss" id="users">
              <h3 className="tc">
                <Link to="/profil" title="">
                  Profil
                </Link>
              </h3>

              <h3>Online Status</h3>
              <ul className="on-off-status">
                <li>
                  <div className="fgt-sec">
                    <input type="radio" name="cc" id="c5" />
                    <label htmlFor="c5">
                      <span></span>
                    </label>
                    <small>Online</small>
                  </div>
                </li>
                <li>
                  <div className="fgt-sec">
                    <input type="radio" name="cc" id="c6" />
                    <label htmlFor="c6">
                      <span></span>
                    </label>
                    <small>Offline</small>
                  </div>
                </li>
              </ul>
              <h3>Custom Status</h3>
              <div className="search_form">
                <form>
                  <input type="text" name="search" />
                  <button type="submit">Ok</button>
                </form>
              </div>

              <div className="user-account-settingss" id="users">
                {user?.role === "Directeur d'étude" && ( // Afficher les liens uniquement pour le Directeur d'étude
                  <>
                    <h3>Skills</h3>
                    <ul className="us-links">
                      <li>
                        <div className="fgt-sec">
                          <Link to={`/socialSkills/`}>
                            <p>Social Skills</p>
                          </Link>
                        </div>
                      </li>
                      <li>
                        <div className="fgt-sec">
                          <Link to={`/technicalSkills/`}>
                            <p>Technical Skills</p>
                          </Link>
                        </div>
                      </li>
                    </ul>
                  </>
                )}
                <h3>Setting</h3>
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
                    Logout
                  </Link>
                </h3>
              </div>
            </div>
          </div>
          <div className="margin-bottom: 20px;"></div>
        </div>
      </div>
    </header>
  );
}
