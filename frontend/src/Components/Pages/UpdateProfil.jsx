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
import { useContext, useState,useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../../context/userContext.jsx";

export default function UpdateProfil() {
    const { user } = useContext(UserContext);
    console.log("Profil actuel",user.profileImage);

    
  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);
    const [updatedUser, setUpdatedUser] = useState({
        addresse: "",
        gouvernorat: "",
        telephone: "",
        dateNaissance: "",
        gender: "",
      });
    
    
      const fetchUserData = async () => {
        try {
          const userResponse = await axios.get(`/user/getbyid/${user.id}`);
          if (userResponse.data) {
            // Si l'utilisateur existe, mettez à jour l'état userData avec les données de l'utilisateur
            setUpdatedUser(userResponse.data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      const [errors, setErrors] = useState({}); // State to hold form validation errors
    
      const handleSubmit1 = async (e) => {
        e.preventDefault();
        // Obtain the current date
        const currentDate = new Date();
    
        // Calculate the date 25 years ago
        const minDate = new Date(
          currentDate.getFullYear() - 25,
          currentDate.getMonth(),
          currentDate.getDate()
        );
    
        const validationErrors = {};
    
        // Check if the date of birth is provided
        if (!updatedUser.dateNaissance) {
          validationErrors.dateNaissance =
            "Veuillez fournir votre date de naissance.";
        } else {
          // Check if the entered date is valid
          const userDateOfBirth = new Date(updatedUser.dateNaissance);
          if (isNaN(userDateOfBirth.getTime())) {
            validationErrors.dateNaissance =
              "Veuillez entrer une date de naissance valide.";
          } else {
            // Check if the user is at least 25 years old
            if (userDateOfBirth > minDate) {
              validationErrors.dateNaissance = "Vous devez avoir au moins 25 ans.";
            }
          }
        }
        // Vérifiez si le numéro de téléphone est numérique
        if (isNaN(updatedUser.telephone)) {
          validationErrors.telephone =
            "Le numéro de téléphone doit être numérique.";
        }
    
        // Update state with errors, if any
        setErrors(validationErrors);
    
        // If there are validation errors, do not proceed with form submission
        if (Object.keys(validationErrors).length > 0) {
          return;
        }
        try {
          const response = await axios.put(`/user/${user.id}`, updatedUser);
    
          console.log("Profil utilisateur mis à jour avec succès:", response.data);
          setUpdatedUser({
            addresse: "",
            gouvernorat: "",
            telephone: "",
            dateNaissance: "",
            gender: "",
          });
          window.location.href = "/profil";
        } catch (error) {
          console.error("Erreur lors de la mise à jour du profil:", error.message);
        }
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser((prevUser) => ({
          ...prevUser,
          [name]: value,
        }));
      };
      const [selectedFile, setSelectedFile] = useState(null);
      const [selectedCoverFile, setSelectedCoverFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);

  };
  const handleCoverFileChange = (e) => {
    setSelectedCoverFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile|| !selectedCoverFile) {
        alert('Veuillez sélectionner à la fois une image de profil et une image de couverture.');
        return;
      }
      
      const formData = new FormData();
      formData.append('profileImage', selectedFile);
      formData.append('coverImage', selectedCoverFile);

      const response = await axios.put(`/user/${user.id}/profileimage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Images téléchargée avec succès:', response.data);
      alert('Images téléchargée avec succès');

      // Réinitialisez l'état du fichier sélectionné
      setSelectedFile(null);
      setSelectedCoverFile(null);
      window.location.href = "/profil";

    } catch (error) {
      console.error('Erreur lors du téléchargement de l\'image:', error.response ? error.response.data : error.message);
      alert(error.response ? error.response.data.message : 'Erreur lors du téléchargement de l\'image');
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
                    <a
                      className="nav-item nav-link active"
                      id="nav-acc-tab"
                      data-toggle="tab"
                      href="#nav-acc"
                      role="tab"
                      aria-controls="nav-acc"
                      aria-selected="true"
                    >
                      <i className="la la-cogs"></i>Mettre a jour mon profil 
                    </a>
                    <a
                 className="nav-item nav-link"
                 id="nav-dep-tab"
                 data-toggle="tab"
                 href="#nav-dep"
                 role="tab"
                 aria-controls="nav-dep"
                 aria-selected="false"
               >
                 <i className="la la-cogs"></i>Ajouter photos
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
<div className="post-project-fields">
                            <form onSubmit={handleSubmit1}>
                              <div className="row">
                                <div className="col-lg-12">
                                  <label htmlFor="addresse">Ville :</label>
                                  <input
                                    type="text"
                                    id="addresse"
                                    name="addresse"
                                    placeholder="ville"
                                    value={updatedUser.addresse}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="col-lg-12">
                                  <div className="inp-field">
                                    <label htmlFor="gouvernorat">
                                      Gouvernorat :
                                    </label>
                                    <select
                                      id="gouvernorat"
                                      name="gouvernorat"
                                      value={updatedUser.gouvernorat}
                                      onChange={handleChange}
                                    >
                                      <option>
                                        Sélectionnez un gouvernorat
                                      </option>
                                      <option value="Ariana">Ariana</option>
                                      <option value="Béja">Béja</option>
                                      <option value="Ben Arous">
                                        Ben Arous
                                      </option>
                                      <option value="Bizerte">Bizerte</option>
                                      <option value="Gabès">Gabès</option>
                                      <option value="Gafsa">Gafsa</option>
                                      <option value="Jendouba">Jendouba</option>
                                      <option value="Kairouan">Kairouan</option>
                                      <option value="Kasserine">
                                        Kasserine
                                      </option>
                                      <option value="Kébili">Kébili</option>
                                      <option value="Kef">Le Kef</option>
                                      <option value="Mahdia">Mahdia</option>
                                      <option value="Manouba">Manouba</option>
                                      <option value="Médenine">Médenine</option>
                                      <option value="Monastir">Monastir</option>
                                      <option value="Nabeul">Nabeul</option>
                                      <option value="Sfax">Sfax</option>
                                      <option value="Sidi Bouzid">
                                        Sidi Bouzid
                                      </option>
                                      <option value="Siliana">Siliana</option>
                                      <option value="Sousse">Sousse</option>
                                      <option value="Tataouine">
                                        Tataouine
                                      </option>
                                      <option value="Tozeur">Tozeur</option>
                                      <option value="Tunis">Tunis</option>
                                      <option value="Zaghouan">Zaghouan</option>
                                    </select>
                                  </div>
                                </div>

                                <div className="col-lg-12">
                                  <label htmlFor="telephone">Téléphone :</label>
                                  <input
                                    type="text"
                                    id="telephone"
                                    name="telephone"
                                    placeholder="telephone"
                                    value={updatedUser.telephone}
                                    onChange={handleChange}
                                  />
                                  {errors.telephone && (
                                    <span className="error-message">
                                      {errors.telephone}
                                    </span>
                                  )}
                                </div>
                                <div className="col-lg-12">
                                  <div className="price-sec">
                                    <label htmlFor="dateNaissance">
                                      Date de Naissance :
                                    </label>

                                    <input
                                      type="date"
                                      id="dateNaissance"
                                      name="dateNaissance"
                                      placeholder="Price"
                                      value={updatedUser.dateNaissance}
                                      onChange={handleChange}
                                    />
                                    {errors.dateNaissance && (
                                      <span className="error-message">
                                        {errors.dateNaissance}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <label htmlFor="gender">Genre :</label>
                                  <select
                                    id="gender"
                                    name="gender"
                                    value={updatedUser.gender}
                                    onChange={handleChange}
                                  >
                                    <option value="homme">Homme</option>
                                    <option value="femme">Femme</option>
                                  </select>
                                </div>
                                <div className="col-lg-12">
                                  <ul>
                                    <li>
                                      <button
                                        className="active"
                                        type="submit"
                                        value="post"
                                      >
                                        Submit
                                      </button>
                                    </li>
                                    {/* <li><a href="#" type="close" title="">Cancel</a></li> */}
                                  </ul>
                                </div>
                              </div>
                            </form>
                          </div>
                       
          
                  
         </div>
         <div className="tab-pane fade" id="nav-dep" role="tabpanel" aria-labelledby="nav-dep-tab">
         <div className="post-project-fields">
        <div className="lt-sec">
        <div>
          
      <label htmlFor="profileImage">Image de profil :</label>
      <input type="file" id="profileImage" onChange={handleFileChange} />
    </div>
    <div>
      <label htmlFor="coverImage">Image de couverture :</label>
      <input type="file" id="coverImage" onChange={handleCoverFileChange} />
    </div>
    <button onClick={handleUpload}>Télécharger</button>
  
        </div>
       </div>
      </div>
      </div>
      </div>
     
      </div></div></div>
</section>
    </>
  );
}
