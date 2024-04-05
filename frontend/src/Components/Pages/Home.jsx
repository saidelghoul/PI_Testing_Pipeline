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

import { useContext } from "react";
import { UserContext } from "../../../context/userContext";

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <>
      <main>
        <div className="main-section">
          <div className="container">
            <div className="main-section-data">
              <div className="row">
                <div className="col-lg-3 col-md-4 pd-left-none no-pd">
                  <div className="main-left-sidebar no-margin">
                    <div className="user-data full-width">
                      <div className="user-profile">
                        <div className="username-dt">
                          <div className="usr-pic">
                            <img
                              src="/assets/images/resources/user-pic.png"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="user-specs">
                          <> {!!user && <h1>{user.name}</h1>}</>
                          <span> {!!user && <h2>{user.role}</h2>}</span>
                          <span>
                            Département {!!user && <h2>{user.departement}</h2>}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="suggestions full-width">
                      <div className="sd-title">
                        <h3>Suggestions</h3>
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
                <div className="col-lg-6 col-md-8 no-pd">
                  <div className="main-ws-sec">
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
                            elit. Aliquam luctus hendrerit metus, ut ullamcorper
                            quam finibus at. Etiam id magna sit amet...{" "}
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
                              <img src="/assets/images/liked-img.png" alt="" />
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
                      <div className="top-profiles">
                        <div className="pf-hd">
                          <h3>Top Profiles</h3>
                          <i className="la la-ellipsis-v"></i>
                        </div>
                        <div className="profiles-slider">
                          <div className="user-profy">
                            <img
                              src="/assets/images/resources/user1.png"
                              alt=""
                            />
                            <h3>John Doe</h3>
                            <span>Graphic Designer</span>
                            <ul>
                              <li>
                                <a href="#" title="" className="followw">
                                  Follow
                                </a>
                              </li>
                              <li>
                                <a href="#" title="" className="envlp">
                                  <img
                                    src="/assets/images/envelop.png"
                                    alt=""
                                  />
                                </a>
                              </li>
                              <li>
                                <a href="#" title="" className="hire">
                                  hire
                                </a>
                              </li>
                            </ul>
                            <a href="#" title="">
                              View Profile
                            </a>
                          </div>
                          <div className="user-profy">
                            <img
                              src="/assets/images/resources/user2.png"
                              alt=""
                            />
                            <h3>John Doe</h3>
                            <span>Graphic Designer</span>
                            <ul>
                              <li>
                                <a href="#" title="" className="followw">
                                  Follow
                                </a>
                              </li>
                              <li>
                                <a href="#" title="" className="envlp">
                                  <img
                                    src="/assets/images/envelop.png"
                                    alt=""
                                  />
                                </a>
                              </li>
                              <li>
                                <a href="#" title="" className="hire">
                                  hire
                                </a>
                              </li>
                            </ul>
                            <a href="#" title="">
                              View Profile
                            </a>
                          </div>
                          <div className="user-profy">
                            <img
                              src="/assets/images/resources/user3.png"
                              alt=""
                            />
                            <h3>John Doe</h3>
                            <span>Graphic Designer</span>
                            <ul>
                              <li>
                                <a href="#" title="" className="followw">
                                  Follow
                                </a>
                              </li>
                              <li>
                                <a href="#" title="" className="envlp">
                                  <img
                                    src="/assets/images/envelop.png"
                                    alt=""
                                  />
                                </a>
                              </li>
                              <li>
                                <a href="#" title="" className="hire">
                                  hire
                                </a>
                              </li>
                            </ul>
                            <a href="#" title="">
                              View Profile
                            </a>
                          </div>
                          <div className="user-profy">
                            <img
                              src="/assets/images/resources/user1.png"
                              alt=""
                            />
                            <h3>John Doe</h3>
                            <span>Graphic Designer</span>
                            <ul>
                              <li>
                                <a href="#" title="" className="followw">
                                  Follow
                                </a>
                              </li>
                              <li>
                                <a href="#" title="" className="envlp">
                                  <img
                                    src="/assets/images/envelop.png"
                                    alt=""
                                  />
                                </a>
                              </li>
                              <li>
                                <a href="#" title="" className="hire">
                                  hire
                                </a>
                              </li>
                            </ul>
                            <a href="#" title="">
                              View Profile
                            </a>
                          </div>
                          <div className="user-profy">
                            <img
                              src="/assets/images/resources/user2.png"
                              alt=""
                            />
                            <h3>John Doe</h3>
                            <span>Graphic Designer</span>
                            <ul>
                              <li>
                                <a href="#" title="" className="followw">
                                  Follow
                                </a>
                              </li>
                              <li>
                                <a href="#" title="" className="envlp">
                                  <img
                                    src="/assets/images/envelop.png"
                                    alt=""
                                  />
                                </a>
                              </li>
                              <li>
                                <a href="#" title="" className="hire">
                                  hire
                                </a>
                              </li>
                            </ul>
                            <a href="#" title="">
                              View Profile
                            </a>
                          </div>
                          <div className="user-profy">
                            <img
                              src="/assets/images/resources/user3.png"
                              alt=""
                            />
                            <h3>John Doe</h3>
                            <span>Graphic Designer</span>
                            <ul>
                              <li>
                                <a href="#" title="" className="followw">
                                  Follow
                                </a>
                              </li>
                              <li>
                                <a href="#" title="" className="envlp">
                                  <img
                                    src="/assets/images/envelop.png"
                                    alt=""
                                  />
                                </a>
                              </li>
                              <li>
                                <a href="#" title="" className="hire">
                                  hire
                                </a>
                              </li>
                            </ul>
                            <a href="#" title="">
                              View Profile
                            </a>
                          </div>
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
                            elit. Aliquam luctus hendrerit metus, ut ullamcorper
                            quam finibus at. Etiam id magna sit amet...{" "}
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
                              <img src="/assets/images/liked-img.png" alt="" />
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
                      <div className="posty">
                        <div className="post-bar no-margin">
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
                        <div className="comment-section">
                          <a href="#" className="plus-ic">
                            <i className="la la-plus"></i>
                          </a>
                          <div className="comment-sec">
                            <ul>
                              <li>
                                <div className="comment-list">
                                  <div className="bg-img">
                                    <img
                                      src="/assets/images/resources/bg-img1.png"
                                      alt=""
                                    />
                                  </div>
                                  <div className="comment">
                                    <h3>John Doe</h3>
                                    <span>
                                      <img
                                        src="/assets/images/clock.png"
                                        alt=""
                                      />{" "}
                                      3 min ago
                                    </span>
                                    <p>Lorem ipsum dolor sit amet, </p>
                                    <a href="#" title="" className="active">
                                      <i className="fa fa-reply-all"></i>Reply
                                    </a>
                                  </div>
                                </div>
                                <ul>
                                  <li>
                                    <div className="comment-list">
                                      <div className="bg-img">
                                        <img
                                          src="/assets/images/resources/bg-img2.png"
                                          alt=""
                                        />
                                      </div>
                                      <div className="comment">
                                        <h3>John Doe</h3>
                                        <span>
                                          <img
                                            src="/assets/images/clock.png"
                                            alt=""
                                          />{" "}
                                          3 min ago
                                        </span>
                                        <p>Hi John </p>
                                        <a href="#" title="">
                                          <i className="fa fa-reply-all"></i>
                                          Reply
                                        </a>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <div className="comment-list">
                                  <div className="bg-img">
                                    <img
                                      src="/assets/images/resources/bg-img3.png"
                                      alt=""
                                    />
                                  </div>
                                  <div className="comment">
                                    <h3>John Doe</h3>
                                    <span>
                                      <img
                                        src="/assets/images/clock.png"
                                        alt=""
                                      />{" "}
                                      3 min ago
                                    </span>
                                    <p>
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipiscing elit. Aliquam luctus hendrerit
                                      metus, ut ullamcorper quam finibus at.
                                    </p>
                                    <a href="#" title="">
                                      <i className="fa fa-reply-all"></i>Reply
                                    </a>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className="post-comment">
                            <div className="cm_img">
                              <img
                                src="/assets/images/resources/bg-img4.png"
                                alt=""
                              />
                            </div>
                            <div className="comment_box">
                              <form>
                                <input
                                  type="text"
                                  placeholder="Post a comment"
                                />
                                <button type="submit">Send</button>
                              </form>
                            </div>
                          </div>
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
                </div>
                <div className="col-lg-3 pd-right-none no-pd">
                  <div className="right-sidebar">
                    <div className="widget widget-jobs">
                      <div className="sd-title">
                        <h3>Most Viewed This Week</h3>
                        <i className="la la-ellipsis-v"></i>
                      </div>
                      <div className="jobs-list">
                        <div className="job-info">
                          <div className="job-details">
                            <h3>Senior Product Designer</h3>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit..
                            </p>
                          </div>
                          <div className="hr-rate">
                            <span>$25/hr</span>
                          </div>
                        </div>
                        <div className="job-info">
                          <div className="job-details">
                            <h3>Senior UI / UX Designer</h3>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit..
                            </p>
                          </div>
                          <div className="hr-rate">
                            <span>$25/hr</span>
                          </div>
                        </div>
                        <div className="job-info">
                          <div className="job-details">
                            <h3>Junior Seo Designer</h3>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit..
                            </p>
                          </div>
                          <div className="hr-rate">
                            <span>$25/hr</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="widget suggestions full-width">
                      <div className="sd-title">
                        <h3>Most Viewed People</h3>
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
                            <span>C &amp; C++ Developer</span>
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

      <div className="chatbox-list">
        <div className="chatbox">
          <div className="chat-mg">
            <a href="#" title="">
              <img src="/assets/images/resources/usr-img1.png" alt="" />
            </a>
            <span>2</span>
          </div>
          <div className="conversation-box">
            <div className="con-title mg-3">
              <div className="chat-user-info">
                <img src="/assets/images/resources/us-img1.png" alt="" />
                <h3>
                  John Doe <span className="status-info"></span>
                </h3>
              </div>
              <div className="st-icons">
                <a href="#" title="">
                  <i className="la la-cog"></i>
                </a>
                <a href="#" title="" className="close-chat">
                  <i className="la la-minus-square"></i>
                </a>
                <a href="#" title="" className="close-chat">
                  <i className="la la-close"></i>
                </a>
              </div>
            </div>
            <div className="chat-hist mCustomScrollbar" data-mcs-theme="dark">
              <div className="chat-msg">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  rutrum congue leo eget malesuada. Vivamus suscipit tortor eget
                  felis porttitor.
                </p>
                <span>Sat, Aug 23, 1:10 PM</span>
              </div>
              <div className="date-nd">
                <span>Sunday, August 24</span>
              </div>
              <div className="chat-msg st2">
                <p>Cras ultricies ligula.</p>
                <span>5 minutes ago</span>
              </div>
              <div className="chat-msg">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  rutrum congue leo eget malesuada. Vivamus suscipit tortor eget
                  felis porttitor.
                </p>
                <span>Sat, Aug 23, 1:10 PM</span>
              </div>
            </div>
            <div className="typing-msg">
              <form>
                <textarea placeholder="Type a message here"></textarea>
                <button type="submit">
                  <i className="fa fa-send"></i>
                </button>
              </form>
              <ul className="ft-options">
                <li>
                  <a href="#" title="">
                    <i className="la la-smile-o"></i>
                  </a>
                </li>
                <li>
                  <a href="#" title="">
                    <i className="la la-camera"></i>
                  </a>
                </li>
                <li>
                  <a href="#" title="">
                    <i className="fa fa-paperclip"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="chatbox">
          <div className="chat-mg">
            <a href="#" title="">
              <img src="/assets/images/resources/usr-img2.png" alt="" />
            </a>
          </div>
          <div className="conversation-box">
            <div className="con-title mg-3">
              <div className="chat-user-info">
                <img src="/assets/images/resources/us-img1.png" alt="" />
                <h3>
                  John Doe <span className="status-info"></span>
                </h3>
              </div>
              <div className="st-icons">
                <a href="#" title="">
                  <i className="la la-cog"></i>
                </a>
                <a href="#" title="" className="close-chat">
                  <i className="la la-minus-square"></i>
                </a>
                <a href="#" title="" className="close-chat">
                  <i className="la la-close"></i>
                </a>
              </div>
            </div>
            <div className="chat-hist mCustomScrollbar" data-mcs-theme="dark">
              <div className="chat-msg">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  rutrum congue leo eget malesuada. Vivamus suscipit tortor eget
                  felis porttitor.
                </p>
                <span>Sat, Aug 23, 1:10 PM</span>
              </div>
              <div className="date-nd">
                <span>Sunday, August 24</span>
              </div>
              <div className="chat-msg st2">
                <p>Cras ultricies ligula.</p>
                <span>5 minutes ago</span>
              </div>
              <div className="chat-msg">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  rutrum congue leo eget malesuada. Vivamus suscipit tortor eget
                  felis porttitor.
                </p>
                <span>Sat, Aug 23, 1:10 PM</span>
              </div>
            </div>
            <div className="typing-msg">
              <form>
                <textarea placeholder="Type a message here"></textarea>
                <button type="submit">
                  <i className="fa fa-send"></i>
                </button>
              </form>
              <ul className="ft-options">
                <li>
                  <a href="#" title="">
                    <i className="la la-smile-o"></i>
                  </a>
                </li>
                <li>
                  <a href="#" title="">
                    <i className="la la-camera"></i>
                  </a>
                </li>
                <li>
                  <a href="#" title="">
                    <i className="fa fa-paperclip"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="chatbox">
          <div className="chat-mg bx">
            <a href="#" title="">
              <img src="/assets/images/chat.png" alt="" />
            </a>
            <span>2</span>
          </div>
          <div className="conversation-box">
            <div className="con-title">
              <h3>Messages</h3>
              <a href="#" title="" className="close-chat">
                <i className="la la-minus-square"></i>
              </a>
            </div>
            <div className="chat-list">
              <div className="conv-list active">
                <div className="usrr-pic">
                  <img src="/assets/images/resources/usy1.png" alt="" />
                  <span className="active-status activee"></span>
                </div>
                <div className="usy-info">
                  <h3>John Doe</h3>
                  <span>
                    Lorem ipsum dolor{" "}
                    <img src="/assets/images/smley.png" alt="" />
                  </span>
                </div>
                <div className="ct-time">
                  <span>1:55 PM</span>
                </div>
                <span className="msg-numbers">2</span>
              </div>
              <div className="conv-list">
                <div className="usrr-pic">
                  <img src="/assets/images/resources/usy2.png" alt="" />
                </div>
                <div className="usy-info">
                  <h3>John Doe</h3>
                  <span>
                    Lorem ipsum dolor{" "}
                    <img src="/assets/images/smley.png" alt="" />
                  </span>
                </div>
                <div className="ct-time">
                  <span>11:39 PM</span>
                </div>
              </div>
              <div className="conv-list">
                <div className="usrr-pic">
                  <img src="/assets/images/resources/usy3.png" alt="" />
                </div>
                <div className="usy-info">
                  <h3>John Doe</h3>
                  <span>
                    Lorem ipsum dolor{" "}
                    <img src="/assets/images/smley.png" alt="" />
                  </span>
                </div>
                <div className="ct-time">
                  <span>0.28 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
