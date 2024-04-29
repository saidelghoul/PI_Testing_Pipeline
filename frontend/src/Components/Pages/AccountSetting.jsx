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
import "../../../public/assets/js/jquery.min.js";
import "../../../public/assets/js/bootstrap.min.js";
import "../../../public/assets/js/jquery.mCustomScrollbar.js";
import "../../../public/assets/lib/slick/slick.min.js";
import "../../../public/assets/js/scrollbar.js";
import "../../../public/assets/js/script.js";
import { useState,useContext } from 'react';
import axios from 'axios';
import { UserContext } from "../../../context/userContext.jsx";


export default function AccountSetting() {
  const { user } = useContext(UserContext);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmedNewPassword, setConfirmedNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'oldPassword') setOldPassword(value);
    else if (name === 'newPassword') setNewPassword(value);
    else if (name === 'confirmedNewPassword') setConfirmedNewPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/user/changePassword/${user.id}`, {
        oldPassword,
        newPassword,
        confirmedNewPassword,
      });
      setSuccessMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Server error');
      }
    }
  };
  return (
    <>
      <section className="profile-account-setting">
        <div className="container">
          <div className="account-tabs-setting">
            <div className="row">
              <div className="col-lg-3">
                <div className="acc-leftbar">
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    {/* <a
                      className="nav-item nav-link active"
                      id="nav-acc-tab"
                      data-toggle="tab"
                      href="#nav-acc"
                      role="tab"
                      aria-controls="nav-acc"
                      aria-selected="true"
                    >
                      <i className="la la-cogs"></i>Account Setting
                    </a> */}
                    {/* <a
                      className="nav-item nav-link"
                      id="nav-status-tab"
                      data-toggle="tab"
                      href="#nav-status"
                      role="tab"
                      aria-controls="nav-status"
                      aria-selected="false"
                    >
                      <i className="fa fa-line-chart"></i>Status
                    </a> */}
                    <a
                      className="nav-item nav-link"
                      id="nav-password-tab"
                      data-toggle="tab"
                      href="#nav-password"
                      role="tab"
                      aria-controls="nav-password"
                      aria-selected="false"
                    >
                      <i className="fa fa-lock"></i>Change password
                    </a>
                    {/* <a
                      className="nav-item nav-link"
                      id="nav-notification-tab"
                      data-toggle="tab"
                      href="#nav-notification"
                      role="tab"
                      aria-controls="nav-notification"
                      aria-selected="false"
                    >
                      <i className="fa fa-flash"></i>Notifications
                    </a>
                    <a
                      className="nav-item nav-link"
                      id="nav-privcy-tab"
                      data-toggle="tab"
                      href="#privcy"
                      role="tab"
                      aria-controls="privacy"
                      aria-selected="false"
                    >
                      <i className="fa fa-group"></i>Requests
                    </a>
                    <a
                      className="nav-item nav-link"
                      id="security"
                      data-toggle="tab"
                      href="#security-login"
                      role="tab"
                      aria-controls="security-login"
                      aria-selected="false"
                    >
                      <i className="fa fa-user-secret"></i>Security and Login
                    </a>
                    <a
                      className="nav-item nav-link"
                      id="nav-privacy-tab"
                      data-toggle="tab"
                      href="#privacy"
                      role="tab"
                      aria-controls="privacy"
                      aria-selected="false"
                    >
                      <i className="fa fa-paw"></i>Privacy
                    </a>
                    <a
                      className="nav-item nav-link"
                      id="nav-blockking-tab"
                      data-toggle="tab"
                      href="#blockking"
                      role="tab"
                      aria-controls="blockking"
                      aria-selected="false"
                    >
                      <i className="fa fa-cc-diners-club"></i>Blocking
                    </a> */}
                    <a
                      className="nav-item nav-link"
                      id="nav-deactivate-tab"
                      data-toggle="tab"
                      href="#nav-deactivate"
                      role="tab"
                      aria-controls="nav-deactivate"
                      aria-selected="false"
                    >
                      <i className="fa fa-random"></i>Deactivate my account
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
              <div className="acc-setting">
                    <h3>Account Setting</h3>
                    <form onSubmit={handleSubmit}>
                      <div className="cp-field">
                        <h5>Old Password</h5>
                        <div className="cpp-fiel">
                          <input
                             type="password"
                             id="oldPassword"
                             name="oldPassword"
                             value={oldPassword}
                             onChange={handleChange}
                             required
                          />
                          <i className="fa fa-lock"></i>
                        </div>
                      </div>
                      <div className="cp-field">
                        <h5>New Password</h5>
                        <div className="cpp-fiel">
                          <input
                           type="password"
                           id="newPassword"
                           name="newPassword"
                           value={newPassword}
                           onChange={handleChange}
                          required                   />
                          <i className="fa fa-lock"></i>
                        </div>
                      </div>
                      <div className="cp-field">
                        <h5>Repeat the new password</h5>
                        <div className="cpp-fiel">
                          <input
                            type="password"
                            id="confirmedNewPassword"
                            name="confirmedNewPassword"
                            value={confirmedNewPassword}
                            onChange={handleChange}
                            required         />
                          <i className="fa fa-lock"></i>
                        </div>
                      </div>
                      <div className="cp-field">
                        <h5>
                          <a href="#" title="">
                          Forgot your password?
                          </a>
                        </h5>
                      </div>
                      <div className="save-stngs pd2">
                        <ul>
                          <li>
                            <button type="submit">Submit</button>
                          </li>
                          <li>
                          </li>
                        </ul>
                      </div>
                    </form>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                  </div>
            
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
