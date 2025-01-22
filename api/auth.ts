import Cookies from "js-cookie"; 
import api from "./index";

interface RegisterPayload {
  user_name: string;
  email: string;
  phone_number: string;
  pass_word: string;
  pass_word1: string;
  user_type: string;
}

export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", {
    email,
    pass_word: password,
  });
  if (response.data?.user_access_token) {
    Cookies.set("token", response.data.user_access_token, { expires: 7 }); 
    localStorage.setItem("token", response.data.user_access_token);
  }
  return response.data;
};

export const register = async (userData: RegisterPayload) => {
  const response = await api.post("/register", userData);
  return response.data;
};

export const verifyUser = async (
  user_email: string,
  verification_code: string
) => {
  const response = await api.post("/verify_user", {
    user_email,
    verification_code,
  });
  return response.data;
};
