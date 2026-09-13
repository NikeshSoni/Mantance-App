import axiosInstance from "./axiosInstance";

export const loginUser = async (email, password) => {
  const res = await axiosInstance.post("/auth/login", { email, password });

  // Adjust this path to match your backend's actual response shape
  const token = res.data.token || res.data.data?.token;

  if (!token) {
    throw new Error("No token returned from login response.");
  }

  localStorage.setItem("token", token);
  return res.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};