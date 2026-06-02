import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const createGoal = async (data) => {
  const response = await axios.post(`${API_URL}/api/SavingGoal/add-saving-goal`, data);
  return response;
};

// GET BY USER ID
export const getSavingGoalsByUserId = async (userId, filters = {}) => {
  try {
    const params = new URLSearchParams();

    if (filters.status) {
      params.append("status", filters.status);
    }

    if (filters.targetDateFrom) {
      params.append("targetDateFrom", filters.targetDateFrom);
    }

    if (filters.targetDateTo) {
      params.append("targetDateTo", filters.targetDateTo);
    }

    if (filters.name?.trim()) {
      params.append("name", filters.name.trim());
    }

    const queryString = params.toString();

    const response = await axios.get(
      `${API_URL}/api/SavingGoal/get-saving-goals/${userId}${
        queryString ? `?${queryString}` : ""
      }`
    );

    return response.data ?? [];
  } catch (error) {
    if (error.response?.status === 204) {
      return [];
    }

    console.error("Error fetching saving goals:", error);
    throw error;
  }
};

export const getGoals = async () => {
  const token = localStorage.getItem("accessToken");
  const response = await axios.get(`${API_URL}/api/SavingGoal/goals`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data ?? [];
};