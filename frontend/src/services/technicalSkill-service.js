import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL + "/technicalSkills";

const TechnicalSkillService = {
  getAllTechnicalSkills: async () => {
    try {
      const response = await axios.get(`${apiUrl}/getall`);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des compétences techniques:",
        error.message
      );
      throw error;
    }
  },

  getTechnicalSkillById: async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/getbyid/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de la compétence technique:",
        error.message
      );
      throw error;
    }
  },

  addTechnicalSkill: async (technicalSkill) => {
    try {
      const response = await axios.post(`${apiUrl}/add`, technicalSkill);
      return response.data;
    } catch (error) {
      console.error(
        'Erreur lors de l"ajout de la compétence technique:',
        error.message
      );
      throw error;
    }
  },

  removeTechnicalSkill: async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/remove/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la suppression de la compétence technique:",
        error.message
      );
      throw error;
    }
  },

  updateTechnicalSkill: async (id, updatedData) => {
    try {
      const response = await axios.put(`${apiUrl}/update/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de la compétence technique:",
        error.message
      );
      throw error;
    }
  },

  assignTechnicalSkillToUser: async (userId, skillData) => {
    try {
      const response = await axios.put(`${apiUrl}/${userId}/assign`, skillData);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'affectation de la compétence technique à l'utilisateur:", error.message);
      throw error;
    }
  },

  unassignTechnicalSkillFromUser: async (userId, skillId) => {
    try {
      const response = await axios.put(`${apiUrl}/${userId}/unassign`, {
        skillId,
      });
      return response.data.technicalSkill;
    } catch (error) {
      console.error(
        "Erreur lors de la désaffectation de la compétence technique de l'utilisateur:",
        error.message
      );
      throw error;
    }
  },

  getTechnicalSkillsByUser: async (userId) => {
    try {
      const response = await axios.get(`${apiUrl}/${userId}/skills`);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des compétences techniques par utilisateur:",
        error.message
      );
      throw error;
    }
  },

  getAvailableTechnicalSkills: async (userId) => {
    try {
      const response = await axios.get(`${apiUrl}/available/${userId}`);
      const data = response.data.technicalSkills;

      if (Array.isArray(data)) {
        return data;
      } else {
        throw new Error("Les données reçues ne sont pas un tableau");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des compétences techniques disponibles:",
        error.message
      );
      throw error;
    }
  },

  getAvailableTechnologiesForUser: async (userId) => {
    try {
      const response = await axios.get(`${apiUrl}/available/${userId}`);
      return response.data.technologies;
    } catch (error) {
      console.error("Erreur lors de la récupération des technologies disponibles:", error.message);
      throw error;
    }
  },


  removeUserFromTechnicalSkill: async (userId, skillId) => {
    try {
      const response = await axios.put(`${apiUrl}/${userId}/skills/${skillId}`);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la suppression de l'utilisateur de la compétence technique :",
        error.message
      );
      throw error;
    }
  },
};

export default TechnicalSkillService;
