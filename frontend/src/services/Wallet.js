import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// GET wallet by userId
export const getWalletByUserId = async (userId) => {
  const response = await axios.get(
    `${API_URL}/api/wallet/${userId}`
  );

  return response.data;
};

// CREATE wallet
export const createWallet = async (walletData) => {
  const response = await axios.post(
    `${API_URL}/api/wallet/create`,
    walletData
  );

  return response.data;
};

// ADD balance
export const addBalance = async (walletData) => {
  const response = await axios.post(
    `${API_URL}/api/wallet/add`,
    walletData
  );

  return response.data;
};

// SUBTRACT balance
export const subtractBalance = async (walletData) => {
  const response = await axios.post(
    `${API_URL}/api/wallet/subtract`,
    walletData
  );

  return response.data;
};

// UPDATE balance
export const updateBalance = async (walletData) => {
  const response = await axios.put(
    `${API_URL}/api/wallet/update`,
    walletData
  );

  return response.data;
};