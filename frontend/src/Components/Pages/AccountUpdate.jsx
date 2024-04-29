
import { useContext, useState,useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../../context/userContext.jsx";
import ReactPaginate from "react-paginate";
import Table from 'react-bootstrap/Table';


export default function AccountUpdate() {
  const { user } = useContext(UserContext);

  const [chefDep, setChefDeps] = useState([]);
  const [chefunite, setChefUnits] = useState([]);
  const [ens, setEns] = useState([]);
  const [ensDep, setEnsDep] = useState([]);

  const isAdmin = user && user.role === "Directeur d'étude"; 
  const isChefDep = user && user.role === "Chef département";
  const isChefUnite = user && user.role === "Chef unité";

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8; 
  const [totalPages, setTotalPages] = useState(0);

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
  }, [user, isAdmin, isChefDep, isChefUnite]);

  const fetchChefsDep = async () => {
    try {
      const response = await axios.get("/user/chef");
      setChefDeps(response.data);
      setTotalPages(Math.ceil(response.data.length / itemsPerPage));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const [searchTerm, setSearchTerm] = useState("");

 const displayUsersForPage = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const chefDep2 = chefDep.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),      
    );
    //return users.slice(startIndex, endIndex);
    return chefDep2.slice(startIndex, endIndex);
    
  };
  const displayUserForPage = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const chefunite1 = chefunite.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),      
    );
    //return users.slice(startIndex, endIndex);
    return chefunite1.slice(startIndex, endIndex);
    
  };
  const displayEnsForPage = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const ens1 = ens.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),      
    );
    //return users.slice(startIndex, endIndex);
    return ens1.slice(startIndex, endIndex);
    
  };

  const displayEnsDepForPage = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const ensDep1 = ensDep.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),      
    );
    //return users.slice(startIndex, endIndex);
    return ensDep1.slice(startIndex, endIndex);
    
  };
  const fetchChefUnite = async () => {
    try {
      // Ajoutez le departementId de l'utilisateur connecté à la requête
      const response = await axios.get("/user/chefunite", {
        params: { departementName: user.departement }
      });
      setChefUnits(response.data);
      setTotalPages(Math.ceil(response.data.length / itemsPerPage));
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
      setTotalPages(Math.ceil(response.data.length / itemsPerPage));
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
      setTotalPages(Math.ceil(response.data.length / itemsPerPage));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const toggleUserActivation = async (userId, isActive) => {
    try {
      await axios.put(`/user/${isActive ? 'activate' : 'deactivate'}/${userId}`);
      // fetchChefsDep();
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
    } catch (error) {
      console.error("Error toggling user activation:", error);
    }
  };
  const [departements, setDepartements] = useState([]);
  const [unites, setUnités] = useState([]);

  const displayUnitesForPage = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const filteredUnite = unites.filter(unite => 
      unite.name.toLowerCase().includes(searchTerm.toLowerCase()),      
    );
    //return users.slice(startIndex, endIndex);
    return filteredUnite.slice(startIndex, endIndex);
    
  };

  const displayDepForPage = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const filteredDeps = departements.filter(departement => 
      departement.name.toLowerCase().includes(searchTerm.toLowerCase()),      
    );
    //return users.slice(startIndex, endIndex);
    return filteredDeps.slice(startIndex, endIndex);
    
  };
  const [departement, setDepartement] = useState({
    name: "",
    description: "",
    nbrUnite: 0,
  });

  useEffect(() => {
    if (user) {
      fetchDepartements();
      fetchUnités();
    }
  }, [user]);

  
  const fetchDepartements = async () => {
    try {
      const response = await axios.get("/departement/getAlldep");
      setDepartements(response.data);
      setTotalPages(Math.ceil(response.data.length / itemsPerPage));
    } catch (error) {
      console.error("Error fetching departements:", error);
    }
  };

  const [isEditing, setIsEditing] = useState(false);

  const handleSubmitDep = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`/departement/update/${departement._id}`, departement);
        setIsEditing(false);
      } else {
        await axios.post("/departement/add", departement);
      }
      fetchDepartements();
      setDepartement({ name: "", description: "", nbrUnite: 0 });
    } catch (error) {
      console.error("Error adding/updating departement:", error);
    }
  };
  const handleEditDep = async (id) => {
    try {
      const response = await axios.get(`/departement/getbyid/${id}`);
      const { _id, name, description, nbrUnite } = response.data;
      setDepartement({ _id, name, description, nbrUnite });
      setIsEditing(true);
    } catch (error) {
      console.error("Error fetching departement for editing:", error);
    }
  };

  const [unite, setUnite] = useState({
    name: "",
  });

  const fetchUnités = async () => {
    try {
      const response = await axios.get("/unite/getAll", {
        params: { departementName: user.departement },
      });
      setUnités(response.data);
      setTotalPages(Math.ceil(response.data.length / itemsPerPage));
    } catch (error) {
      console.error("Error fetching unités:", error);
    }
  };

  const [isEditingUnit, setIsEditingUnit] = useState(false);

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    try {
      if (isEditingUnit) {
        await axios.put(`/unite/update/${unite._id}`, unite);
        setIsEditingUnit(false);
      } else {
        const departementName = user.departement;
        const uniteData = { ...unite, departementName };
        await axios.post("/unite/adding", uniteData);
      }
      fetchUnités();
      setUnite({ name: "" });
    } catch (error) {
      console.error("Error adding/updating unit:", error);
    }
  };

  const handleEditUnit = async (id) => {
    try {
      const response = await axios.get(`/unite/getbyid/${id}`);
      const { _id, name } = response.data;
      setUnite({ _id, name });
      setIsEditingUnit(true);
    } catch (error) {
      console.error("Error fetching unit for editing:", error);
    }
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setUnite({ ...unite, [name]: value });
  };

  const handleDeleteUnit = async (id) => {
    if (window.confirm("Are you sure you want to delete this unit?")) {
      try {
        await axios.delete(`/unite/remove/${id}`);
        fetchUnités();
      } catch (error) {
        console.error(
          "Error removing unit:",
          error.message
        );
      }
    }
  };

  const handleDeleteDep = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await axios.delete(`/unite/removedep/${id}`);
        fetchDepartements();
      } catch (error) {
        console.error(" Error while deleting", error.message);
      }
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
                  <div className="nav nav-tabs" id="nav-chef-tab" role="tablist">
                    
                    <a
                      className="nav-item nav-link active"
                      id="nav-acc-tab"
                      data-toggle="tab"
                      href="#nav-chef"
                      role="tab"
                      aria-controls="nav-chef"
                      aria-selected="true"
                    >👥List of chef department 
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
                 🏢 List of departments
               </a>
                    
                  </div>
                )}

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
                 👥 List of chef unit 
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
                 👥 List of teachers
               </a>

               <a
                 className="nav-item nav-link"
                 id="nav-unite-tab"
                 data-toggle="tab"
                 href="#nav-unite"
                 role="tab"
                 aria-controls="nav-unite"
                 aria-selected="false"
               >
                🗂️ Liste of units
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
                     👥 List of teachers
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
                    
                    {isAdmin && (
  <>
    <div className="tab-content">
      {/* Onglet des chefs de département */}
      <div className="tab-pane fade show active" id="nav-chef" role="tabpanel" aria-labelledby="nav-chef-tab">
        
        <div className="lt-sec">
          {/* <img src="/assets/images/about.png" alt="" /> */}
          <h1 className="h3 mb-3 col-md-12 ">List of chef department</h1>
          <div className="search-bar1">
            <form>
              <input type="text" name="search" placeholder="Search..."  value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} />
            
              <button type="submit">
                <i className="la la-search"></i>
              </button>
            </form>          
          </div>
          <div>
          <div className="empty-space" style={{ width: '20px', height: '20px' }}></div>

          
          <div className="add-billing-method">

          <Table striped bordered hover>            
          <thead>
              <tr>
                <th scope="col">Name </th>
                <th scope="col">Email</th>
                <th scope="col">Department name</th>
                <th scope="col">Enable/Disable</th>
              </tr>
            </thead>
            <tbody>
              {displayUsersForPage().map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td> 
                  <td>{user.departement.name}</td> 
                  <td>
                    {user.isActive ? (
                      <button onClick={() => toggleUserActivation(user._id, false)} className="btn btn-sm btn-danger">Disable</button>
                    ) : (
                      <button onClick={() => toggleUserActivation(user._id, true)} className="btn btn-sm btn-success">Enable</button>
                    )}
                  </td>
              
                </tr>
                
              ))}  
            </tbody>
            
                        </Table>
                        <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={5} // Nombre de pages à afficher dans la pagination
              marginPagesDisplayed={2} // Nombre de pages à afficher avant et après les ellipses
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
        </div>
        </div>
      </div>
      </div>
      {/* Onglet des départements */}
      <div className="tab-pane fade" id="nav-dep" role="tabpanel" aria-labelledby="nav-dep-tab">
        <div className="lt-sec">
          {/* <img src="/assets/images/lt-icon.png" alt="" /> */}
          <h1 className="h3 mb-3 col-md-12 ">List of departments</h1>
          <div className="search-bar1">
            <form>
              <input type="text" name="search" placeholder="Search..."  value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} />
              <button type="submit">
                <i className="la la-search"></i>
              </button>
            </form>
            <br/>
          </div>
          <div className="add-billing-method">
          <Table striped bordered hover>            
            <thead>
              <tr>
                <th scope="col">Department name</th>
                <th scope="col">Description</th>
                <th scope="col">Number of units</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayDepForPage().map((departement) => (
                <tr key={departement._id}>
                  <td>{departement.name}</td>
                  <td>{departement.description}</td>
                  <td>{departement.nbrUnite}</td>
                  <td>
                    <i
                      className="fa fa-edit"
                      style={{
                        color: "orange",
                        cursor: "pointer",
                        marginRight: "10px",
                      }}
                      onClick={() => handleEditDep(departement._id)}
                    ></i>
                    <i
                      className="fa fa-trash"
                      style={{
                        color: "red",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDeleteDep(departement._id)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={5} // Nombre de pages à afficher dans la pagination
              marginPagesDisplayed={2} // Nombre de pages à afficher avant et après les ellipses
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
            </div>
        </div>
        {/* Formulaire d'ajout/modification de département */}
        <div className="add-billing-method">
          <h3>{isEditing ? "Update Department" : "Add Department"}</h3>
          <div className="payment_methods">
            <form onSubmit={handleSubmitDep}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="cc-head">
                    <h5>Department name</h5>
                  </div>
                  <div className="inpt-field pd-moree">
                    <input
                      type="text"
                      name="name"
                      placeholder="Department name ..."
                      value={departement.name}
                      onChange={(e) => setDepartement({ ...departement, name: e.target.value })}
                    />
                    <i className="fa fa-university"></i>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="cc-head">
                    <h5>Description</h5>
                  </div>
                  <div className="inpt-field pd-moree">
                    <input
                      type="text"
                      name="description"
                      placeholder="Description ..."
                      value={departement.description}
                      onChange={(e) => setDepartement({ ...departement, description: e.target.value })}
                    />
                    <i className="fa fa-university"></i>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="cc-head">
                    <h5>Number of units</h5>
                  </div>
                  <div className="inpt-field">
                    <input
                      type="number"
                      name="nbrUnite"
                      placeholder="Number of units"
                      value={departement.nbrUnite}
                      onChange={(e) => setDepartement({ ...departement, nbrUnite: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <button type="submit">
                    {isEditing ? "Submit" : "Add"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
)}


                    {isChefDep && (
  <>
    <div className="tab-content">
      {/* Onglet des chefs d'unité */}
      <div className="tab-pane fade show active" id="nav-chef" role="tabpanel" aria-labelledby="nav-chef-tab">
        <div className="lt-sec">
          {/* <img src="/assets/images/lt-icon.png" alt="" /> */}
          <h1 className="h3 mb-3 col-md-12 ">List of chef unit</h1>
<div className="search-bar1">
            <form>
              <input type="text" name="search" placeholder="Search..."  value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} />
              <button type="submit">
                <i className="la la-search"></i>
              </button>
            </form>
          </div>
          <div className="add-billing-method">

          <Table striped bordered hover>            
            <thead>
              <tr>
                <th scope="col">Full Name</th>
                <th scope="col">Email</th>
                <th scope="col">Unit Name</th>
                <th scope="col">Enable/Disable</th>
              </tr>
            </thead>
            <tbody>
              { displayUserForPage().map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td> 
                  <td>{user.unite.name}</td>  
                  <td>
                    {user.isActive ? (
                      <button onClick={() => toggleUserActivation(user._id, false)} className="btn btn-sm btn-danger">Disable</button>
                    ) : (
                      <button onClick={() => toggleUserActivation(user._id, true)} className="btn btn-sm btn-success">Enable</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={5} // Nombre de pages à afficher dans la pagination
              marginPagesDisplayed={2} // Nombre de pages à afficher avant et après les ellipses
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
        </div>
        </div>
      </div>

      {/* Onglet des enseignants */}
      <div className="tab-pane fade" id="nav-ens" role="tabpanel" aria-labelledby="nav-ens-tab">
        <div className="lt-sec">
          {/* <img src="/assets/images/lt-icon.png" alt="" /> */}
          <h1 className="h3 mb-3 col-md-12 ">List of teachers</h1>
          <div className="search-bar1">
            <form>
              <input type="text" name="search" placeholder="Search..."  value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} />
              <button type="submit">
                <i className="la la-search"></i>
              </button>
            </form>
          </div>
          <div className="add-billing-method">

          <Table striped bordered hover>            
            <thead>
              <tr>
                <th scope="col">Full Name</th>
                <th scope="col">Email</th>
                <th scope="col">Enable/Disable</th>
              </tr>
            </thead>
            <tbody>
              {displayEnsDepForPage().map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td> 
                  <td>
                    {user.isActive ? (
                      <button onClick={() => toggleUserActivation(user._id, false)} className="btn btn-sm btn-danger">Disable</button>
                    ) : (
                      <button onClick={() => toggleUserActivation(user._id, true)} className="btn btn-sm btn-success">Enable</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={5} // Nombre de pages à afficher dans la pagination
              marginPagesDisplayed={2} // Nombre de pages à afficher avant et après les ellipses
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
        </div>
      
      </div>
      </div>

      {/* Onglet des unités */}
      <div className="tab-pane fade" id="nav-unite" role="tabpanel" aria-labelledby="nav-unite-tab">
        <div className="lt-sec">
          {/* <img src="/assets/images/lt-icon.png" alt="" /> */}
          <h1 className="h3 mb-3 col-md-12 ">List of units</h1>
          <div className="search-bar1">
            <form>
              <input type="text" name="search" placeholder="Search..."  value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} />
              <button type="submit">
                <i className="la la-search"></i>
              </button>
            </form>
          </div>
          <div className="add-billing-method">

          <Table striped bordered hover>            
            <thead>
              <tr>
                <th scope="col">Unit Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayUnitesForPage().map((unite) => (
                <tr key={unite._id}>
                  <td>{unite.name}</td>
                  <td>
                    <i
                      className="fa fa-edit"
                      style={{
                        color: "orange",
                        cursor: "pointer",
                        marginRight: "10px",
                      }}
                      onClick={() => handleEditUnit(unite._id)}
                    ></i>
                    <i
                      className="fa fa-trash"
                      style={{
                        color: "red",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDeleteUnit(unite._id)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={5} // Nombre de pages à afficher dans la pagination
              marginPagesDisplayed={2} // Nombre de pages à afficher avant et après les ellipses
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
        </div></div>
        {/* Formulaire d'ajout/modification d'unité */}
        <div className="add-billing-method">
          <h3>{isEditingUnit ? "Update unit" : "Add unit"}</h3>
          <div className="payment_methods">
            <form onSubmit={handleSubmit2}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="cc-head">
                    <h5>Unit Name</h5>
                  </div>
                  <div className="inpt-field pd-moree">
                    <input
                      type="text"
                      name="name"
                      placeholder="Unit Name ..."
                      value={unite.name}
                      onChange={handleChange2}
                    />
                    <i className="fa fa-university"></i>
                  </div>
                </div>
                <div className="col-lg-12">
                  <button type="submit">
                    {isEditingUnit ? "Update " : "Add"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
)}

                       {isChefUnite && (  <div className="lt-sec">
                          {/* <img src="/assets/images/lt-icon.png" alt="" /> */}
                          <h1 className="h3 mb-3 col-md-12 ">list of teachers</h1>
                          <div className="search-bar1">
            <form>
              <input type="text" name="search" placeholder="Search..."  value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} />
              <button type="submit">
                <i className="la la-search"></i>
              </button>
            </form>
          </div>
          <div className="add-billing-method">

          <Table striped bordered hover>            
                            <thead>
                              <tr>
                                <th scope="col">Full Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Enable/Disable</th>
                              </tr>
                            </thead>
                            <tbody>
                              {displayEnsForPage().map((user) => (
                                <tr key={user._id}>
                                  <td>{user.name}</td>
                                  <td>{user.email}</td> 
                                  <td>
                                  {user.isActive ? (
                                  <button onClick={() => toggleUserActivation(user._id, false)} className="btn btn-sm btn-danger">Disable</button>
                                ) : (
                                  <button onClick={() => toggleUserActivation(user._id, true)} className="btn btn-sm btn-success">Enable</button>
                                )}

                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                          <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={5} // Nombre de pages à afficher dans la pagination
              marginPagesDisplayed={2} // Nombre de pages à afficher avant et après les ellipses
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
                       </div>
                       </div>  

                      )}
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
