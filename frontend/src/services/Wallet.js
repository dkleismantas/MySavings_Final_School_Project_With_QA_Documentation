// import axios from "axios";
import wallet from "../data/wallet.json";

// const API_URL = import.meta.env.VITE_API_URL;

// MOCK SERVICE (kol backend dar nebaigtas)

export const getWallet = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: wallet,
      });
    }, 500);
  });
};

export const updateWalletBalance = async (newBalance) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          ...wallet,
          totalBalance: newBalance,
        },
      });
    }, 500);
  });
};

export const addToWallet = async (amount) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          ...wallet,
          totalBalance: wallet.totalBalance + amount,
        },
      });
    }, 500);
  });
};

export const subtractFromWallet = async (amount) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          ...wallet,
          totalBalance: wallet.totalBalance - amount,
        },
      });
    }, 500);
  });
};

// REAL API EXAMPLES (naudosit vėliau)

/*
export const getWallet = async () => {
  const response = await axios.get(`${API_URL}/api/wallet`);
  return response;
};

export const updateWalletBalance = async (newBalance) => {
  const response = await axios.put(
    `${API_URL}/api/wallet`,
    {
      totalBalance: newBalance,
    }
  );

  return response;
};

export const addToWallet = async (amount) => {
  const response = await axios.post(
    `${API_URL}/api/wallet/add`,
    {
      amount,
    }
  );

  return response;
};

export const subtractFromWallet = async (amount) => {
  const response = await axios.post(
    `${API_URL}/api/wallet/subtract`,
    {
      amount,
    }
  );

  return response;
};
*/