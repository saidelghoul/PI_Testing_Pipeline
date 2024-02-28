import '../../public/assets/css/animate.css';
import '../../public/assets/css/bootstrap.min.css';
import '../../public/assets/css/line-awesome.css';
import '../../public/assets/css/line-awesome-font-awesome.min.css';
import '../../public/assets/vendor/fontawesome-free/css/all.min.css';
import '../../public/assets/css/font-awesome.min.css';
import '../../public/assets/css/style.css';
import '../../public/assets/css/responsive.css';
import '../../public/assets/lib/slick/slick.css';
import '../../public/assets/lib/slick/slick-theme.css';
import { useState } from "react";
import axios from 'axios';
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'


export default function SignIn() {
	
	const navigate = useNavigate()
    const [data, setData]= useState({
        email: '',
        password:'',
    })
    const loginUser = async(e) =>{
        e.preventDefault()
          const {email, password} = data
        try {
          const {data} = await axios.post('/login', {
            email,
            password
          });
          if(data.error){
            toast.error(data.error)
          }else{
            setData({});
            navigate('/home')
          }

        } catch (error) {
          console.log(error)
        }
      }

 const [registerdata,setRegisterData]=useState({
        name: '',
        email: '',
        password: '',
        role: '',

    })

    const registerUser = async (e)=>{
        e.preventDefault();
        const {name, email, password,role} = registerdata
        try{
          const{data1} = await axios.post('/register',{
            name,email,password,role
          })
          if(data1.error){
            toast.error(data1.error)
          }
          else{
            setRegisterData({})
            toast.success('inscription successful. Welcome!')
            navigate('/signin')
          }
        }catch(error){
            console.log(error)
        }
    }

  return (
   <>
   
   <div className="sign-in-page " style={{backgroundColor:"#dc3545"}}>
			<div className="signin-popup">
				<div className="signin-pop">
					<div className="row">
						<div className="col-lg-6">
							<div className="cmp-info">
								<div className="cm-logo">
									<img src="/assets/images/esprit.png" alt=""/>
								</div>
								<img src="/assets/images/cm-main-img.png" alt=""/>			
							</div>
						</div>
						<div className="col-lg-6">
							<div className="login-sec">
								<ul className="sign-control">
									<li data-tab="tab-1" className="current"><a href="#" title="">Sign in</a></li>				
									<li data-tab="tab-2"><a href="#" title="">Sign up</a></li>				
								</ul>			
								<div className="sign_in_sec current" id="tab-1">
									
									<h3>Sign in</h3>
									<form  onSubmit={loginUser}>
										<div className="row">
											<div className="col-lg-12 no-pdd">
												<div className="sn-field">
													<input type="text" name="email" placeholder="email .. "  value={data.email}  onChange={(e) => setData({...data, email: e.target.value})}/>
													<i className="la la-user"></i>
												</div>
											</div>
											<div className="col-lg-12 no-pdd">
												<div className="sn-field">
													<input type="password" name="password" placeholder="Password" value={data.password}  onChange={(e) => setData({...data, password: e.target.value})}/>
													<i className="la la-lock"></i>
												</div>
											</div>
											<div className="col-lg-12 no-pdd">
												<div className="checky-sec">
													<div className="fgt-sec">
														<input type="checkbox" name="cc" id="c1"/>
														<label htmlFor="c1">
															<span></span>
														</label>
														<small>Remember me</small>
													</div>
													<a href="#" title="">Forgot Password?</a>
												</div>
											</div>
											<div className="col-lg-12 no-pdd">
												<button type="submit" value="submit">Sign in</button>
											</div>
										</div>
									</form>
									<div className="login-resources">
										<h4>Login Via Social Account</h4>
										<ul>
											<li><a href="#" title="" className="fb"><i className="fa fa-facebook"></i>Login Via Facebook</a></li>
											
										</ul>
									</div>
								</div>
								<div className="sign_in_sec" id="tab-2">
								{/*	<div className="signup-tab">
										<i className="fa fa-long-arrow-left"></i>
										<h2>johndoe@example.com</h2>
										<ul>
											<li data-tab="tab-3" className="current"><a href="#" title="">User</a></li>
											<li data-tab="tab-4"><a href="#" title="">Company</a></li>
										</ul>
 									 </div>*/}
									<div className="dff-tab current" id="tab-3">
										<form onSubmit={registerUser}>
											<div className="row">
												<div className="col-lg-12 no-pdd">
													<div className="sn-field">
														<input type="text" name="name" placeholder="Full Name" value={registerdata.name}  onChange={(e) => setRegisterData({...registerdata, name: e.target.value})}/>
														<i className="la la-user"></i>
													</div>
												</div>
												<div className="col-lg-12 no-pdd">
													<div className="sn-field">
														<input type="email" name="email" placeholder="email" value={registerdata.email}  onChange={(e) => setRegisterData({...registerdata, email: e.target.value})}/>
														<i className="la la-globe"></i>
													</div>
												</div>
												{/*<div className="col-lg-12 no-pdd">
													<div className="sn-field">
														<select>
															<option>Category</option>
															<option>Category 1</option>
															<option>Category 2</option>
															<option>Category 3</option>
															<option>Category 4</option>
														</select>
														<i className="la la-dropbox"></i>
														<span><i className="fa fa-ellipsis-h"></i></span>
													</div>
 												 </div>*/}
												<div className="col-lg-12 no-pdd">
													<div className="sn-field">
														<input type="password" name="password" placeholder="Password" value={registerdata.password}  onChange={(e) => setRegisterData({...registerdata, password: e.target.value})}/>
														<i className="la la-lock"></i>
													</div>
												</div>
												{/*<div className="col-lg-12 no-pdd">
													<div className="sn-field">
														<input type="password" name="repeat-password" placeholder="Repeat Password"/>
														<i className="la la-lock"></i>
													</div>
												</div>*/}
												{/*<div className="col-lg-12 no-pdd">
													<div className="checky-sec st2">
														<div className="fgt-sec">
															<input type="checkbox" name="cc" id="c2"/>
															<label htmlFor="c2">
																<span></span>
															</label>
															<small>Yes, I understand and agree to the workwise Terms & Conditions.</small>
														</div>
													</div>
											</div>*/}
												<div className="col-lg-12 no-pdd">
													<button type="submit" value="submit">Enregistrer</button>
												</div>
											</div>
										</form>
									</div>
									{/*<div className="dff-tab" id="tab-4">
										<form >
											<div className="row">
												<div className="col-lg-12 no-pdd">
													<div className="sn-field">
														<input type="text" name="company-name" placeholder="Company Name"/>
														<i className="la la-building"></i>
													</div>
												</div>
												<div className="col-lg-12 no-pdd">
													<div className="sn-field">
														<input type="text" name="country" placeholder="Country"/>
														<i className="la la-globe"></i>
													</div>
												</div>
												<div className="col-lg-12 no-pdd">
													<div className="sn-field">
														<input type="password" name="password" placeholder="Password"/>
														<i className="la la-lock"></i>
													</div>
												</div>
												<div className="col-lg-12 no-pdd">
													<div className="sn-field">
														<input type="password" name="repeat-password" placeholder="Repeat Password"/>
														<i className="la la-lock"></i>
													</div>
												</div>
												<div className="col-lg-12 no-pdd">
													<div className="checky-sec st2">
														<div className="fgt-sec">
															<input type="checkbox" name="cc" id="c3"/>
															<label htmlFor="c3">
																<span></span>
															</label>
															<small>Yes, I understand and agree to the workwise Terms & Conditions.</small>
														</div>
													</div>
												</div>
												<div className="col-lg-12 no-pdd">
													<button type="submit" value="submit">Get Started</button>
												</div>
											</div>
										</form>
											</div>*/}
								</div>		
							</div>
						</div>
					</div>		
				</div>
			</div>
			<div className="footy-sec">
				<div className="container">
					<ul>
						<li><a href="help-center.html" title="">Help Center</a></li>
						<li><a href="about.html" title="">About</a></li>
						<li><a href="#" title="">Privacy Policy</a></li>
						<li><a href="#" title="">Community Guidelines</a></li>
						<li><a href="#" title="">Cookies Policy</a></li>
						<li><a href="#" title="">Career</a></li>
						<li><a href="forum.html" title="">Forum</a></li>
						<li><a href="#" title="">Language</a></li>
						<li><a href="#" title="">Copyright Policy</a></li>
					</ul>
					<p><img src="/assets/images/copy-icon.png" alt=""/>Copyright 2024</p>
				</div>
			</div>
		</div>

   </>
  )
}
