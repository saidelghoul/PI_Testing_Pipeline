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

export default function Messages() {
  return (
    <>
      <section className="messages-page">
        <div className="container">
          <div className="messages-sec">
            <div className="row">
              <div className="col-lg-4 col-md-12 no-pdd">
                <div className="msgs-list">
                  <div className="msg-title">
                    <h3>Messages</h3>
                    <ul>
                      <li>
                        <a href="#" title="">
                          <i className="fa fa-cog"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" title="">
                          <i className="fa fa-ellipsis-v"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="messages-list">
                    <ul>
                      <li className="active">
                        <div className="usr-msg-details">
                          <div className="usr-ms-img">
                            <img
                              src="/assets/images/resources/m-img1.png"
                              alt=""
                            />
                            <span className="msg-status"></span>
                          </div>
                          <div className="usr-mg-info">
                            <h3>John Doe</h3>
                            <p>
                              Lorem ipsum dolor{" "}
                              <img src="/assets/images/smley.png" alt="" />
                            </p>
                          </div>
                          <span className="posted_time">1:55 PM</span>
                          <span className="msg-notifc">1</span>
                        </div>
                      </li>
                      <li>
                        <div className="usr-msg-details">
                          <div className="usr-ms-img">
                            <img
                              src="/assets/images/resources/m-img2.png"
                              alt=""
                            />
                          </div>
                          <div className="usr-mg-info">
                            <h3>David Vane</h3>
                            <p>Vestibulum ac diam..</p>
                          </div>
                          <span className="posted_time">1:55 PM</span>
                        </div>
                      </li>
                      <li>
                        <div className="usr-msg-details">
                          <div className="usr-ms-img">
                            <img
                              src="/assets/images/resources/m-img3.png"
                              alt=""
                            />
                          </div>
                          <div className="usr-mg-info">
                            <h3>Nancy Dilan</h3>
                            <p>Quam vehicula.</p>
                          </div>
                          <span className="posted_time">1:55 PM</span>
                        </div>
                      </li>
                      <li>
                        <div className="usr-msg-details">
                          <div className="usr-ms-img">
                            <img
                              src="/assets/images/resources/m-img4.png"
                              alt=""
                            />
                            <span className="msg-status"></span>
                          </div>
                          <div className="usr-mg-info">
                            <h3>Norman Kenney</h3>
                          </div>
                          <span className="posted_time">1:55 PM</span>
                        </div>
                      </li>
                      <li>
                        <div className="usr-msg-details">
                          <div className="usr-ms-img">
                            <img
                              src="/assets/images/resources/m-img5.png"
                              alt=""
                            />
                            <span className="msg-status"></span>
                          </div>
                          <div className="usr-mg-info">
                            <h3>James Dilan</h3>
                            <p>Vivamus magna just..</p>
                          </div>
                          <span className="posted_time">1:55 PM</span>
                        </div>
                      </li>
                      <li>
                        <div className="usr-msg-details">
                          <div className="usr-ms-img">
                            <img
                              src="/assets/images/resources/m-img6.png"
                              alt=""
                            />
                          </div>
                          <div className="usr-mg-info">
                            <h3>Mike Dorn</h3>
                            <p>Praesent sapien massa.</p>
                          </div>
                          <span className="posted_time">1:55 PM</span>
                        </div>
                      </li>
                      <li>
                        <div className="usr-msg-details">
                          <div className="usr-ms-img">
                            <img
                              src="/assets/images/resources/m-img7.png"
                              alt=""
                            />
                          </div>
                          <div className="usr-mg-info">
                            <h3>Patrick Morison</h3>
                            <p>Convallis a pellente...</p>
                          </div>
                          <span className="posted_time">1:55 PM</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-12 pd-right-none pd-left-none">
                <div className="main-conversation-box">
                  <div className="message-bar-head">
                    <div className="usr-msg-details">
                      <div className="usr-ms-img">
                        <img src="/assets/images/resources/m-img1.png" alt="" />
                      </div>
                      <div className="usr-mg-info">
                        <h3>John Doe</h3>
                        <p>Online</p>
                      </div>
                    </div>
                    <a href="#" title="">
                      <i className="fa fa-ellipsis-v"></i>
                    </a>
                  </div>
                  <div className="messages-line">
                    <div className="main-message-box">
                      <div className="messg-usr-img">
                        <img src="/assets/images/resources/m-img1.png" alt="" />
                      </div>
                      <div className="message-dt">
                        <div className="message-inner-dt img-bx">
                          <img
                            src="/assets/images/resources/mt-img1.png"
                            alt=""
                          />
                          <img
                            src="/assets/images/resources/mt-img2.png"
                            alt=""
                          />
                          <img
                            src="/assets/images/resources/mt-img3.png"
                            alt=""
                          />
                        </div>
                        <span>Sat, Aug 23, 1:08 PM</span>
                      </div>
                    </div>
                    <div className="main-message-box ta-right">
                      <div className="message-dt">
                        <div className="message-inner-dt">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Donec rutrum congue leo eget malesuada.
                            Vivamus suscipit tortor eget felis porttitor.
                          </p>
                        </div>
                        <span>Sat, Aug 23, 1:08 PM</span>
                      </div>
                      <div className="messg-usr-img">
                        <img src="/assets/images/resources/m-img2.png" alt="" />
                      </div>
                    </div>
                    <div className="main-message-box st3">
                      <div className="message-dt st3">
                        <div className="message-inner-dt">
                          <p>
                            Cras ultricies ligula.
                            <img src="/assets/images/smley.png" alt="" />
                          </p>
                        </div>
                        <span>5 minutes ago</span>
                      </div>
                      <div className="messg-usr-img">
                        <img src="/assets/images/resources/m-img1.png" alt="" />
                      </div>
                    </div>
                    <div className="main-message-box ta-right">
                      <div className="message-dt">
                        <div className="message-inner-dt">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Donec rutrum congue leo eget malesuada.
                            Vivamus suscipit tortor eget felis porttitor.
                          </p>
                        </div>
                        <span>Sat, Aug 23, 1:08 PM</span>
                      </div>
                      <div className="messg-usr-img">
                        <img src="/assets/images/resources/m-img2.png" alt="" />
                      </div>
                    </div>
                    <div className="main-message-box st3">
                      <div className="message-dt st3">
                        <div className="message-inner-dt">
                          <p>Lorem ipsum dolor sit amet</p>
                        </div>
                        <span>2 minutes ago</span>
                      </div>
                      <div className="messg-usr-img">
                        <img src="/assets/images/resources/m-img1.png" alt="" />
                      </div>
                    </div>
                    <div className="main-message-box ta-right">
                      <div className="message-dt">
                        <div className="message-inner-dt">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Donec rutrum congue leo eget malesuada.
                            Vivamus suscipit tortor eget felis porttitor.
                          </p>
                        </div>
                        <span>Sat, Aug 23, 1:08 PM</span>
                      </div>
                      <div className="messg-usr-img">
                        <img src="/assets/images/resources/m-img2.png" alt="" />
                      </div>
                    </div>
                    <div className="main-message-box st3">
                      <div className="message-dt st3">
                        <div className="message-inner-dt">
                          <p>....</p>
                        </div>
                        <span>Typing...</span>
                      </div>
                      <div className="messg-usr-img">
                        <img src="/assets/images/resources/m-img1.png" alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="message-send-area">
                    <form>
                      <div className="mf-field">
                        <input
                          type="text"
                          name="message"
                          placeholder="Type a message here"
                        />
                        <button type="submit">Send</button>
                      </div>
                      <ul>
                        <li>
                          <a href="#" title="">
                            <i className="fas fa-smile"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#" title="">
                            <i className="fas fa-camera"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#" title="">
                            <i className="fas fa-paperclip"></i>
                          </a>
                        </li>
                      </ul>
                    </form>
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
