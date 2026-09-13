import api from "../lib/axios";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: "resident" | "admin";
  adminPasscode?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "resident" | "admin" | "security" | "secretary";
  buildingName?: string;
  flatNumber?: string;
  phone?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  registrationId?: string;
  user?: UserProfile;
  data?: any;
}

export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const logoutUser = async () => {
  try {
    // Optional backend logout if implemented
    await api.post("/auth/logout").catch(() => {});
  } catch (error) {
    console.error("Logout API Error:", error);
  } finally {
    // Always clear local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      localStorage.removeItem("registrationId");
      localStorage.removeItem("pendingName");
      localStorage.removeItem("pendingEmail");
    }
  }
};

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

export const getUser = (): UserProfile | null => {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("token");
};