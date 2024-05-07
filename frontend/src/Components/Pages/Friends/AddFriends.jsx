import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../../context/userContext";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

export default function AddFriends() {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  const [totalPages, setTotalPages] = useState(0);
  const userId = user ? user.id : null;
  const imageUrl = user.profileImage
    ? `${process.env.REACT_APP_BACKEND_URL}/user/${userId}/profile`
    : "/assets/images/resources/user-pro-img.png";

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("/user/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
      })
      .catch((error) => {
        console.error("Error retrieving users:", error);
      });
  }, []);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Filtrer les utilisateurs à afficher pour la page actuelle
  const displayUsersForPage = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    //return users.slice(startIndex, endIndex);
    return filteredUsers.slice(startIndex, endIndex);
  };

  useEffect(() => {
    const filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setTotalPages(Math.ceil(filteredUsers.length / itemsPerPage));
  }, [searchTerm, users]);

  return (
    <section className="companies-info">
      <div className="container">
        <div className="company-title d-flex justify-content-between align-items-center">
          <h3>All Users</h3>

          <div className="search-bar">
            <form>
              <input
                type="text"
                name="search"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit">
                <i className="la la-search"></i>
              </button>
            </form>
          </div>
        </div>
        <br></br>
        <div className="companies-list">
          <div className="row">
            {loading ? (
              <p>Loading...</p>
            ) : (
              displayUsersForPage().map((user) => (
                <div key={user._id} className="col-lg-3 col-md-4 col-sm-6">
                  <div className="company_profile_info">
                    <div className="company-up-info">
                      {user.profileImage ? (
                        <img
                          src={`${process.env.REACT_APP_BACKEND_URL}/user/${user._id}/profile`}
                          alt="Image de profil"
                        />
                      ) : (
                        <img
                          src="/assets/images/resources/user-pro-img.png"
                          alt="Image de profil par défaut"
                        />
                      )}
                      <h4>{user.name}</h4>
                      <h5>{user.role}</h5>
                    </div>
                    <Link
                      to={`/profileuser/${user._id}`}
                      title=""
                      className="view-more-pro"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* Afficher le composant de pagination */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
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
