import axiosInstance from "./axiosInstance";

// GET ALL DEPOSITS
export const getDeposits = async () => {
  const response = await axiosInstance.get("/api/deposit");
  return response.data;
};

// GET DEPOSITS BY GOAL ID
export const getDepositsByGoalId = async (goalId) => {
  const response = await axiosInstance.get(`/api/deposit/goal/${goalId}`);
  return response.data;
};

// CREATE DEPOSIT
export const createDeposit = async (depositData) => {
  const response = await axiosInstance.post("/api/deposit/create", depositData);
  return response.data;
};

// MONTHLY SUMMARY FOR DASHBOARD CHART
export const getMonthlyDepositsSummary = async () => {
  const response = await axiosInstance.get("/api/deposit/monthly-summary");
  return response.data;
};