import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../../../../../context/userContext";
import { Link } from "react-router-dom";
import { isCreator } from "../../utils";

export default function PostHeader({ postContent, fetchPosts }) {
  const { user } = useContext(UserContext);

  const handleDeletePub = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ?")) {
      try {
        await axios.delete(`/publications/delete/${id}`);
        fetchPosts();
      } catch (error) {
        console.error("Erreur lors de la suppression ", error.message);
      }
    }
  };
  console.log("n",{postContent})

  return (
    <>
      <div className="post_topbar">
        <div className="usy-dt">
          <img src="/assets/images/resources/us-pc2.png" alt="" />
          <div className="usy-name">
            <h3>John ddd </h3>
            <span>
              <img src="/assets/images/clock.png" alt="" />
              publier le:{" "}
              {postContent.DatePublication
                ? new Date(postContent.DatePublication).toLocaleDateString(
                    "fr-FR"
                  )
                : "Date"}
            </span>
          </div>
        </div>
        <div className="ed-opts">
          {isCreator(user.id, postContent.creator) && (
            <a
              href="#"
              title=""
              className="ed-opts-open"
              onClick={() => handleDeletePub(postContent._id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash3"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
              </svg>{" "}
            </a>
          )}
          {isCreator(user.id, postContent.creator) && (
            <Link
              to={`/update/${postContent._id}`}
              title="Update"
              className="ed-opts-open"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fillRule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                />
              </svg>
            </Link>
          )}
        </div>
      </div>
      <div className="epi-sec">
        <ul className="descp"></ul>
      </div>
    </>
  );
}
