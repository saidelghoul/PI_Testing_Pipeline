import axios from "axios";
const url = "http://localhost:8000/activities";

export const getActivities = async (id) => {
  id = id || "";
  return await axios.get(`${url}/${id}`);
};
export const addActivity = async (activity, id) => {
  return await axios.post(`${url}/${id}`, activity);
};
export const editActivity = async (id, activity) => {
  return await axios.put(`${url}/${id}`, activity);
};
export const deleteActivity = async (id) => {
  return await axios.delete(`${url}/${id}`);
};
