import axios from "axios";

const API_URL = "http://localhost:8000";

export const predictNews = async (text: string) => {
  const response = await axios.post(`${API_URL}/predict`, {
    text,
  });
  return response.data;
};