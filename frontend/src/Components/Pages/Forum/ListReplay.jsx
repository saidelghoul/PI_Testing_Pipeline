import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { UserContext } from "../../../../context/userContext";
import { Spinner } from "react-bootstrap";

export default function ListReplay() {
  const { id } = useParams();
  const { user } = useContext(UserContext); // Assuming UserContext provides user information
  const [sujet, setSujet] = useState(null);
  const [replays, setReplays] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newReplayContent, setNewReplayContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userId = user ? user.id : null;

  //const imageUrl = userId ? `http://localhost:8000/user/${userId}/profile` : "/assets/images/resources/user-pro-img.png";
  const imageUrl =
    userId && user && user.profileImage
      ? `${process.env.REACT_APP_BACKEND_URL}/user/${userId}/profile`
      : "/assets/images/resources/user-pro-img.png";

  useEffect(() => {
    async function fetchSujet() {
      try {
        const response = await axios.get(`/forum/getbyid/${id}`);
        const sujetData = response.data;
        setSujet(sujetData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données du sujet:",
          error
        );
      } finally {
        setIsLoading(false);
      }
    }

    async function fetchReplays() {
      try {
        const response = await axios.get(`/forum/getReplay/${id}`);
        setReplays(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des replays:", error);
      }
    }

    fetchSujet();
    fetchReplays();
  }, [id]);

  const handleSubmitReplay = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`/forum/addReplay/${id}`, {
        content: newReplayContent,
        Creator: user.id,
        sujet: id,
      });

      setReplays([...replays, response.data]);
      setNewReplayContent("");
    } catch (error) {
      console.error("Erreur lors de l'ajout du replay:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Spinner animation="border" variant="primary" />;
  }

  return (
    <>
      <br />
      <br />
      <br />
      <br />

      <section className="content-item" id="comments">
        <div className="container">
          <br />
          <br />
          <br />
          <br />

          <div className="row">
            <div className="col-sm-10">
              {sujet && (
                <>
                  <div style={{ textAlign: "center" }}>
                    <h1
                      className="media-heading"
                      style={{
                        textDecoration: "underline",
                        fontWeight: "bold",
                      }}
                    >
                      <i className="h3"> 📚 Subject 📚: {sujet.title}</i>
                    </h1>
                  </div>

                  <br />
                  <div className="media">
                    {sujet.Creator.profileImage ? (
                      <img
                        src={`${process.env.REACT_APP_BACKEND_URL}/user/${sujet.Creator._id}/profile`}
                        className="mr-3 rounded-circle"
                        width="50"
                        alt="User"
                      />
                    ) : (
                      <img
                        src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                        alt="Default"
                        className="mr-3 rounded-circle"
                        width="50"
                      />
                    )}
                    <div className="media-body">
                      <h4
                        className="media-heading"
                        style={{
                          textDecoration: "underline",
                          fontWeight: "bold",
                        }}
                      >
                        {sujet.Creator.name}
                      </h4>
                      <p style={{ fontWeight: "bold" }}>{sujet.content}</p>
                      <ul className="list-unstyled list-inline media-detail pull-left">
                        <br />
                        <li>
                          <i className="fa fa-calendar"></i>
                          {moment(sujet.createdAt).format("DD/MM/YYYY")}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <br />
                  <hr />
                  <div className="media">
                    <h3> ╰┈➤ {replays.length} Replies</h3>
                  </div>
                  <br />
                  <hr></hr>
                  {replays.map((replay, index) => (
                    <div
                      key={replay._id}
                      className="media card mb-3 bg-light card-body"
                    >
                      {replay.Creator.profileImage ? (
                        <img
                          src={`${process.env.REACT_APP_BACKEND_URL}/user/${replay.Creator._id}/profile`}
                          className="mr-3 rounded-circle"
                          width="50"
                          alt="User"
                        />
                      ) : (
                        <img
                          src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                          alt="Default"
                          className="mr-3 rounded-circle"
                          width="50"
                        />
                      )}
                      <div className="media-body">
                        <h4
                          className="media"
                          style={{
                            textDecoration: "underline",
                            fontWeight: "bold",
                          }}
                        >
                          {replay.Creator.name}
                        </h4>
                        <p style={{ fontWeight: "bold" }}>{replay.content}</p>
                        <ul className="list-unstyled list-inline media-detail pull-left">
                          <br />
                          <li>
                            <i className="fa fa-calendar"></i>
                            {moment(replay.createdAt).format("DD/MM/YYYY")}
                          </li>
                          <br></br>
                          <hr></hr>
                        </ul>
                      </div>
                      {index !== replays.length - 1 && <hr />}
                    </div>
                  ))}
                </>
              )}
              <form onSubmit={handleSubmitReplay}>
                <h3 className="pull-left">New Reply</h3>
                <br />
                <button
                  type="submit"
                  className="btn btn-normal pull-right btn btn-danger"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
                <fieldset>
                  <div className="row">
                    <div className="col-sm-3 col-lg-2 hidden-xs">
                      <img
                        className="img-responsive"
                        src={
                          imageUrl ||
                          "https://bootdey.com/img/Content/avatar/avatar1.png"
                        }
                        alt=""
                        width="60"
                      />
                    </div>
                    <div className="form-group col-xs-12 col-sm-9 col-lg-10">
                      <textarea
                        className="form-control"
                        id="message"
                        placeholder="Your message"
                        value={newReplayContent}
                        onChange={(e) => setNewReplayContent(e.target.value)}
                        required
                      ></textarea>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
