import { useContext, useState } from "react";
import { UserContext } from "../../../../context/userContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
export default function AddPubGroups() {
const {groupId} =useParams();
    const { user } = useContext(UserContext); // Obtenez les données de l'utilisateur depuis le contexte
    const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation
  
    const [formData, setFormData] = useState({
        contenu: "",
       });
     
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
             groupsId:groupId // Utilisez l'ID de l'utilisateur connecté
           };
     
           // Envoyez les données au serveur pour ajouter la publication
           await axios.post(`/pubGroupe/addPub/${groupId}`, publicationData);
     
           setFormData({
             contenu: "",
           });
           alert("Publication ajoutée avec succès");
           navigate(`/groups/${groupId}`);

     $    } catch (error) {
           // Une erreur s'est produite lors de la configuration de la requête
           console.error(
             "Erreur lors de la configuration de la requête :",
             error.message
           );
           alert("Erreur lors de la configuration de la requête :", error.message);
         }
       };
  return (
    <>
       <div className="col-12" style={{ alignContent: "center" }}>
        <div className="acc-setting">
          <h3>Création d'une publication</h3>
          <form onSubmit={handleSubmit}>
           
            <div className="cp-field">
              <h5>Contenu</h5>
              <textarea
                id="Contenue"
                name="contenu"
                value={formData.contenu}
                onChange={handleChange}
              />
            </div>
            <div className="save-stngs pd3">
              <ul>
                <li>
                  <button type="submit">Save</button>
                </li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
