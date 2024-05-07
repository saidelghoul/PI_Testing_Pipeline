import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../../../../context/userContext";
import ReactPaginate from "react-paginate";

export default function AllGroups() {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8; // Nombre d'éléments par page
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("/groups/getall")
      .then((response) => {
        setPages(response.data);
        setLoading(false);
        setTotalPages(Math.ceil(response.data.length / itemsPerPage)); // Mettre à jour le nombre total de pages
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des pages:", error);
      });
  }, []);

  const filteredUsers = pages.filter((page) => {
    const searchLower = searchQuery.toLowerCase();
    const nomgroups = page.nomgroups?.toLowerCase();

    return (
      nomgroups.includes(searchLower) ||
      (page.rang && page.rang.toString().toLowerCase().includes(searchLower))
    );
  });

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  const handleDelete = async (pageId) => {
    try {
      await axios.delete(`/groups/remove/${pageId}`);
      setPages(pages.filter((page) => page._id !== pageId));
      alert("La page a été supprimée avec succès.");
    } catch (error) {
      console.error("Erreur lors de la suppression de la page :", error);
      alert("Une erreur s'est produite lors de la suppression de la page.");
    }
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Filtrer les pages à afficher pour la page actuelle
  const displayPagesForPage = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return pages.slice(startIndex, endIndex);
  };

  return (
    <section className="companies-info">
      <div className="container">
        <div className="company-title d-flex justify-content-between align-items-center">
          <h3>Others Groups</h3>
          <div className="col">
            <div className="col-md-12 d-flex flex-row justifiez-content-end input-group">
              <span className="input-group-text">🔎</span>
              <input
                placeholder="Rechercher Par Nom du groupe"
                aria-label="Rechercher Par Nom du groupe"
                className="form-control"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          {/* <Link
            to="/addGroup"
            className="btn btn-danger"
            style={{ backgroundColor: "#dc3545" }}
          >
            Add Page
          </Link> */}
        </div>
        <br></br>
        <div className="companies-list">
          <div className="row">
            {loading ? (
              <p>Loading...</p>
            ) : (
              filteredUsers
                .filter((page) => page.creator !== user.id)
                .map((page) => (
                  <div key={page._id} className="col-lg-3 col-md-4 col-sm-6">
                    <div className="company_profile_info">
                      <div className="company-up-info">
                        <img
                          src={`${process.env.REACT_APP_BACKEND_URL}/images/${page.profileImage}`}
                          alt="Profile"
                        />
                        <h3>{page.nomgroups}</h3>

                        <h4>{formatDate(page.date)}</h4>
                        <ul>
                          {user.id === page.creator && (
                            <li>
                              <Link
                                to={`/modifier/${page._id}`}
                                title=""
                                className="follow"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-pencil-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                                </svg>
                              </Link>
                            </li>
                          )}
                          {user.id === page.creator && (
                            <li>
                              <Link
                                to={`/notifications/${page._id}`}
                                title=""
                                className="follow"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-bell-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
                                </svg>
                              </Link>
                            </li>
                          )}

                          {user.id === page.creator && (
                            <button
                              onClick={() => handleDelete(page._id)}
                              className="delete-us btn btn-danger"
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          )}
                        </ul>
                      </div>
                      <Link
                        to={`/groups/${page._id}`}
                        title=""
                        className="view-more-pro"
                      >
                        View Page
                      </Link>
                    </div>
                  </div>
                ))
            )}
          </div>
          {/* Afficher le composant de pagination */}
          <div style={{ display: "flex", alignContent: "center" }}>
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
    </section>
  );
}
