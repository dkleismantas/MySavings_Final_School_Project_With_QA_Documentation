import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (formData) => {
  const response = await axios.post(`${API_URL}/api/User/create-user`, formData);
  return response;
};
