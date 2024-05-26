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
import { useState } from "react";
import axios from "axios";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post("/forgotPassword", { email });
      setMessage(response.data.message);
      setError("");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error);
      } else {
        setError("Server error");
      }
      setMessage("");
    }
  };

  return (
    <div className="sign-in-page " style={{ backgroundColor: "#dc3545" }}>
      <div className="signin-popup">
        <div className="signin-pop">
          <div className="row">
            <div className="col-lg-6">
              <div className="cmp-info">
                <div className="cm-logo">
                  <img src="/assets/images/logo/logo.png" alt="" />
                  <img src="/assets/images/cm-main-img.png" alt="" />
                </div>
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
                <span style={{ fontWeight: "bold", textAlign: "center" }}>
                  {" "}
                  Forgot your password ?
                </span>
                <h2 style={{ color: "red" }}>
                  <br />
                  Enter your email bellow to receive a password reset link
                </h2>
                <br />
                {message && <p className="success">{message}</p>}
                {error && <p className="error">{error}</p>}

                <div className="form-group">
                  <label> Your Email: </label>
                  <br /> <br />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                  />
                </div>

                <button
                  onClick={handleForgotPassword}
                  className="btn btn-danger"
                >
                  Reset password
                </button>
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
}
