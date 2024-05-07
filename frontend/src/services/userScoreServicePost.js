import axios from "axios";

// Base URL pour les requêtes
const apiUrl = process.env.REACT_APP_BACKEND_URL + "/userScore"; // Ajustez selon votre configuration

const userScoreServicePost = {
  // Récupérer le nombre de rapports pour un utilisateur par son ID
  getPubReportsById: async (userId) => {
    try {
      const response = await axios.get(`${apiUrl}/getPubReportsbyid/${userId}`);
      //console.log("PubReports",response);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des rapports:",
        error.message
      );
      throw error;
    }
  },

  // Récupérer le nombre de likes pour un utilisateur par son ID
  getPubLikesById: async (userId) => {
    try {
      const response = await axios.get(`${apiUrl}/getPubLiketbyid/${userId}`);
      //console.log("Publikes",response);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des likes:", error.message);
      throw error;
    }
  },

  // Récupérer le nombre de dislikes pour un utilisateur par son ID
  getPubDislikesById: async (userId) => {
    try {
      const response = await axios.get(
        `${apiUrl}/getPubtDesliketbyid/${userId}`
      );
      //console.log("PubDislikes",response);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des dislikes:",
        error.message
      );
      throw error;
    }
  },

  // Récupérer le nombre de rapports pour les événements
  getEventReportsById: async (userId) => {
    try {
      const response = await axios.get(
        `${apiUrl}/getEventReportbyid/${userId}`
      );
      //console.log("EventReports",response);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des rapports d'événements:",
        error.message
      );
      throw error;
    }
  },

  // Récupérer le nombre de likes pour les événements
  getEventLikesById: async (userId) => {
    try {
      const response = await axios.get(`${apiUrl}/getEventLiketbyid/${userId}`);
      //console.log("EventLikes",response);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des likes d'événements:",
        error.message
      );
      throw error;
    }
  },

  // Récupérer le nombre de dislikes pour les événements
  getEventDislikesById: async (userId) => {
    try {
      const response = await axios.get(
        `${apiUrl}/getEventDesliketbyid/${userId}`
      );
      //console.log("EventsDislikes",response);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des dislikes d'événements:",
        error.message
      );
      throw error;
    }
  },
};

export default userScoreServicePost;
