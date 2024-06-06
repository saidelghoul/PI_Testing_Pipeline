import axios from 'axios';

const apiUrl = process.env.REACT_APP_BACKEND_URL + '/technologies';

const technologyService = {
  getAllTechnologies: async () => {
    try {
      const response = await axios.get(`${apiUrl}/getall`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des technologies :', error);
      throw error;
    }
  },

  getTechnologyById: async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/getbyid/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la technologie avec l'ID ${id} :`, error);
      throw error;
    }
  },

  addTechnology: async (technology) => {
    try {
      const response = await axios.post(`${apiUrl}/add`, technology);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'ajout d\'une nouvelle technologie :', error);
      throw error;
    }
  },

  updateTechnology: async (id, updatedTechnology) => {
    try {
      const response = await axios.put(`${apiUrl}/update/${id}`, updatedTechnology);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la technologie avec l'ID ${id} :`, error);
      throw error;
    }
  },

  deleteTechnology: async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/remove/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression de la technologie avec l'ID ${id} :`, error);
      throw error;
    }
  },
};

export default technologyService;
