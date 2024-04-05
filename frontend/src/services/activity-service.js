import axios from "axios";
const url = "http://localhost:8000/activities";

axios.interceptors.request.use(
  (config) => {
    console.log("yey");
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export const getActivities = async (id) => {
  id = id || "";
  return await axios.get(`${url}/${id}`);
};

export const getTasksByActivity = async (id) => {
  return await axios.get(`${url}/${id}/tasks`);
};

export const addActivity = async (activity) => {
  return await axios.post(`${url}`, activity);
};
export const updateActivity = async (id, activity) => {
  return await axios.put(`${url}/${id}`, activity);
};
export const deleteActivity = async (id) => {
  return await axios.delete(`${url}/${id}`);
};
