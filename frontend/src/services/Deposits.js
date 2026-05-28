// import axios from "axios"; atkomentuot kai bus bakend
import deposits from "../mock-data/deposits.json";

// const API_URL = import.meta.env.VITE_API_URL; atkomentuot kai bus bakend

// MOCK SERVICE (kol backend endpoint dar nebaigtas)

export const getDeposits = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: deposits,
      });
    }, 500);
  });
};

export const getDepositsByGoalId = async (goalId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredDeposits = deposits.filter(
        (deposit) => deposit.goalId === goalId
      );

      resolve({
        data: filteredDeposits,
      });
    }, 500);
  });
};

export const createDeposit = async (depositData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          id: Math.floor(Math.random() * 10000),
          ...depositData,
          createdAt: new Date().toISOString(),
        },
      });
    }, 500);
  });
};

// getMonthlyDepositsSummary bus reikalingas menesiu diagramai, rezultatas: 
/*[
  {
    "month": "sausis",
    "totalAmount": 650
  },
  {
    "month": "vasaris",
    "totalAmount": 1200
  }
]*/

export const getMonthlyDepositsSummary = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const summary = {};

      deposits.forEach((deposit) => {
       const month = new Date(deposit.createdAt).toLocaleString("en-US", {
        month: "long",
      });

        summary[month] = (summary[month] || 0) + deposit.amount;
      });

      const formattedSummary = Object.entries(summary).map(
        ([month, totalAmount]) => ({
          month,
          totalAmount,
        })
      );

      resolve({
        data: formattedSummary,
      });
    }, 500);
  });
};

// REAL API EXAMPLES (naudosim vėliau, kai turesim backend)

/*
export const getDeposits = async () => {
  const response = await axios.get(`${API_URL}/api/deposits`);
  return response;
};

export const getDepositsByGoalId = async (goalId) => {
  const response = await axios.get(
    `${API_URL}/api/deposits/goal/${goalId}`
  );
  
  return response;
};

export const createDeposit = async (depositData) => {
  const response = await axios.post(
    `${API_URL}/api/deposits`,
    depositData
  );

  return response;
};
*/