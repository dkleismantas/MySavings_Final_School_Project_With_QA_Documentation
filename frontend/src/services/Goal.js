import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const createGoal = async (data) => {
  const response = await axios.post(`${API_URL}/api/SavingGoal/add-saving-goal`, data);
  return response;
};

// GET BY USER ID
export const getSavingGoalsByUserId = async (userId, sortBy = "newest") => {
  try {
    const response = await axios.get(
      `${API_URL}/api/SavingGoal/get-saving-goals/${userId}`,
      {
        params: { sortBy },
      }
    );

    if (response.status === 204) {
      return [];
    }

    return response.data ?? [];
  } catch (error) {
    // 204 No Content
    if (error.response?.status === 204) {
      return [];
    }

    console.error("Error fetching saving goals:", error);
    throw error;
  }
};
