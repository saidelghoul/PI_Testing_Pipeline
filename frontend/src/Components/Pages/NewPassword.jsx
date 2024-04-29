import  { useState } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom'; // Importez useParams

const NewPassword = () => { // Supprimez { match } de la déstructuration des props
    const { token } = useParams(); // Utilisez useParams pour obtenir le token
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = async () => {

      try {
        const response = await axios.post('/resetPassword', {
          token,
          newPassword,
        });
        
        setMessage(response.data.message);
        setError('');
        navigate('/');

      } catch (err) {
        if (err.response && err.response.data) {
          setError(err.response.data.error);
        } else {
          setError('Server error');
        }
        setMessage('');
      }
    };
  
    return (
      
      <>
       <div className="sign-in-page " style={{ backgroundColor: "#dc3545" }}>
        <div className="signin-popup">
          <div className="signin-pop">
            <div className="row">
              <div className="col-lg-6">
                <div className="cmp-info">
                  <div className="cm-logo">
                    <img src="/assets/images/esprit.png" alt="" />
                  </div>
                  <img src="/assets/images/cm-main-img.png" alt="" />
                </div>
              </div>
              <div className="col-lg-6">
              <div className="login-sec">
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
        <h2>Enter your new password</h2>
        
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
        
        <div className="form-group">
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="form-control"
          />
        </div>
        
        <button onClick={handleResetPassword} className="btn btn-primary">
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
              Copyright 2019
            </p>
          </div>
        </div>
      </div>
    </>
    );
};

export default NewPassword;
