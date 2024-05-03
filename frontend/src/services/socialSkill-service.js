import axios from 'axios';

const apiUrl = "http://localhost:8000/socialSkills";

const SocialSkillService = {
  getAllSocialSkills: async () => {
    try {
      const response = await axios.get(`${apiUrl}/getall`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des compétences sociales:', error.message);
      throw error;
    }
  },


    /*getAllSocialSkills: async (page, limit) => {
      try {
        const response = await axios.get(`${apiUrl}/getall?page=${page}&limit=${limit}`);
        return response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des compétences sociales:', error.message);
        throw error;
      }
    },*/
  

  getSocialSkillById: async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/getbyid/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de la compétence sociale:', error.message);
      throw error;
    }
  },

  addSocialSkill: async (socialSkill) => {
    try {
      const response = await axios.post(`${apiUrl}/add`, socialSkill);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l"ajout de la compétence sociale:', error.message);
      throw error;
    }
  },

  removeSocialSkill: async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/remove/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la suppression de la compétence sociale:', error.message);
      throw error;
    }
  },

  updateSocialSkill: async (id, updatedData) => {
    try {
      const response = await axios.put(`${apiUrl}/update/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la compétence sociale:', error.message);
      throw error;
    }
  },

  /*assignSocialSkillToUser: async (userId, skillIds) => {
    try {
      const response = await axios.put(`${apiUrl}/assign/${userId}`, { skillIds });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l"affectation de compétences sociales à l\'utilisateur:', error.message);
      throw error;
    }
  },*/

  assignSocialSkillToUser: async (socialSkillId, userId) => {
    try {
      const response = await axios.put(`${apiUrl}/assign/${socialSkillId}/${userId}`);
      return response.data.socialSkill;
      
    } catch (error) {
      console.error('Erreur lors de l"affectation de compétences sociales à l\'utilisateur:', error.message);
      throw error;
    }
  },

  /*unassignSocialSkillFromUser: async (userId, skillId) => {
    try {
      const response = await axios.put(`${apiUrl}/unassign/${userId}`, { skillId });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la désaffectation de la compétence sociale de l\'utilisateur:', error.message);
      throw error;
    }
  },*/

  unassignSocialSkillFromUser: async (socialSkillId, userId) => {
    try {
      const response = await axios.put(`${apiUrl}/unassign/${socialSkillId}/${userId}`);
      return response.data.socialSkills;
    } catch (error) {
      console.error('Erreur lors de la désaffectation de la compétence sociale de l\'utilisateur:', error.message);
      throw error;
    }
  },

 // Récupérer les compétences sociales par utilisateur
 /*getSocialSkillsByUser: async (userId) => {
    try {
      const response = await axios.get(`${apiUrl}/getbyuser/${userId}`);
      return response.data; // Assurez-vous que la structure de la réponse correspond à vos besoins
    } catch (error) {
      console.error('Erreur lors de la récupération des compétences sociales par utilisateur:', error.message);
      throw error;
    }
  },*/

  // Récupérer les compétences sociales assignées à un utilisateur
  getSocialSkillsByUser: async (userId) => {
    try {
      const response = await axios.get(`${apiUrl}/getbyuser/${userId}`);
      return response.data; // Assurez-vous que la structure de la réponse correspond à vos besoins
      
    } catch (error) {
      console.error('Erreur lors de la récupération des compétences sociales par utilisateur:', error.message);
      throw error;
    }
  },

  

  
    // Récupérer les compétences sociales disponibles pour un utilisateur
    getAvailableSocialSkills: async (userId) => {
      try {
        const response = await axios.get(`${apiUrl}/availables/${userId}`);
        const Data = response.data.socialSkills;
    
        if (Array.isArray(Data)) {
          return Data; // S'assurer que la réponse est un tableau
        } else {
          throw new Error("Les données reçues ne sont pas un tableau"); // Gestion d'erreur
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des compétences sociales disponibles:", error.message);
        throw error; // Renvoyer l'erreur pour qu'elle soit gérée
      }
    },
    

    // Calculer la somme des points sociaux pour un utilisateur
  getUsersForSocialSkills: async (userId) => {
    try {
      const response = await axios.get(`${apiUrl}/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs pour les compétences sociales:', error.message);
      throw error;
    }
  },


  GetDepartmentNameById: async (departmentId) => {
    try {
      const response = await axios.get(`${apiUrl}/department/${departmentId}`); // URL de votre route
      console.log(response)
      return response.data.name; // Renvoie le nom du département

    } catch (error) {
      console.error("Erreur lors de la récupération du nom du département:", error.message);
      throw error;
    }
  },

  // Récupérer le nom de l'unité par ID
  GetUniteNameById: async (uniteId) => {
    try {
      const response = await axios.get(`${apiUrl}/unite/${uniteId}`); // URL de votre route
      return response.data.name; // Renvoie le nom de l'unité
    } catch (error) {
      console.error("Erreur lors de la récupération du nom de l'unité:", error.message);
      throw error;
    }
  },
};



export default SocialSkillService;


