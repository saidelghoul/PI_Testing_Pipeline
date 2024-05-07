import axios from "axios";
const url = process.env.REACT_APP_BACKEND_URL + "/checklists";

export const getChecklists = async (id) => {
  id = id || "";
  return await axios.get(`${url}/${id}`);
};

export const getAssignedUsersForChecklist = async (id) => {
  return await axios.get(`${url}/${id}/users`);
};

export const getChecklistByHolder = async (id) => {
  return await axios.get(`${url}/${id}/checklist`);
};

export const getChecklistByTaskWithHolder = async (id) => {
  return await axios.get(`${url}/${id}/oftask`);
};

export const getChecklistScoreForUser = async (id) => {
  return await axios.get(`${url}/${id}/score`);
};

export const addChecklist = async (checklist, id) => {
  return await axios.post(`${url}/${id}`, checklist);
};

export const updateChecklist = async (id, checklist) => {
  return await axios.put(`${url}/${id}`, checklist);
};

export const deleteChecklist = async (id) => {
  return await axios.delete(`${url}/${id}`);
};
