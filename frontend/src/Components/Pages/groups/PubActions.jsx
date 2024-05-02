import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../../../context/userContext';

export default function PubActions({ postId, updateCounts,groupId }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);
  const [comments, setComments] = useState([]);
  const { user } = useContext(UserContext);

  const handleLike = async () => {
    try {
      await axios.post(`/pubGroupe/publications/${postId}/${user.id}`);
      setIsLiked(true);
      setIsDisliked(false);
      fetchLikesAndDislikesCount();
    } catch (error) {
      console.error('Erreur lors du like de la publication :', error);
    }
  };

  const handleDislike = async () => {
    try {
      await axios.post(`/pubGroupe/publications/${postId}/${user.id}/dislike`);
      setIsDisliked(true);
      setIsLiked(false);
      fetchLikesAndDislikesCount();
    } catch (error) {
      console.error('Erreur lors du dislike de la publication :', error);
    }
  };

  const fetchLikesAndDislikesCount = async () => {
    try {
      const response = await axios.get(`/pubGroupe/publications/${postId}/reactions`);
      setLikesCount(response.data.likes);
      setDislikesCount(response.data.dislikes);
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre de likes et de dislikes :', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/commentGroupe/comments/${postId}`);
      setComments(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des commentaires :", error.message);
    }
  };

 
  
  

  useEffect(() => {
    fetchLikesAndDislikesCount();
    fetchComments();
  }, [postId]);

  return (
    <div className="job-status-bar">
      <ul className="like-com">
        <li>
          <a href="#" className={isLiked ? 'active' : ''} onClick={handleLike}>
            ❤️ Like {likesCount} 
          </a>
        </li>
        <li>
          <a href="#" className={isDisliked ? 'active' : ''} onClick={handleDislike}>
            💔 Dislike {dislikesCount}
          </a>
        </li>
        <li>
          <a href="#">
            {comments.length} 🗨 Comments
          </a>
        </li>
        <li>
          <a href="#">
share           </a>
        </li>
      </ul>
    </div>
  );
}
