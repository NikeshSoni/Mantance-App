import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getDashboardStats = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API_URL}/admin/dashboard/stats`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(response, "responseresponseresponseresponse");
  

  return response.data.data;
};