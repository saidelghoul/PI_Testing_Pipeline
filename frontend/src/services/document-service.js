import axios from "axios";
const url = process.env.REACT_APP_BACKEND_URL + "/documents";

export const getDocuments = async (id) => {
  id = id || "";
  return await axios.get(`${url}/${id}`);
};

export const getDocumentByChecklist = async (id) => {
  return await axios.get(`${url}/${id}/document`);
};

export const uploadDocumentToChecklist = async (id, document) => {
  return await axios.post(`${url}/upload/${id}`, document);
};

export const deleteDocument = async (id) => {
  return await axios.delete(`${url}/${id}`);
};
