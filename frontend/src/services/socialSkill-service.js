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

  assignSocialSkillToUser: async (userId, skillIds) => {
    try {
      const response = await axios.put(`${apiUrl}/assign/${userId}`, { skillIds });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l"affectation de compétences sociales à l\'utilisateur:', error.message);
      throw error;
    }
  },

  unassignSocialSkillFromUser: async (userId, skillId) => {
    try {
      const response = await axios.put(`${apiUrl}/unassign/${userId}`, { skillId });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la désaffectation de la compétence sociale de l\'utilisateur:', error.message);
      throw error;
    }
  },

 // Récupérer les compétences sociales par utilisateur
 getSocialSkillsByUser: async (userId) => {
    try {
      const response = await axios.get(`${apiUrl}/getbyuser/${userId}`);
      return response.data.message; // Assurez-vous que la structure de la réponse correspond à vos besoins
    } catch (error) {
      console.error('Erreur lors de la récupération des compétences sociales par utilisateur:', error.message);
      throw error;
    }
  },
};

export default SocialSkillService;
