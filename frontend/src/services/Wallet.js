import axiosInstance from "./axiosInstance";

export const getWalletByUserId = async () => {
  const response = await axiosInstance.get("/api/wallet");
  return response.data;
};

export const addBalance = async (walletData) => {
  const response = await axiosInstance.post("/api/wallet/add", walletData);
  return response.data;
};

export const updateBalance = async (walletData) => {
  const response = await axiosInstance.put("/api/wallet/update", walletData);
  return response.data;
};