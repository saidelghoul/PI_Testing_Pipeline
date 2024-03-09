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
import { useContext, useState } from "react";
import { UserContext } from "../../../context/userContext";
import axios from "axios";


export default function AccountUpdate() {
  const { user } = useContext(UserContext);

  const [updatedUser, setUpdatedUser] = useState({
    addresse: "",
    gouvernorat: "",
    telephone: "",
    dateNaissance: "",
    gender: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Appelez l'API pour mettre à jour le profil utilisateur
      const response = await axios.put(`/user/${user.id}`, updatedUser);
      console.log('Profil utilisateur mis à jour avec succès:', response.data);
      // Réinitialisez le formulaire
      setUpdatedUser({
        addresse: "",
        gouvernorat: "",
        telephone: "",
        dateNaissance: "",
        gender: "",
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
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
                      <i className="la la-cogs"></i>Completer profil
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
                      <h3>Completer profil</h3>
                      <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="addresse">Adresse :</label>
        <input
          type="text"
          id="addresse"
          name="addresse"
          value={updatedUser.addresse}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="gouvernorat">Gouvernorat :</label>
        <input
          type="text"
          id="gouvernorat"
          name="gouvernorat"
          value={updatedUser.gouvernorat}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="telephone">Téléphone :</label>
        <input
          type="text"
          id="telephone"
          name="telephone"
          value={updatedUser.telephone}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="dateNaissance">Date de Naissance :</label>
        <input
          type="date"
          id="dateNaissance"
          name="dateNaissance"
          value={updatedUser.dateNaissance}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="gender">Genre :</label>
        <select
          id="gender"
          name="gender"
          value={updatedUser.gender}
          onChange={handleChange}
        >
          <option value="male">Homme</option>
          <option value="female">Femme</option>
          <option value="other">Autre</option>
        </select>
      </div>
      <button type="submit">Mettre à jour</button>
    </form>
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
