import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getGoals = async (userId) => {
  const response = await axios.get(`${API_URL}/api/Goals?userId=${userId}`);
  return response;
};