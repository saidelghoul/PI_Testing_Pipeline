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

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const ConfirmEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await axios.get(`/confirm/${token}`);
        setMessage(response.data.message);
      } catch (error) {
        console.error(error.response.data);
        setMessage("Error confirming email");
      }
    };

    confirmEmail();
  }, [token]);

  return (
    <div className="sign-in-page " style={{ backgroundColor: "#dc3545" }}>
      <div className="signin-popup">
        <div className="signin-pop">
          <div className="row">
            <div className="col-lg-6">
              <div className="cmp-info">
                <div className="cm-logo">
                  <img src="/assets/images/logo/logo.png" alt="" />
                </div>
                <img src="/assets/images/cm-main-img.png" alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="login-sec">
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div>
                  <p>{message}</p>
                  <Link to="/">
                    <button className="btn btn-danger">
                      Confirm my registration
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footy-sec">
        <div className="container">
          <ul>
            <li>
              <a href="help-center.html" title="">
                Help Center
              </a>
            </li>
            <li>
              <a href="about.html" title="">
                About
              </a>
            </li>
            <li>
              <a href="#" title="">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" title="">
                Community Guidelines
              </a>
            </li>
            <li>
              <a href="#" title="">
                Cookies Policy
              </a>
            </li>
            <li>
              <a href="#" title="">
                Career
              </a>
            </li>
            <li>
              <a href="forum.html" title="">
                Forum
              </a>
            </li>
            <li>
              <a href="#" title="">
                Language
              </a>
            </li>
            <li>
              <a href="#" title="">
                Copyright Policy
              </a>
            </li>
          </ul>
          <p>
            <img src="/assets/images/copy-icon.png" alt="" />
            Copyright 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
