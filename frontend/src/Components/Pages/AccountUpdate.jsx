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


export default function AccountUpdate() {
  const { user } = useContext(UserContext);

  const [chefDep, setChefDeps] = useState([]);
  const [chefunite, setChefUnits] = useState([]);
  const [ens, setEns] = useState([]);
  const [ensDep, setEnsDep] = useState([]);

  const isAdmin = user && user.role === "Directeur d'étude"; 
  const isChefDep = user && user.role === "Chef département";
  const isChefUnite = user && user.role === "Chef unité";
  useEffect(() => {
    if (user) {
      if (isAdmin) {
        fetchChefsDep();
      }
      if (isChefDep) {
        fetchChefUnite();
        fetchDepEns();
      }
      if (isChefUnite) {
        fetchEns();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isAdmin, isChefDep, isChefUnite]);

  const fetchChefsDep = async () => {
    try {
      const response = await axios.get("/user/chef");
      setChefDeps(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchChefUnite = async () => {
    try {
      // Ajoutez le departementId de l'utilisateur connecté à la requête
      const response = await axios.get("/user/chefunite", {
        params: { departementName: user.departement }
      });
      setChefUnits(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  
  const fetchEns = async () => {
    try {
      // Ajoutez le unitéId de l'utilisateur connecté à la requête
      const response = await axios.get("/user/enseignants", {
        params: { uniteName: user.unite }
      });
      setEns(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchDepEns = async () => {
    try {
      // Ajoutez le unitéId de l'utilisateur connecté à la requête
      const response = await axios.get("/user/enseignantsbydep", {
        params: { departementName: user.departement }
      });
      setEnsDep(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const toggleUserActivation = async (userId, isActive) => {
    try {
      await axios.put(`/user/${isActive ? 'activate' : 'deactivate'}/${userId}`);
      // Actualiser les données après l'activation ou la désactivation de l'utilisateur
      fetchChefsDep();
    } catch (error) {
      console.error("Error toggling user activation:", error);
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
                {isAdmin && (
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
                      <i className="la la-cogs"></i>Liste des chef département 
                    </a>
                    
                  </div>)}

                  {isChefDep && (
               <div className="nav nav-tabs" id="nav-tab" role="tablist">
               <a
                 className="nav-item nav-link active"
                 id="nav-chef-tab"
                 data-toggle="tab"
                 href="#nav-chef"
                 role="tab"
                 aria-controls="nav-chef"
                 aria-selected="true"
               >
                 <i className="la la-cogs"></i>Liste des chefs unité 
               </a>
           
               <a
                 className="nav-item nav-link"
                 id="nav-ens-tab"
                 data-toggle="tab"
                 href="#nav-ens"
                 role="tab"
                 aria-controls="nav-ens"
                 aria-selected="false"
               >
                 <i className="la la-cogs"></i>Liste des enseignants 
               </a>
             </div>
                  
                  
                
              )}

                  {isChefUnite && (
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
                      <i className="la la-cogs"></i>Liste des enseignants
                    </a>
                    
                  </div>)}
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
                    
                    {isAdmin && (  <div className="lt-sec">
                          <img src="/assets/images/lt-icon.png" alt="" />
                          <h4>liste des chefs departement </h4>

                          <table className="table table-sm">
                            <thead>
                              <tr>
                                <th scope="col">nom et prenom</th>
                                <th scope="col">email</th>
                                <th scope="col">nom departement </th>
                                <th scope="col">activer/désactiver</th>
                              </tr>
                            </thead>
                            <tbody>
                              {chefDep.map((user) => (
                                <tr key={user._id}>
                                  <td>{user.name}</td>
                                  <td>{user.email}</td> 
                                  <td>{user.departement.name}</td> 
                                  <td>
                                  {user.isActive ? (
                                  <button onClick={() => toggleUserActivation(user._id, false)} className="btn btn-sm btn-danger">Désactiver</button>
                                ) : (
                                  <button onClick={() => toggleUserActivation(user._id, true)} className="btn btn-sm btn-success">Activer</button>
                                )}
</td>  
                                </tr>
                              ))}
                            </tbody>
                          </table>
                       </div> )}

                       {isChefDep && ( <>  <>
    <div className="tab-content">
      <div className="tab-pane fade show active" id="nav-chef" role="tabpanel" aria-labelledby="nav-chef-tab">
        <div className="lt-sec">
          <img src="/assets/images/lt-icon.png" alt="" />
          <h4>liste des chefs unité </h4>

          <table className="table table-sm">
            <thead>
              <tr>
                <th scope="col">nom et prenom</th>
                <th scope="col">email</th>
                <th scope="col">nom unité </th>
                <th scope="col">activer/désactiver</th>
              </tr>
            </thead>
            <tbody>
              {chefunite.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td> 
                  <td>{user.unite.name}</td>  
                  <td>
                  {user.isActive ? (
                                  <button onClick={() => toggleUserActivation(user._id, false)} className="btn btn-sm btn-danger">Désactiver</button>
                                ) : (
                                  <button onClick={() => toggleUserActivation(user._id, true)} className="btn btn-sm btn-success">Activer</button>
                                )}

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="tab-pane fade" id="nav-ens" role="tabpanel" aria-labelledby="nav-ens-tab">
        <div className="lt-sec">
          <img src="/assets/images/lt-icon.png" alt="" />
          <h4>liste des enseignants </h4>

          <table className="table table-sm">
            <thead>
              <tr>
                <th scope="col">nom et prenom</th>
                <th scope="col">email</th>
                <th scope="col">activer/désactiver</th>
              </tr>
            </thead>
            <tbody>
              {ensDep.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td> 
                  <td>
                  {user.isActive ? (
                                  <button onClick={() => toggleUserActivation(user._id, false)} className="btn btn-sm btn-danger">Désactiver</button>
                                ) : (
                                  <button onClick={() => toggleUserActivation(user._id, true)} className="btn btn-sm btn-success">Activer</button>
                                )}

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>
                      </> )}

                       {isChefUnite && (  <div className="lt-sec">
                          <img src="/assets/images/lt-icon.png" alt="" />
                          <h4>liste des enseignants </h4>

                          <table className="table table-sm">
                            <thead>
                              <tr>
                                <th scope="col">nom et prenom</th>
                                <th scope="col">email</th>
                                <th scope="col">activer/désactiver</th>
                              </tr>
                            </thead>
                            <tbody>
                              {ens.map((user) => (
                                <tr key={user._id}>
                                  <td>{user.name}</td>
                                  <td>{user.email}</td> 
                                  <td>
                                  {user.isActive ? (
                                  <button onClick={() => toggleUserActivation(user._id, false)} className="btn btn-sm btn-danger">Désactiver</button>
                                ) : (
                                  <button onClick={() => toggleUserActivation(user._id, true)} className="btn btn-sm btn-success">Activer</button>
                                )}

                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                       </div> )}
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
