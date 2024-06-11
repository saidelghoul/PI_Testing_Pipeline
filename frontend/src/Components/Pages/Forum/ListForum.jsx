import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import ReactPaginate from "react-paginate";
import { UserContext } from "../../../../context/userContext";
import { Spinner } from "react-bootstrap";
import { Link } from 'react-router-dom'; // Importer Link de react-router-dom

export default function ListForum() {
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true); // Ajoutez un état de chargement

    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4;
    const [totalPages, setTotalPages] = useState(0);
    const [sujets, setSujets] = useState([]);

    useEffect(() => {
        axios.get('/forum/getall')
          .then(response => {
            setSujets(response.data);
            setTotalPages(Math.ceil(response.data.length / itemsPerPage));
            setIsLoading(false); // Arrêter le chargement
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des sujets:', error);
            setIsLoading(false); // Arrêter le chargement même en cas d'erreur
          });
    }, []);

    const filteredSujets = sujets.filter(sujet => {
        const searchLower = searchQuery.toLowerCase();
        const activity = sujet.activity ? sujet.activity.name.toLowerCase() : '';
        return activity.includes(searchLower);
    });

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const indexOfLastSujet = (currentPage + 1) * itemsPerPage;
    const indexOfFirstSujet = indexOfLastSujet - itemsPerPage;
    const currentSujets = filteredSujets.slice(indexOfFirstSujet, indexOfLastSujet);

    const handleDelete = async (sujetId) => {
        try {
            await axios.delete(`/forum/delete/${sujetId}`);
            setSujets(sujets.filter((sujet) => sujet._id !== sujetId));
            alert("Le sujet a été supprimé avec succès.");
        } catch (error) {
            console.error("Erreur lors de la suppression du sujet :", error);
            alert("Une erreur s'est produite lors de la suppression du sujet.");
        }
    };

    return (
        <section className="messages-page">
            <div className="container">
                <div className="content-wrapper1">
                    <div className="main-body p-0">
                        <div className="inner-wrapper2">
                            <div className="inner-sidebar2">
                                <div className="inner-sidebar-header2 justify-content-center">
                                    <a href="/addSujet">
                                        <button
                                            className="btn has-icon btn-block"
                                            type="button"
                                            style={{ backgroundColor: "#e44d3a" }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus mr-2">
                                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                            </svg>
                                            ASK QUESTION
                                        </button>
                                    </a>
                                </div>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="inner-sidebar-body2 p-0">
                                                <div className="p-3 h-100" data-simplebar="init">
                                                    <div className="simplebar-wrapper" style={{ margin: '-16px' }}>
                                                        <div className="simplebar-height-auto-observer-wrapper">
                                                            <div className="simplebar-height-auto-observer"></div>
                                                        </div>
                                                        <div className="simplebar-mask">
                                                            <div className="simplebar-offset" style={{ right: '0px', bottom: '0px' }}>
                                                                <div className="simplebar-content-wrapper" style={{ height: '100%', overflow: 'hidden scroll' }}>
                                                                    <div className="simplebar-content" style={{ padding: '16px' }}>
                                                                        <nav className="nav nav-pills nav-gap-y-1 flex-column">
                                                                            <a href="#" className="nav-link nav-link-faded has-icon active">All Threads</a>
                                                                            <a href="#" className="nav-link nav-link-faded has-icon">Popular this week</a>
                                                                            <a href="#" className="nav-link nav-link-faded has-icon">Popular all time</a>
                                                                        </nav>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="simplebar-placeholder" style={{ width: '234px' }}></div>
                                                    </div>
                                                    <div className="simplebar-track simplebar-horizontal" style={{ visibility: 'hidden' }}>
                                                        <div className="simplebar-scrollbar" style={{ width: '0px', display: 'none' }}></div>
                                                    </div>
                                                    <div className="simplebar-track simplebar-vertical" style={{ visibility: 'visible' }}>
                                                        <div className="simplebar-scrollbar" style={{ height: '151px', display: 'block', transform: 'translate3d(0px, 0px, 0px)' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="inner-main2">
                                                <div className="inner-main-header2">
                                                    <span className="input-group-text" style={{ marginTop: "15px", marginLeft: "-21px" }}>
                                                        🔎
                                                    </span>
                                                    <input
                                                        placeholder="Rechercher Par Nom de l'activite"
                                                        aria-label="Rechercher Par Nom du groupe"
                                                        className="form-control"
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                        style={{ marginTop: '-34px', marginLeft: "21px" }}
                                                    />
                                                </div>
                                                <div className="inner-main-body2 p-2 p-sm-3 collapse forum-content show">
                                                    {isLoading ? (
                                                        <div className="d-flex justify-content-center align-items-center">
                                                            <Spinner animation="border" />
                                                        </div>
                                                    ) : (
                                                        <>
                                                            {currentSujets.map(sujet => (
                                                                <div key={sujet._id} className="card2 mb-2">
                                                                    <div className="card-body2 p-2 p-sm-3">
                                                                        <div className="media forum-item">
                                                                            <a href="#" data-toggle="collapse" data-target=".forum-content">
                                                                                {sujet.Creator.profileImage ? (
                                                                                    <img src={`http://localhost:8000/user/${sujet.Creator._id}/profile`} className="mr-3 rounded-circle" width="50" alt="User" />
                                                                                ) : (
                                                                                    <img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="Default" />
                                                                                )}
                                                                            </a>
                                                                            <div className="media-body">
                                                                                <h1>
                                                                                <Link to={`/ListeReplay/${sujet._id}`} className="text-body"><b>{sujet.Creator.name}</b></Link>
                                                                                </h1><br />
                                                                                <h6>
                                                                                      <Link to={`/ListeReplay/${sujet._id}`} className="text-body">{sujet.title}</Link>
                                                                                 </h6>
                                                                                <p className="text-muted">
                                                                                <Link to={`/ListeReplay/${sujet._id}`}>{sujet.activity.name}</Link> CreatedAt <span className="text-secondary font-weight-bold">{moment(sujet.createdAt).fromNow()}</span>
                                                                                </p>
                                                                            </div>
                                                                            <div className="text-muted small text-center align-self-center">
                                                                                {user && user.id === sujet.Creator._id && (
                                                                                    <button
                                                                                        onClick={() => handleDelete(sujet._id)}
                                                                                        className="delete-us btn btn"
                                                                                    >
                                                                                        ❌
                                                                                    </button>
                                                                                )}
                                                                                {'  '}
                                                                                {user && user.id === sujet.Creator._id && (
                                                                                  <Link to={`/updateSujet/${sujet._id}`}>
                                                                                  <button className="btn btn-">
                                                                                      ✏️
                                                                                  </button>
                                                                              </Link>
                                                                                )}
                                                                                {'  '}
                                                                                <span><i className="far fa-comment ml-2"></i> 3</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            <div style={{ display: "flex", alignContent: "center" }}>
                                                                <ReactPaginate
                                                                    pageCount={totalPages}
                                                                    pageRangeDisplayed={5}
                                                                    marginPagesDisplayed={2}
                                                                    onPageChange={handlePageChange}
                                                                    containerClassName={"pagination"}
                                                                    activeClassName={"active"}
                                                                />
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
