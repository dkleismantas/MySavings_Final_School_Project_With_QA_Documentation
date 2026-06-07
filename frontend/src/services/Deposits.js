import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// GET ALL DEPOSITS
export const getDeposits = async () => {
  const response = await axios.get(`${API_URL}/api/deposit`);

  return response;
};

// GET DEPOSITS BY GOAL ID
export const getDepositsByGoalId = async (goalId) => {
  const response = await axios.get(
    `${API_URL}/api/deposit/goal/${goalId}`
  );

  return response;
};

// CREATE DEPOSIT
export const createDeposit = async (depositData) => {
  const response = await axios.post(
    `${API_URL}/api/deposit/create`,
    depositData
  );

  return response;
};

// MONTHLY SUMMARY FOR DASHBOARD CHART
export const getMonthlyDepositsSummary = async () => {
  const response = await axios.get(
    `${API_URL}/api/deposit/monthly-summary`
  );

  return response;
};