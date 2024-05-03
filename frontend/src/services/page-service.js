import axios from 'axios';

// Base URL pour les requêtes, à ajuster selon votre configuration
const apiUrl = "http://localhost:8000/pubGroupe"; // Point de départ pour les requêtes HTTP

const publicationService = {
  // Récupérer toutes les publications pour un groupe et un utilisateur spécifique
  getPublicationsByGroupAndUser: async ( userId) => {
    try {
      const response = await axios.get(`${apiUrl}/publications/user/${userId}`);
      //console.log("le user"+userId+" :",response.data);
      return response.data; // Renvoyer les données des publications
      
    } catch (error) {
      console.error("Erreur lors de la récupération des publications par groupe et utilisateur :", error.message);
      throw error; // Lancer l'erreur pour la gestion des exceptions
    }
  },
  
  // Autres méthodes de service...
};

export default publicationService;
