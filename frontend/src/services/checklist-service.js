import axios from "axios";
const url = "http://localhost:8000/checklists";

export const getChecklists = async (id) => {
  id = id || "";
  return await axios.get(`${url}/${id}`);
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
