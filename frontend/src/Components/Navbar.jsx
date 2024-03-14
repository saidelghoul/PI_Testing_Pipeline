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
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
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
                  <Link to="/home" title="">
                    <span>
                      <img src="/assets/images/icon1.png" alt="" />
                    </span>
                    Home
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
                  <Link to="/activities" title="">
                    <span>
                      <img src="/assets/images/icon3.png" alt="" />
                    </span>
                    Activites
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
                  <a href="#" title="" className="not-box-open">
                    <span>
                      <img src="/assets/images/icon7.png" alt="" />
                    </span>
                    Notification
                  </a>
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
                  John
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
                  <a href="sign-in.html" title="">
                    Logout
                  </a>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
