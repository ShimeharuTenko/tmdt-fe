// src/api/auth.ts
import axios from "axios";

export interface RegisterPayload {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export const registerApi = (payload: RegisterPayload) => {
  return axios.post("http://localhost:8080/api/auth/register", payload);
};
