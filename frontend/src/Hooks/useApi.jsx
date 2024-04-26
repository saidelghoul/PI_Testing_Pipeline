import { useState, useEffect } from 'react';
import axios from 'axios';

const useApi = (apiUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getById = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/${id}`);
      return response.data;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateData = async (id, newData) => {
    setLoading(true);
    try {
      const response = await axios.put(`${apiUrl}/${id}`, newData);
      setData((prevData) =>
        prevData.map((item) => (item.id === id ? response.data : item))
      );
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {  loading, error, updateData, deleteData, getById };
};

export default useApi;
