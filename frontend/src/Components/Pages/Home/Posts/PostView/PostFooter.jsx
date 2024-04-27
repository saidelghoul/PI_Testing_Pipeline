import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../../../../../../context/userContext";
import moment from "moment";
import { postTypes } from "../../utils/const";

export default function PostFooter({ postContent, fetchPosts }) {
  const { user } = useContext(UserContext);

  const [currentPublicationId, setCurrentPublicationId] = useState();

  const [commentData, setCommentData] = useState({
    contenu: "",
  });
  const handleChangeComent = (e) => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value });
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!currentPublicationId) {
      console.error("ID de la publications non défini.");
      return;
    }
    try {
      if (postContent?.postType === postTypes.TEXT) {
        const response = await axios.post(
          `/commentaire/addToPub/${currentPublicationId}`,
          {
            ...commentData,
            creator: user.id,
          }
        );
      } else if (postContent?.postType === postTypes.EVENT) {
        const response = await axios.post(
          `/commentaire/addToEvent/${currentPublicationId}`,
          {
            ...commentData,
            creator: user.id,
          }
        );
      }
      setCommentData({
        contenu: "",
      });
      alert("Commentaire ajouté avec succès");
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire :", error);
    }
  };

  const handleCommentClick = (id) => {
    setCurrentPublicationId(id);
  };

  return (
    <>
      <div className="job-status-bar">
        <ul className="like-com">
          <li>
            <a href="#">
              <i className="fas fa-heart"></i> Like
            </a>
            <img src="/assets/images/liked-img.png" alt="" />
            <span>25</span>
          </li>
          <li>
            <a href="#" className="com">
              <i className="fas fa-comment-alt"></i> Comment 15
            </a>
          </li>
        </ul>
      </div>

      {/* ajout d'un commentaire pour postContent  */}

      <div className="comment-section">
        <div className="comment-sec">
          <ul>
            {postContent.comments.length > 0 ? (
              postContent.comments.map((comment, index) => (
                <li key={index}>
                  <div className="comment-list">
                    <div className="bg-img">
                      <img src="/assets/images/resources/bg-img3.png" alt="" />
                    </div>
                    <div className="comment">
                      <h3>{comment.creator?.name}</h3>
                      <span>
                        <img src="/assets/images/clock.png" alt="" />{" "}
                        {moment(comment.DateCreation).format("lll")}
                      </span>
                      <p>{comment.contenu}</p>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li>
                <p>Aucun commentaire pour cette postContent.</p>
              </li>
            )}
          </ul>
        </div>

        <div className="post-comment">
          <div className="cm_img">
            <img src="/assets/images/resources/bg-img4.png" alt="" />
          </div>
          <div
            className="comment_box"
            onClick={() => handleCommentClick(postContent._id)}
          >
            <form onSubmit={handleSubmitComment}>
              <input
                type="text"
                name="contenu"
                placeholder="Post a comment"
                value={commentData.contenu}
                onChange={handleChangeComent}
                required
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
