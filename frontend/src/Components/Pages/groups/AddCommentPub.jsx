import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../../../../context/userContext';

export default function AddCommentPub({ postId }) {
    const { user } = useContext(UserContext);
    const [formData, setFormData] = useState({ contenu: "" });
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`/commentGroupe/comments/${postId}`);
            setComments(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des commentaires :", error.message);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const publicationData = {
                ...formData,
                creator: user.id,
            };

            await axios.post(`/commentGroupe/addComment/${postId}`, publicationData);

            setFormData({ contenu: "" });
            alert("Publication ajoutée avec succès");
            fetchComments();
        } catch (error) {
            console.error("Erreur lors de l'ajout du commentaire :", error.message);
            alert("Erreur lors de l'ajout du commentaire :", error.message);
        }
    };

    const handleDelete = async (commentId) => {
        try {
            await axios.delete(`/commentGroupe/remove/${commentId}`);
            setComments(comments.filter((comment) => comment._id !== commentId));
            alert("Commentaire supprimé avec succès.");
        } catch (error) {
            console.error("Erreur lors de la suppression du commentaire :", error.message);
            alert("Erreur lors de la suppression du commentaire :", error.message);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("fr-FR", options);
    };

    return (
        <div className="comment-section">

            {comments.map((comment) => (
                <div className="comment-sec" key={comment._id}>
                    <ul>
                        <li>
                            <div className="comment-list"> 
                                <div className="comment">
                                    <img
                                        src={comment.creator.profileImage ? `http://localhost:8000/user/${comment.creator._id}/profile` : "/assets/images/resources/user-pro-img.png"}
                                        alt={comment.creator.name}
                                        width={50}
                                        style={{ borderRadius: '70%' }}
                                    />  
                                    <h3>{comment.creator.name}</h3>
                                    <span>🕒 {formatDate(comment.createdAt)}</span>
                                    <p>{comment.contenue} {"  "}
                                    
                                    {user.id === comment.creator._id && (<a href="#" onClick={() => handleDelete(comment._id)}>❌</a>)}{" "}

                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            ))}
            <div className="post-comment">
                <div className="cm_img">
                    <img src="/assets/images/resources/bg-img4.png" alt="" />
                </div>
                <div className="comment_box">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="contenu"
                            placeholder="Post a comment"
                            required=""
                            value={formData.contenu}
                            onChange={handleChange}
                        />
                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
