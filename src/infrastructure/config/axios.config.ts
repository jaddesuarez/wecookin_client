import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const fetch = axios.create({ baseURL });

fetch.interceptors.request.use(
  (config) => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      config.headers["Authorization"] = `Bearer ${storedToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
