import axios from "axios";
import { getDeleteEndpoint } from "../../utils/utils";

export default function PostDelete({ postContent, fetchPosts }) {
  const endpoint = getDeleteEndpoint(postContent.postType);

  const handleDeletePub = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ?")) {
      try {
        await axios.delete(`/${endpoint}/${id}`);
        fetchPosts();
      } catch (error) {
        console.error("Erreur lors de la suppression ", error.message);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          alert("Warning : " + error.response.data.error);
        } else {
          alert(
            "Erreur lors de la configuration de la requête : " + error.message
          );
        }
      }
    }
  };

  return (
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
      />
    </a>
  );
}
