import axiosInstance from "./axiosInstance";

// CREATE GOAL
export const createGoal = async (data) => {
  const response = await axiosInstance.post("/api/SavingGoal/add-saving-goal", data);
  return response.data;
};

// GET ALL GOALS FOR CURRENT USER (with optional filters)
export const getSavingGoalsByUserId = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.status) params.append("status", filters.status);
  if (filters.targetDateFrom) params.append("targetDateFrom", filters.targetDateFrom);
  if (filters.targetDateTo) params.append("targetDateTo", filters.targetDateTo);
  if (filters.name?.trim()) params.append("name", filters.name.trim());
  if (filters.sortBy) params.append("sortBy", filters.sortBy);

  const response = await axiosInstance.get("/api/SavingGoal/get-saving-goals", { params });
  return response.data ?? [];
};

// GET GOAL BY ID
export const getSavingGoalById = async (id) => {
  const response = await axiosInstance.get(`/api/SavingGoal/get-by-id/${id}`);
  return response.data;
};