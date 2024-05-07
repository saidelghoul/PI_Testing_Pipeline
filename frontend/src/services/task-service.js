import axios from "axios";
const url = process.env.REACT_APP_BACKEND_URL + "/tasks";

export const getTasks = async (id) => {
  id = id || "";
  return await axios.get(`${url}/${id}`);
};

export const getUsersForTask = async () => {
  return await axios.get(`${url}/users`);
};

export const getChecklistByTask = async (id) => {
  return await axios.get(`${url}/${id}/checklists`);
};

export const getTasksByActivityWithChecklist = async (id) => {
  return await axios.get(`${url}/${id}/ofactivity`);
};

export const addTask = async (task, id) => {
  return await axios.post(`${url}/${id}`, task);
};
export const updateTask = async (id, task) => {
  return await axios.put(`${url}/${id}`, task);
};
export const deleteTask = async (id) => {
  return await axios.delete(`${url}/${id}`);
};
