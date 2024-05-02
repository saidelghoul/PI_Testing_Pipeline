import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../../../../../../context/userContext";
import { liked, postTypes, disliked } from "../../utils/const";
import { getLikePostEndpoint, getDeslikePostEndpoint } from "../../utils/utils";
import Commentaire from "./Commentaire";

export default function PostFooter({ postContent }) {
  const likePostEndpoint = getLikePostEndpoint(postContent.postType);
  const deslikePostEndpoint = getDeslikePostEndpoint(postContent.postType);

  const { user } = useContext(UserContext);
  const [currentPublicationId, setCurrentPublicationId] = useState();

  const userLikeThisPost = postContent.likes
    ? postContent.likes.indexOf(user?.id)
    : -1;

  const userDeslikeThisPost = postContent.deslikes
    ? postContent.deslikes.indexOf(user?.id)
    : -1;

  const [commentData, setCommentData] = useState({
    contenu: "",
  });

  const handleLikeClick = async () => {
    try {
      const LikeData = {
        userId: user.id,
      };

      // Send data to the server to add the like to the post
      await axios.post(`${likePostEndpoint}/${postContent._id}`, LikeData);
      alert("Like added");
    } catch (error) {
      // An error occurred while setting up the request
      console.error("Error setting up the request:", error.message);
      alert("Error setting up the request: " + error.message);
    }
  };

  const handleDeslikeClick = async () => {
    try {
      const DesLikeData = {
        userId: user.id,
      };

      // Send data to the server to add the like to the post
      await axios.post(
        `${deslikePostEndpoint}/${postContent._id}`,
        DesLikeData
      );
      alert("Like added");
    } catch (error) {
      // An error occurred while setting up the request
      console.error("Error setting up the request:", error.message);
      alert("Error setting up the request: " + error.message);
    }
  };

  const handleChangeComent = (e) => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value });
  };

  const handleSubmitComment = async (e, b, c) => {
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
            <a onClick={() => handleLikeClick(postContent._id)}>
              <i className={userLikeThisPost ? liked.YES : liked.NO}></i> Like
            </a>
            <img src="/assets/images/liked-img.png" alt="" />
            <span>{postContent.likes?.length || 0}</span>
          </li>
          <li>
            <a href="#" className="com">
              <i className="fas fa-comment-alt"></i>{" "}
              {postContent.comments.length}
            </a>
          </li>
          <li>
            <img src="" alt="" />
            <span>{postContent.deslikes?.length || 0}</span>
            <a onClick={() => handleDeslikeClick(postContent._id)}>
              <i
                className={userDeslikeThisPost ? disliked.YES : disliked.NO}
              ></i>{" "}
              Like
            </a>
          </li>
        </ul>
      </div>

      <div className="comment-section">
        {/* List of comments */}
        <div className="comment-sec">
          <ul>
            {postContent.comments.length > 0 ? (
              postContent.comments.map((comment) => (
                <Commentaire key={comment._id} comment={comment} />
              ))
            ) : (
              <li>
                <p>Be the first one to comment on This post</p>
              </li>
            )}
          </ul>
        </div>

        {/* Add comment */}
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
              <button type="submit">Post</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
