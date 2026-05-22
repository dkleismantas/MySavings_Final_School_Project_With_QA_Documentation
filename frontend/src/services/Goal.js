import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const createGoal = async (data) => {
  const response = await axios.post(`${API_URL}/api/SavingGoal/add-saving-goal`, data);
  return response;
};