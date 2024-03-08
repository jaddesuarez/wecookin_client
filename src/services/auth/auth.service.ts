import { fetch } from "@/infrastructure/config/axios.config";
import { isAxiosError } from "axios";
import { IAuthData, ILoggedUser } from "./types";

const BASE_URL = "/auth";

export const auth = {
  signup: async (userData: IAuthData): Promise<string> => {
    try {
      const res = await fetch.post(`${BASE_URL}/signup`, userData);
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) throw error.response?.data.err;
      throw new Error("An error occurred while signing up");
    }
  },
  login: async (userData: IAuthData): Promise<{ authToken: string }> => {
    try {
      const res = await fetch.post(`${BASE_URL}/login`, userData);
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) throw error.response?.data.err;
      throw new Error("An error occurred while logging in");
    }
  },
  verify: async (): Promise<ILoggedUser> => {
    try {
      const res = await fetch.get(`${BASE_URL}/verify`);
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) throw error.response?.data.err;
      throw new Error("An error occurred while verifying token");
    }
  },

  updateToken: async () => {
    try {
      const res = await fetch.get(`${BASE_URL}/updateToken`);
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) throw error.response?.data.err;
      throw new Error("An error occurred while verifying token");
    }
  },
};
