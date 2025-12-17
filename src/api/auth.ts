import axios from "axios";

const API_URL = "http://localhost:8080/api";

export interface RegisterPayload {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

// REGISTER
export const registerApi = (payload: RegisterPayload) => {
  return axios.post(`${API_URL}/auth/register`, payload);
};

// LOGIN
export const loginApi = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const res = await axios.post(`${API_URL}/auth/login`, payload);
  return res.data;
};
