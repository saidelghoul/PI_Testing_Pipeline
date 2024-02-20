import '../../../public/assets/css/animate.css';
import '../../../public/assets/css/bootstrap.min.css';
import '../../../public/assets/css/line-awesome.css';
import '../../../public/assets/css/line-awesome-font-awesome.min.css';
import '../../../public/assets/vendor/fontawesome-free/css/all.min.css';
import '../../../public/assets/css/font-awesome.min.css';
import '../../../public/assets/css/jquery.mCustomScrollbar.min.css';
import '../../../public/assets/css/style.css';
import '../../../public/assets/css/responsive.css';
import '../../../public/assets/lib/slick/slick.css';
import '../../../public/assets/lib/slick/slick-theme.css';


export default function Groups() {
  return (
    <>
      <section className="cover-sec">
			<img src="/assets/images/resources/company-cover.jpg" alt=""/>
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
											<img src="/assets/images/resources/company-profile.png" alt=""/>
										</div>
										<div className="user_pro_status">
											<ul className="flw-hr">
												<li><a href="#" title="" className="flww"><i className="la la-plus"></i> Follow</a></li>
											</ul>
											<ul className="flw-status">
												<li>
													<span>Following</span>
													<b>34</b>
												</li>
												<li>
													<span>Followers</span>
													<b>155</b>
												</li>
											</ul>
										</div>
										
									</div>
									<div className="suggestions full-width">
										<div className="sd-title">
											<h3>Suggestions</h3>
											<i className="la la-ellipsis-v"></i>
										</div>
										<div className="suggestions-list">
											<div className="suggestion-usd">
												<img src="/assets/images/resources/s1.png" alt=""/>
												<div className="sgt-text">
													<h4>Jessica William</h4>
													<span>Graphic Designer</span>
												</div>
												<span><i className="la la-plus"></i></span>
											</div>
											<div className="suggestion-usd">
												<img src="/assets/images/resources/s2.png" alt=""/>
												<div className="sgt-text">
													<h4>John Doe</h4>
													<span>PHP Developer</span>
												</div>
												<span><i className="la la-plus"></i></span>
											</div>
											<div className="suggestion-usd">
												<img src="/assets/images/resources/s3.png" alt=""/>
												<div className="sgt-text">
													<h4>Poonam</h4>
													<span>Wordpress Developer</span>
												</div>
												<span><i className="la la-plus"></i></span>
											</div>
											<div className="suggestion-usd">
												<img src="/assets/images/resources/s4.png" alt=""/>
												<div className="sgt-text">
													<h4>Bill Gates</h4>
													<span>C & C++ Developer</span>
												</div>
												<span><i className="la la-plus"></i></span>
											</div>
											<div className="suggestion-usd">
												<img src="/assets/images/resources/s5.png" alt=""/>
												<div className="sgt-text">
													<h4>Jessica William</h4>
													<span>Graphic Designer</span>
												</div>
												<span><i className="la la-plus"></i></span>
											</div>
											<div className="suggestion-usd">
												<img src="/assets/images/resources/s6.png" alt=""/>
												<div className="sgt-text">
													<h4>John Doe</h4>
													<span>PHP Developer</span>
												</div>
												<span><i className="la la-plus"></i></span>
											</div>
											<div className="view-more">
												<a href="#" title="">View More</a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="main-ws-sec">
									<div className="user-tab-sec">
										<h3>Facebook Inc.</h3>
										<div className="star-descp">
											<span>Established Since 2009</span>
											<ul>
												<li><i className="fa fa-star"></i></li>
												<li><i className="fa fa-star"></i></li>
												<li><i className="fa fa-star"></i></li>
												<li><i className="fa fa-star"></i></li>
												<li><i className="fa fa-star-half-o"></i></li>
											</ul>
										</div>
										<div className="tab-feed">
											<ul>
												<li data-tab="feed-dd" className="active">
													<a href="#" title="">
														<img src="/assets/images/ic1.png" alt=""/>
														<span>Feed</span>
													</a>
												</li>
												<li data-tab="info-dd">
													<a href="#" title="">
														<img src="/assets/images/ic2.png" alt=""/>
														<span>Info</span>
													</a>
												</li>
												<li data-tab="portfolio-dd">
													<a href="#" title="">
														<img src="/assets/images/ic3.png" alt=""/>
														<span>Portfolio</span>
													</a>
												</li>
											</ul>
										</div>
									</div>
									<div className="product-feed-tab current" id="feed-dd">
										<div className="posts-section">
											<div className="post-bar">
												<div className="post_topbar">
													<div className="usy-dt">
														<img src="/assets/images/resources/company-pic.png" alt=""/>
														<div className="usy-name">
															<h3>Facebook Inc.</h3>
															<span><img src="/assets/images/clock.png" alt=""/>3 min ago</span>
														</div>
													</div>
													<div className="ed-opts">
														<a href="#" title="" className="ed-opts-open"><i className="la la-ellipsis-v"></i></a>
														<ul className="ed-options">
															<li><a href="#" title="">Edit Post</a></li>
															<li><a href="#" title="">Unsaved</a></li>
															<li><a href="#" title="">Unbid</a></li>
															<li><a href="#" title="">Close</a></li>
															<li><a href="#" title="">Hide</a></li>
														</ul>
													</div>
												</div>
												<div className="epi-sec">
													<ul className="descp">
														<li><img src="/assets/images/icon8.png" alt=""/><span>Epic Coder</span></li>
														<li><img src="/assets/images/icon9.png" alt=""/><span>India</span></li>
													</ul>
													<ul className="bk-links">
														<li><a href="#" title=""><i className="la la-bookmark"></i></a></li>
														<li><a href="#" title=""><i className="la la-envelope"></i></a></li>
													</ul>
												</div>
												<div className="job_descp">
													<h3>Senior PHP Developer</h3>
													<ul className="job-dt">
														<li><a href="#" title="">Full Time</a></li>
														<li><span>$30 / hr</span></li>
													</ul>
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus hendrerit metus, ut ullamcorper quam finibus at. Etiam id magna sit amet... <a href="#" title="">view more</a></p>
													<ul className="skill-tags">
														<li><a href="#" title="">HTML</a></li>
														<li><a href="#" title="">PHP</a></li>
														<li><a href="#" title="">CSS</a></li>
														<li><a href="#" title="">Javascript</a></li>
														<li><a href="#" title="">Wordpress</a></li> 	
													</ul>
												</div>
												<div className="job-status-bar">
													<ul className="like-com">
														<li>
															<a href="#" className="active"><i className="fas fa-heart"></i> Like</a>
															<img src="/assets/images/liked-img.png" alt=""/>
															<span>25</span>
														</li>
														<li><a href="#" className="com"><i className="fas fa-comment-alt"></i> Comments 15</a></li>
													</ul>
													<a href="#"><i className="fas fa-eye"></i>Views 50</a>
												</div>
											</div>
											<div className="post-bar">
												<div className="post_topbar">
													<div className="usy-dt">
														<img src="/assets/images/resources/company-pic.png" alt=""/>
														<div className="usy-name">
															<h3>Facebook Inc.</h3>
															<span><img src="/assets/images/clock.png" alt=""/>3 min ago</span>
														</div>
													</div>
													<div className="ed-opts">
														<a href="#" title="" className="ed-opts-open"><i className="la la-ellipsis-v"></i></a>
														<ul className="ed-options">
															<li><a href="#" title="">Edit Post</a></li>
															<li><a href="#" title="">Unsaved</a></li>
															<li><a href="#" title="">Unbid</a></li>
															<li><a href="#" title="">Close</a></li>
															<li><a href="#" title="">Hide</a></li>
														</ul>
													</div>
												</div>
												<div className="epi-sec">
													<ul className="descp">
														<li><img src="/assets/images/icon8.png" alt=""/><span>Epic Coder</span></li>
														<li><img src="/assets/images/icon9.png" alt=""/><span>India</span></li>
													</ul>
													<ul className="bk-links">
														<li><a href="#" title=""><i className="la la-bookmark"></i></a></li>
														<li><a href="#" title=""><i className="la la-envelope"></i></a></li>
													</ul>
												</div>
												<div className="job_descp">
													<h3>Senior UI / UX designer</h3>
													<ul className="job-dt">
														<li><a href="#" title="">Full Time</a></li>
														<li><span>$30 / hr</span></li>
													</ul>
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus hendrerit metus, ut ullamcorper quam finibus at. Etiam id magna sit amet... <a href="#" title="">view more</a></p>
													<ul className="skill-tags">
														<li><a href="#" title="">HTML</a></li>
														<li><a href="#" title="">PHP</a></li>
														<li><a href="#" title="">CSS</a></li>
														<li><a href="#" title="">Javascript</a></li>
														<li><a href="#" title="">Wordpress</a></li> 	
													</ul>
												</div>
												<div className="job-status-bar">
													<ul className="like-com">
														<li>
															<a href="#"><i className="fas fa-heart"></i> Like</a>
															<img src="/assets/images/liked-img.png" alt=""/>
															<span>25</span>
														</li>
														<li><a href="#" className="com"><i className="fas fa-comment-alt"></i> Comments 15</a></li>
													</ul>
													<a href="#"><i className="fas fa-eye"></i>Views 50</a>
												</div>
											</div>
											<div className="post-bar">
												<div className="post_topbar">
													<div className="usy-dt">
														<img src="/assets/images/resources/company-pic.png" alt=""/>
														<div className="usy-name">
															<h3>Facebook Inc.</h3>
															<span><img src="/assets/images/clock.png" alt=""/>3 min ago</span>
														</div>
													</div>
													<div className="ed-opts">
														<a href="#" title="" className="ed-opts-open"><i className="la la-ellipsis-v"></i></a>
														<ul className="ed-options">
															<li><a href="#" title="">Edit Post</a></li>
															<li><a href="#" title="">Unsaved</a></li>
															<li><a href="#" title="">Unbid</a></li>
															<li><a href="#" title="">Close</a></li>
															<li><a href="#" title="">Hide</a></li>
														</ul>
													</div>
												</div>
												<div className="epi-sec">
													<ul className="descp">
														<li><img src="/assets/images/icon8.png" alt=""/><span>Epic Coder</span></li>
														<li><img src="/assets/images/icon9.png" alt=""/><span>India</span></li>
													</ul>
													<ul className="bk-links">
														<li><a href="#" title=""><i className="la la-bookmark"></i></a></li>
														<li><a href="#" title=""><i className="la la-envelope"></i></a></li>
													</ul>
												</div>
												<div className="job_descp">
													<h3>Senior Wordpress Developer</h3>
													<ul className="job-dt">
														<li><a href="#" title="">Full Time</a></li>
														<li><span>$30 / hr</span></li>
													</ul>
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus hendrerit metus, ut ullamcorper quam finibus at. Etiam id magna sit amet... <a href="#" title="">view more</a></p>
													<ul className="skill-tags">
														<li><a href="#" title="">HTML</a></li>
														<li><a href="#" title="">PHP</a></li>
														<li><a href="#" title="">CSS</a></li>
														<li><a href="#" title="">Javascript</a></li>
														<li><a href="#" title="">Wordpress</a></li> 	
													</ul>
												</div>
												<div className="job-status-bar">
													<ul className="like-com">
														<li>
															<a href="#"><i className="fas fa-heart"></i> Like</a>
															<img src="/assets/images/liked-img.png" alt=""/>
															<span>25</span>
														</li>
														<li><a href="#" className="com"><i className="fas fa-comment-alt"></i> Comments 15</a></li>
													</ul>
													<a href="#"><i className="fas fa-eye"></i>Views 50</a>
												</div>
											</div>
											<div className="post-bar">
												<div className="post_topbar">
													<div className="usy-dt">
														<img src="/assets/images/resources/company-pic.png" alt=""/>
														<div className="usy-name">
															<h3>Facebook Inc. 	</h3>
															<span><img src="/assets/images/clock.png" alt=""/>3 min ago</span>
														</div>
													</div>
													<div className="ed-opts">
														<a href="#" title="" className="ed-opts-open"><i className="la la-ellipsis-v"></i></a>
														<ul className="ed-options">
															<li><a href="#" title="">Edit Post</a></li>
															<li><a href="#" title="">Unsaved</a></li>
															<li><a href="#" title="">Unbid</a></li>
															<li><a href="#" title="">Close</a></li>
															<li><a href="#" title="">Hide</a></li>
														</ul>
													</div>
												</div>
												<div className="epi-sec">
													<ul className="descp">
														<li><img src="/assets/images/icon8.png" alt=""/><span>Epic Coder</span></li>
														<li><img src="/assets/images/icon9.png" alt=""/><span>India</span></li>
													</ul>
													<ul className="bk-links">
														<li><a href="#" title=""><i className="la la-bookmark"></i></a></li>
														<li><a href="#" title=""><i className="la la-envelope"></i></a></li>
													</ul>
												</div>
												<div className="job_descp">
													<h3>Senior UI / UX designer</h3>
													<ul className="job-dt">
														<li><a href="#" title="">Full Time</a></li>
														<li><span>$30 / hr</span></li>
													</ul>
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus hendrerit metus, ut ullamcorper quam finibus at. Etiam id magna sit amet... <a href="#" title="">view more</a></p>
													<ul className="skill-tags">
														<li><a href="#" title="">HTML</a></li>
														<li><a href="#" title="">PHP</a></li>
														<li><a href="#" title="">CSS</a></li>
														<li><a href="#" title="">Javascript</a></li>
														<li><a href="#" title="">Wordpress</a></li> 	
													</ul>
												</div>
												<div className="job-status-bar">
													<ul className="like-com">
														<li>
															<a href="#"><i className="fas fa-heart"></i> Like</a>
															<img src="/assets/images/liked-img.png" alt=""/>
															<span>25</span>
														</li>
														<li><a href="#" className="com"><i className="fas fa-comment-alt"></i> Comments 15</a></li>
													</ul>
													<a href="#"><i className="fas fa-eye"></i>Views 50</a>
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
									<div className="product-feed-tab" id="info-dd">
										<div className="user-profile-ov">
											<h3><a href="#" title="" className="overview-open">Overview</a> <a href="#" title="" className="overview-open"><i className="fa fa-pencil"></i></a></h3>
											<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tempor aliquam felis, nec condimentum ipsum commodo id. Vivamus sit amet augue nec urna efficitur tincidunt. Vivamus consectetur aliquam lectus commodo viverra. Nunc eu augue nec arcu efficitur faucibus. Aliquam accumsan ac magna convallis bibendum. Quisque laoreet augue eget augue fermentum scelerisque. Vivamus dignissim mollis est dictum blandit. Nam porta auctor neque sed congue. Nullam rutrum eget ex at maximus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget vestibulum lorem.</p>
										</div>
										<div className="user-profile-ov st2">
											<h3><a href="#" title="" className="esp-bx-open">Establish Since </a><a href="#" title="" className="esp-bx-open"><i className="fa fa-pencil"></i></a> <a href="#" title="" className="esp-bx-open"><i className="fa fa-plus-square"></i></a></h3>
											<span>February 2004</span>
										</div>
										<div className="user-profile-ov">
											<h3><a href="#" title="" className="emp-open">Total Employees</a> <a href="#" title="" className="emp-open"><i className="fa fa-pencil"></i></a> <a href="#" title="" className="emp-open"><i className="fa fa-plus-square"></i></a></h3>
											<span>17,048</span>
										</div>
										<div className="user-profile-ov">
											<h3><a href="#" title="" className="lct-box-open">Location</a> <a href="#" title="" className="lct-box-open"><i className="fa fa-pencil"></i></a> <a href="#" title="" className="lct-box-open"><i className="fa fa-plus-square"></i></a></h3>
											<h4>USA</h4>
											<p> Menlo Park, California, United States</p>
										</div>
									</div>
									<div className="product-feed-tab" id="portfolio-dd">
										<div className="portfolio-gallery-sec">
											<h3>Portfolio</h3>
											<div className="gallery_pf">
												<div className="row">
													<div className="col-lg-4 col-md-4 col-sm-4 col-6">
														<div className="gallery_pt">
															<img src="/assets/images/resources/pf-img1.jpg" alt=""/>
															<a href="#" title=""><img src="/assets/images/all-out.png" alt=""/></a>
														</div>
													</div>
													<div className="col-lg-4 col-md-4 col-sm-4 col-6">
														<div className="gallery_pt">
															<img src="/assets/images/resources/pf-img2.jpg" alt=""/>
															<a href="#" title=""><img src="/assets/images/all-out.png" alt=""/></a>
														</div>
													</div>
													<div className="col-lg-4 col-md-4 col-sm-4 col-6">
														<div className="gallery_pt">
															<img src="/assets/images/resources/pf-img3.jpg" alt=""/>
															<a href="#" title=""><img src="/assets/images/all-out.png" alt=""/></a>
														</div>
													</div>
													<div className="col-lg-4 col-md-4 col-sm-4 col-6">
														<div className="gallery_pt">
															<img src="/assets/images/resources/pf-img4.jpg" alt=""/>
															<a href="#" title=""><img src="/assets/images/all-out.png" alt=""/></a>
														</div>
													</div>
													<div className="col-lg-4 col-md-4 col-sm-4 col-6">
														<div className="gallery_pt">
															<img src="/assets/images/resources/pf-img5.jpg" alt=""/>
															<a href="#" title=""><img src="/assets/images/all-out.png" alt=""/></a>
														</div>
													</div>
													<div className="col-lg-4 col-md-4 col-sm-4 col-6">
														<div className="gallery_pt">
															<img src="/assets/images/resources/pf-img6.jpg" alt=""/>
															<a href="#" title=""><img src="/assets/images/all-out.png" alt=""/></a>
														</div>
													</div>
													<div className="col-lg-4 col-md-4 col-sm-4 col-6">
														<div className="gallery_pt">
															<img src="/assets/images/resources/pf-img7.jpg" alt=""/>
															<a href="#" title=""><img src="/assets/images/all-out.png" alt=""/></a>
														</div>
													</div>
													<div className="col-lg-4 col-md-4 col-sm-4 col-6">
														<div className="gallery_pt">
															<img src="/assets/images/resources/pf-img8.jpg" alt=""/>
															<a href="#" title=""><img src="/assets/images/all-out.png" alt=""/></a>
														</div>
													</div>
													<div className="col-lg-4 col-md-4 col-sm-4 col-6">
														<div className="gallery_pt">
															<img src="/assets/images/resources/pf-img9.jpg" alt=""/>
															<a href="#" title=""><img src="/assets/images/all-out.png" alt=""/></a>
														</div>
													</div>
													<div className="col-lg-4 col-md-4 col-sm-4 col-6">
														<div className="gallery_pt">
															<img src="/assets/images/resources/pf-img10.jpg" alt=""/>
															<a href="#" title=""><img src="/assets/images/all-out.png" alt=""/></a>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-3">
								<div className="right-sidebar">
									<div className="message-btn">
										<a href="#" title=""><i className="fa fa-envelope"></i> Message</a>
									</div>
									<div className="widget widget-portfolio">
										<div className="wd-heady">
											<h3>Portfolio</h3>
											<img src="/assets/images/photo-icon.png" alt=""/>
										</div>
										<div className="pf-gallery">
											<ul>
												<li><a href="#" title=""><img src="/assets/images/resources/pf-gallery1.png" alt=""/></a></li>
												<li><a href="#" title=""><img src="/assets/images/resources/pf-gallery2.png" alt=""/></a></li>
												<li><a href="#" title=""><img src="/assets/images/resources/pf-gallery3.png" alt=""/></a></li>
												<li><a href="#" title=""><img src="/assets/images/resources/pf-gallery4.png" alt=""/></a></li>
												<li><a href="#" title=""><img src="/assets/images/resources/pf-gallery5.png" alt=""/></a></li>
												<li><a href="#" title=""><img src="/assets/images/resources/pf-gallery6.png" alt=""/></a></li>
												<li><a href="#" title=""><img src="/assets/images/resources/pf-gallery7.png" alt=""/></a></li>
												<li><a href="#" title=""><img src="/assets/images/resources/pf-gallery8.png" alt=""/></a></li>
												<li><a href="#" title=""><img src="/assets/images/resources/pf-gallery9.png" alt=""/></a></li>
												<li><a href="#" title=""><img src="/assets/images/resources/pf-gallery10.png" alt=""/></a></li>
												<li><a href="#" title=""><img src="/assets/images/resources/pf-gallery11.png" alt=""/></a></li>
												<li><a href="#" title=""><img src="/assets/images/resources/pf-gallery12.png" alt=""/></a></li>
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

    </>
  )
}
