const API_URL = "http://localhost:5000/api";
 
export const getGoals = async () => {
  const token = localStorage.getItem("token");
 
  const response = await fetch(`${API_URL}/savingsgoal/goals`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
 
  if (!response.ok) {
    throw new Error("Cannot get savings goals");
  }
 
  return response.json();
};