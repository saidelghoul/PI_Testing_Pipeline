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
export default function AccountSetting() {
  return (
    <>
      <section className="profile-account-setting">
        <div className="container">
          <div className="account-tabs-setting">
            <div className="row">
              <div className="col-lg-3">
                <div className="acc-leftbar">
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a
                      className="nav-item nav-link active"
                      id="nav-acc-tab"
                      data-toggle="tab"
                      href="#nav-acc"
                      role="tab"
                      aria-controls="nav-acc"
                      aria-selected="true"
                    >
                      <i className="la la-cogs"></i>Account Setting
                    </a>
                    <a
                      className="nav-item nav-link"
                      id="nav-status-tab"
                      data-toggle="tab"
                      href="#nav-status"
                      role="tab"
                      aria-controls="nav-status"
                      aria-selected="false"
                    >
                      <i className="fa fa-line-chart"></i>Status
                    </a>
                    <a
                      className="nav-item nav-link"
                      id="nav-password-tab"
                      data-toggle="tab"
                      href="#nav-password"
                      role="tab"
                      aria-controls="nav-password"
                      aria-selected="false"
                    >
                      <i className="fa fa-lock"></i>Change Password
                    </a>
                    <a
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
                    </a>
                    <a
                      className="nav-item nav-link"
                      id="nav-deactivate-tab"
                      data-toggle="tab"
                      href="#nav-deactivate"
                      role="tab"
                      aria-controls="nav-deactivate"
                      aria-selected="false"
                    >
                      <i className="fa fa-random"></i>Deactivate Account
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="nav-acc"
                    role="tabpanel"
                    aria-labelledby="nav-acc-tab"
                  >
                    <div className="acc-setting">
                      <h3>Account Setting</h3>
                      <form>
                        <div className="notbar">
                          <h4>Notification Sound</h4>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Vivamus pretium nulla quis erat dapibus,
                            varius hendrerit neque suscipit. Integer in ex
                            euismod, posuere lectus id
                          </p>
                          <div className="toggle-btn">
                            <div className="custom-control custom-switch">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customSwitch1"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="customSwitch1"
                              ></label>
                            </div>
                          </div>
                        </div>
                        <div className="notbar">
                          <h4>Notification Email</h4>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Vivamus pretium nulla quis erat dapibus,
                            varius hendrerit neque suscipit. Integer in ex
                            euismod, posuere lectus id
                          </p>
                          <div className="toggle-btn">
                            <div className="custom-control custom-switch">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customSwitch2"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="customSwitch2"
                              ></label>
                            </div>
                          </div>
                        </div>
                        <div className="notbar">
                          <h4>Chat Message Sound</h4>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Vivamus pretium nulla quis erat dapibus,
                            varius hendrerit neque suscipit. Integer in ex
                            euismod, posuere lectus id
                          </p>
                          <div className="toggle-btn">
                            <div className="custom-control custom-switch">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customSwitch3"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="customSwitch3"
                              ></label>
                            </div>
                          </div>
                        </div>
                        <div className="save-stngs">
                          <ul>
                            <li>
                              <button type="submit">Save Setting</button>
                            </li>
                            <li>
                              <button type="submit">Restore Setting</button>
                            </li>
                          </ul>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-status"
                  role="tabpanel"
                  aria-labelledby="nav-status-tab"
                >
                  <div className="acc-setting">
                    <h3>Profile Status</h3>
                    <div className="profile-bx-details">
                      <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-12">
                          <div className="profile-bx-info">
                            <div className="pro-bx">
                              <img src="/assets/images/pro-icon1.png" alt="" />
                              <div className="bx-info">
                                <h3>$5,145</h3>
                                <h5>Total Income</h5>
                              </div>
                            </div>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur
                              adipiscing.
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                          <div className="profile-bx-info">
                            <div className="pro-bx">
                              <img src="/assets/images/pro-icon2.png" alt="" />
                              <div className="bx-info">
                                <h3>$4,745</h3>
                                <h5>Widthraw</h5>
                              </div>
                            </div>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur
                              adipiscing.
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                          <div className="profile-bx-info">
                            <div className="pro-bx">
                              <img src="/assets/images/pro-icon3.png" alt="" />
                              <div className="bx-info">
                                <h3>$1,145</h3>
                                <h5>Sent</h5>
                              </div>
                            </div>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur
                              adipiscing.
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                          <div className="profile-bx-info">
                            <div className="pro-bx">
                              <img src="/assets/images/pro-icon4.png" alt="" />
                              <div className="bx-info">
                                <h3>130</h3>
                                <h5>Total Projects</h5>
                              </div>
                            </div>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur
                              adipiscing.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pro-work-status"></div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-password"
                  role="tabpanel"
                  aria-labelledby="nav-password-tab"
                >
                  <div className="acc-setting">
                    <h3>Account Setting</h3>
                    <form>
                      <div className="cp-field">
                        <h5>Old Password</h5>
                        <div className="cpp-fiel">
                          <input
                            type="text"
                            name="old-password"
                            placeholder="Old Password"
                          />
                          <i className="fa fa-lock"></i>
                        </div>
                      </div>
                      <div className="cp-field">
                        <h5>New Password</h5>
                        <div className="cpp-fiel">
                          <input
                            type="text"
                            name="new-password"
                            placeholder="New Password"
                          />
                          <i className="fa fa-lock"></i>
                        </div>
                      </div>
                      <div className="cp-field">
                        <h5>Repeat Password</h5>
                        <div className="cpp-fiel">
                          <input
                            type="text"
                            name="repeat-password"
                            placeholder="Repeat Password"
                          />
                          <i className="fa fa-lock"></i>
                        </div>
                      </div>
                      <div className="cp-field">
                        <h5>
                          <a href="#" title="">
                            Forgot Password?
                          </a>
                        </h5>
                      </div>
                      <div className="save-stngs pd2">
                        <ul>
                          <li>
                            <button type="submit">Save Setting</button>
                          </li>
                          <li>
                            <button type="submit">Restore Setting</button>
                          </li>
                        </ul>
                      </div>
                    </form>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-notification"
                  role="tabpanel"
                  aria-labelledby="nav-notification-tab"
                >
                  <div className="acc-setting">
                    <h3>Notifications</h3>
                    <div className="notifications-list">
                      <div className="notfication-details">
                        <div className="noty-user-img">
                          <img
                            src="/assets/images/resources/ny-img1.png"
                            alt=""
                          />
                        </div>
                        <div className="notification-info">
                          <h3>
                            <a href="#" title="">
                              Jassica William
                            </a>{" "}
                            Comment on your project.
                          </h3>
                          <span>2 min ago</span>
                        </div>
                      </div>
                      <div className="notfication-details">
                        <div className="noty-user-img">
                          <img
                            src="/assets/images/resources/ny-img2.png"
                            alt=""
                          />
                        </div>
                        <div className="notification-info">
                          <h3>
                            <a href="#" title="">
                              Poonam Verma
                            </a>{" "}
                            Bid on your Latest project.
                          </h3>
                          <span>2 min ago</span>
                        </div>
                      </div>
                      <div className="notfication-details">
                        <div className="noty-user-img">
                          <img
                            src="/assets/images/resources/ny-img3.png"
                            alt=""
                          />
                        </div>
                        <div className="notification-info">
                          <h3>
                            <a href="#" title="">
                              Tonney Dhman
                            </a>{" "}
                            Comment on your project.
                          </h3>
                          <span>2 min ago</span>
                        </div>
                      </div>
                      <div className="notfication-details">
                        <div className="noty-user-img">
                          <img
                            src="/assets/images/resources/ny-img1.png"
                            alt=""
                          />
                        </div>
                        <div className="notification-info">
                          <h3>
                            <a href="#" title="">
                              Jassica William
                            </a>{" "}
                            Comment on your project.
                          </h3>
                          <span>2 min ago</span>
                        </div>
                      </div>
                      <div className="notfication-details">
                        <div className="noty-user-img">
                          <img
                            src="/assets/images/resources/ny-img1.png"
                            alt=""
                          />
                        </div>
                        <div className="notification-info">
                          <h3>
                            <a href="#" title="">
                              Jassica William
                            </a>{" "}
                            Comment on your project.
                          </h3>
                          <span>2 min ago</span>
                        </div>
                      </div>
                      <div className="notfication-details">
                        <div className="noty-user-img">
                          <img
                            src="/assets/images/resources/ny-img2.png"
                            alt=""
                          />
                        </div>
                        <div className="notification-info">
                          <h3>
                            <a href="#" title="">
                              Poonam Verma{" "}
                            </a>{" "}
                            Bid on your Latest project.
                          </h3>
                          <span>2 min ago</span>
                        </div>
                      </div>
                      <div className="notfication-details">
                        <div className="noty-user-img">
                          <img
                            src="/assets/images/resources/ny-img3.png"
                            alt=""
                          />
                        </div>
                        <div className="notification-info">
                          <h3>
                            <a href="#" title="">
                              Tonney Dhman
                            </a>{" "}
                            Comment on your project
                          </h3>
                          <span>2 min ago</span>
                        </div>
                      </div>
                      <div className="notfication-details">
                        <div className="noty-user-img">
                          <img
                            src="/assets/images/resources/ny-img1.png"
                            alt=""
                          />
                        </div>
                        <div className="notification-info">
                          <h3>
                            <a href="#" title="">
                              Jassica William
                            </a>{" "}
                            Comment on your project.
                          </h3>
                          <span>2 min ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="privcy"
                  role="tabpanel"
                  aria-labelledby="nav-privcy-tab"
                >
                  <div className="acc-setting">
                    <h3>Requests</h3>
                    <div className="requests-list">
                      <div className="request-details">
                        <div className="noty-user-img">
                          <img
                            src="/assets/images/resources/r-img1.png"
                            alt=""
                          />
                        </div>
                        <div className="request-info">
                          <h3>Jessica William</h3>
                          <span>Graphic Designer</span>
                        </div>
                        <div className="accept-feat">
                          <ul>
                            <li>
                              <button type="submit" className="accept-req">
                                Accept
                              </button>
                            </li>
                            <li>
                              <button type="submit" className="close-req">
                                <i className="la la-close"></i>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="request-details">
                        <div className="noty-user-img">
                          <img
                            src="/assets/images/resources/r-img2.png"
                            alt=""
                          />
                        </div>
                        <div className="request-info">
                          <h3>John Doe</h3>
                          <span>PHP Developer</span>
                        </div>
                        <div className="accept-feat">
                          <ul>
                            <li>
                              <button type="submit" className="accept-req">
                                Accept
                              </button>
                            </li>
                            <li>
                              <button type="submit" className="close-req">
                                <i className="la la-close"></i>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="request-details">
                        <div className="noty-user-img">
                          <img
                            src="/assets/images/resources/r-img3.png"
                            alt=""
                          />
                        </div>
                        <div className="request-info">
                          <h3>Poonam</h3>
                          <span>Wordpress Developer</span>
                        </div>
                        <div className="accept-feat">
                          <ul>
                            <li>
                              <button type="submit" className="accept-req">
                                Accept
                              </button>
                            </li>
                            <li>
                              <button type="submit" className="close-req">
                                <i className="la la-close"></i>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="request-details">
                        <div className="noty-user-img">
                          <img
                            src="/assets/images/resources/r-img4.png"
                            alt=""
                          />
                        </div>
                        <div className="request-info">
                          <h3>Bill Gates</h3>
                          <span>C & C++ Developer</span>
                        </div>
                        <div className="accept-feat">
                          <ul>
                            <li>
                              <button type="submit" className="accept-req">
                                Accept
                              </button>
                            </li>
                            <li>
                              <button type="submit" className="close-req">
                                <i className="la la-close"></i>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="request-details">
                        <div className="noty-user-img">
                          <img
                            src="/assets/images/resources/r-img5.png"
                            alt=""
                          />
                        </div>
                        <div className="request-info">
                          <h3>Jessica William</h3>
                          <span>Graphic Designer</span>
                        </div>
                        <div className="accept-feat">
                          <ul>
                            <li>
                              <button type="submit" className="accept-req">
                                Accept
                              </button>
                            </li>
                            <li>
                              <button type="submit" className="close-req">
                                <i className="la la-close"></i>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="request-details">
                        <div className="noty-user-img">
                          <img
                            src="/assets/images/resources/r-img6.png"
                            alt=""
                          />
                        </div>
                        <div className="request-info">
                          <h3>John Doe</h3>
                          <span>PHP Developer</span>
                        </div>
                        <div className="accept-feat">
                          <ul>
                            <li>
                              <button type="submit" className="accept-req">
                                Accept
                              </button>
                            </li>
                            <li>
                              <button type="submit" className="close-req">
                                <i className="la la-close"></i>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  /
                </div>
                <div
                  className="tab-pane fade"
                  id="security-login"
                  role="tabpanel"
                  aria-labelledby="security"
                >
                  <div className="privacy security">
                    <div className="row">
                      <div className="col-12">
                        <h3>Security and Login</h3>
                        <hr />
                        <h3>Two - Step Verification</h3>
                        <p>
                          Help protect your account by enabling extra layers of
                          security.
                        </p>
                        <hr />
                        <h3>Security question</h3>
                        <i className="la la-edit"></i>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck1"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck1"
                          >
                            Conform your identity with a question only you know
                            the answer to
                          </label>
                        </div>
                        <hr />
                        <h3>Security question</h3>
                        <p>Before can you set a new security question,</p>
                        <hr />
                        <h3>Current Question</h3>
                        <p>Q: Your favorite actor?</p>
                        <br />
                        <h3>New Question</h3>
                        <form>
                          <div className="form-group">
                            <select
                              className="form-control"
                              id="exampleFormControlSelect1"
                            >
                              <option>Please Select New Question</option>
                              <option>Select Second Queston</option>
                            </select>
                          </div>
                        </form>
                        <h3>Answer</h3>
                        <form>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder=" Answer here"
                            />
                          </div>
                        </form>
                        <div className="checkbox">
                          <div className="form-check">
                            <div className="custom-control custom-radio">
                              <input
                                type="radio"
                                id="customRadio1"
                                name="customRadio"
                                className="custom-control-input"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="customRadio1"
                              >
                                I understand my account will be locked if I am
                                unable to answer this question
                              </label>
                            </div>
                          </div>
                          <div className="form-check">
                            <div className="custom-control custom-radio">
                              <input
                                type="radio"
                                id="customRadio2"
                                name="customRadio"
                                className="custom-control-input"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="customRadio2"
                              >
                                Remember this device
                              </label>
                            </div>
                          </div>
                        </div>
                        <hr />

                        <div className="btns">
                          <a href="#">Save</a>
                          <a href="#">Cancel</a>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="blockking"
                      role="tabpanel"
                      aria-labelledby="nav-blockking-tab"
                    >
                      <div className="helpforum">
                        <div className="row">
                          <div className="col-12 security">
                            <h3>Blocking</h3>
                            <hr />
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <h4>Blocking</h4>
                              <p>
                                See your list,and make changes if you would like
                              </p>
                              <div className="bloktext">
                                <p>You are not bloking anyone</p>
                                <p>
                                  Need to blok or report someone? Go to the
                                  profile of the person you want to blok and
                                  select Blok or Report from the drowp-down menu
                                  at the top of the profile summery
                                </p>
                                <p>
                                  Note: After you have blocked the person, Any
                                  previous profile views of yours and of the
                                  other person will disappear from each of your
                                  Who is viewed your profile sections.{" "}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="privciy"
                      role="tabpanel"
                      aria-labelledby="nav-privcy-tab"
                    >
                      <div className="acc-setting">
                        <h3>Requests</h3>
                        <div className="requests-list">
                          <div className="request-details">
                            <div className="noty-user-img">
                              <img
                                src="/assets/images/resources/r-img1.png"
                                alt=""
                              />
                            </div>
                            <div className="request-info">
                              <h3>Jessica William</h3>
                              <span>Graphic Designer</span>
                            </div>
                            <div className="accept-feat">
                              <ul>
                                <li>
                                  <button type="submit" className="accept-req">
                                    Accept
                                  </button>
                                </li>
                                <li>
                                  <button type="submit" className="close-req">
                                    <i className="la la-close"></i>
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="request-details">
                            <div className="noty-user-img">
                              <img
                                src="/assets/images/resources/r-img2.png"
                                alt=""
                              />
                            </div>
                            <div className="request-info">
                              <h3>John Doe</h3>
                              <span>PHP Developer</span>
                            </div>
                            <div className="accept-feat">
                              <ul>
                                <li>
                                  <button type="submit" className="accept-req">
                                    Accept
                                  </button>
                                </li>
                                <li>
                                  <button type="submit" className="close-req">
                                    <i className="la la-close"></i>
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="request-details">
                            <div className="noty-user-img">
                              <img
                                src="/assets/images/resources/r-img3.png"
                                alt=""
                              />
                            </div>
                            <div className="request-info">
                              <h3>Poonam</h3>
                              <span>Wordpress Developer</span>
                            </div>
                            <div className="accept-feat">
                              <ul>
                                <li>
                                  <button type="submit" className="accept-req">
                                    Accept
                                  </button>
                                </li>
                                <li>
                                  <button type="submit" className="close-req">
                                    <i className="la la-close"></i>
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="request-details">
                            <div className="noty-user-img">
                              <img
                                src="/assets/images/resources/r-img4.png"
                                alt=""
                              />
                            </div>
                            <div className="request-info">
                              <h3>Bill Gates</h3>
                              <span>C & C++ Developer</span>
                            </div>
                            <div className="accept-feat">
                              <ul>
                                <li>
                                  <button type="submit" className="accept-req">
                                    Accept
                                  </button>
                                </li>
                                <li>
                                  <button type="submit" className="close-req">
                                    <i className="la la-close"></i>
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="request-details">
                            <div className="noty-user-img">
                              <img
                                src="/assets/images/resources/r-img5.png"
                                alt=""
                              />
                            </div>
                            <div className="request-info">
                              <h3>Jessica William</h3>
                              <span>Graphic Designer</span>
                            </div>
                            <div className="accept-feat">
                              <ul>
                                <li>
                                  <button type="submit" className="accept-req">
                                    Accept
                                  </button>
                                </li>
                                <li>
                                  <button type="submit" className="close-req">
                                    <i className="la la-close"></i>
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="request-details">
                            <div className="noty-user-img">
                              <img
                                src="/assets/images/resources/r-img6.png"
                                alt=""
                              />
                            </div>
                            <div className="request-info">
                              <h3>John Doe</h3>
                              <span>PHP Developer</span>
                            </div>
                            <div className="accept-feat">
                              <ul>
                                <li>
                                  <button type="submit" className="accept-req">
                                    Accept
                                  </button>
                                </li>
                                <li>
                                  <button type="submit" className="close-req">
                                    <i className="la la-close"></i>
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="privacy"
                      role="tabpanel"
                      aria-labelledby="nav-privacy-tab"
                    >
                      <div className="privac">
                        <div className="row">
                          <div className="col-12">
                            <h3>Privacy</h3>
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-12">
                            <div className="dropdown privacydropd">
                              <a
                                href="#"
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                              >
                                Who can see your email address
                              </a>
                              <div className="dropdown-menu">
                                <p>
                                  Choose who can see your email address on your
                                  profile
                                </p>
                                <div className="row">
                                  <div className="col-md-9 col-sm-12">
                                    <form className="radio-form">
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="customCheck1"
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="customCheck1"
                                        >
                                          Everyone
                                        </label>
                                      </div>
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="customCheck2"
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="customCheck2"
                                        >
                                          Friends
                                        </label>
                                      </div>
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="customCheck3"
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="customCheck3"
                                        >
                                          Only Me
                                        </label>
                                      </div>
                                    </form>
                                  </div>
                                  <div className="col-md-3 col-sm-12"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-12">
                            <div className="dropdown privacydropd">
                              <a
                                href="#"
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                              >
                                Who can see your Friends
                              </a>
                              <div className="dropdown-menu">
                                <p>
                                  Choose who can see your list of connections
                                </p>
                                <div className="row">
                                  <div className="col-md-9 col-sm-12">
                                    <form className="radio-form">
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="customCheck4"
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="customCheck4"
                                        >
                                          Everyone
                                        </label>
                                      </div>
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="customCheck5"
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="customCheck5"
                                        >
                                          Friends
                                        </label>
                                      </div>
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="customCheck6"
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="customCheck6"
                                        >
                                          Only Me
                                        </label>
                                      </div>
                                    </form>
                                  </div>
                                  <div className="col-md-3 col-sm-12"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-12">
                            <div className="dropdown privacydropd">
                              <a
                                href="#"
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                              >
                                Manage who can discover your profile from your
                                email address
                              </a>
                              <div className="dropdown-menu">
                                <p>
                                  Choose who can discover your profile if they
                                  are not connected to you but have your email
                                  address
                                </p>
                                <div className="row">
                                  <div className="col-md-9 col-sm-12">
                                    <form className="radio-form">
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="customCheck7"
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="customCheck7"
                                        >
                                          Everyone
                                        </label>
                                      </div>
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="customCheck8"
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="customCheck8"
                                        >
                                          Friends
                                        </label>
                                      </div>
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="customCheck9"
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="customCheck9"
                                        >
                                          Only Me
                                        </label>
                                      </div>
                                    </form>
                                  </div>
                                  <div className="col-md-3 col-sm-12"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-12">
                            <div className="dropdown privacydropd">
                              <a
                                href="#"
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                              >
                                Search history
                              </a>
                              <div className="dropdown-menu">
                                <p>
                                  Clear all previous searches performed on
                                  LinkedIn
                                </p>
                                <div className="row">
                                  <div className="col-12">
                                    <form className="radio-form">
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="customCheck10"
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="customCheck10"
                                        >
                                          Clear All History
                                        </label>
                                      </div>
                                    </form>
                                    <div className="privabtns">
                                      <a href="#">Clear All History</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-12">
                            <div className="dropdown privacydropd">
                              <a
                                href="#"
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                              >
                                Sharing your profile when you click apply
                              </a>
                              <div className="dropdown-menu">
                                <p>
                                  Chose if you want to share your full profile
                                  with the job poster when you are taken off
                                  linkedin after clicking apply{" "}
                                </p>
                                <div className="row">
                                  <div className="col-md-9 col-sm-12">
                                    <form className="radio-form">
                                      <div className="custom-control custom-radio">
                                        <input
                                          type="radio"
                                          id="customRadio5"
                                          name="customRadio"
                                          className="custom-control-input"
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="customRadio5"
                                        >
                                          Yes
                                        </label>
                                      </div>
                                      <div className="custom-control custom-radio">
                                        <input
                                          type="radio"
                                          id="customRadio6"
                                          name="customRadio"
                                          className="custom-control-input"
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="customRadio6"
                                        >
                                          Yes
                                        </label>
                                      </div>
                                    </form>
                                  </div>
                                  <div className="col-md-3 col-sm-12"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-12">
                            <div className="privabtns">
                              <a href="#">Save</a>
                              <a href="#">Cancel</a>
                            </div>
                          </div>
                        </div>

                        <div
                          className="tab-pane fade"
                          id="nav-deactivate"
                          role="tabpanel"
                          aria-labelledby="nav-deactivate-tab"
                        >
                          <div className="acc-setting">
                            <h3>Deactivate Account</h3>
                            <form>
                              <div className="cp-field">
                                <h5>Email</h5>
                                <div className="cpp-fiel">
                                  <input
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                  />
                                  <i className="fa fa-envelope"></i>
                                </div>
                              </div>
                              <div className="cp-field">
                                <h5>Password</h5>
                                <div className="cpp-fiel">
                                  <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                  />
                                  <i className="fa fa-lock"></i>
                                </div>
                              </div>
                              <div className="cp-field">
                                <h5>Please Explain Further</h5>
                                <textarea></textarea>
                              </div>
                              <div className="cp-field">
                                <div className="fgt-sec">
                                  <input type="checkbox" name="cc" id="c4" />
                                  <label htmlFor="c4">
                                    <span></span>
                                  </label>
                                  <small>Email option out</small>
                                </div>
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit. Vivamus pretium nulla quis
                                  erat dapibus, varius hendrerit neque suscipit.
                                  Integer in ex euismod, posuere lectus id,
                                </p>
                              </div>
                              <div className="save-stngs pd3">
                                <ul>
                                  <li>
                                    <button type="submit">Save Setting</button>
                                  </li>
                                  <li>
                                    <button type="submit">
                                      Restore Setting
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
