import { useNavigate } from "react-router-dom";

export default function SucessPage() {
    const navigate = useNavigate();

    
  const handleBackToHome = () => {
    navigate('/');
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
             
   <br/>
  
   <div className="form-group">
     <label>Merci pour votre inscription  </label>
     <br/>   un mail de confirmation a été envoyé ! <br/>
  
     veuillez consulter votre mail pour confirmer votre inscription
   </div>
   <button onClick={handleBackToHome} className="btn btn-primary">
          Retour à l'accueil
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
}
