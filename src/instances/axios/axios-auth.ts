import axios from "axios";
import { getAccessToken } from "@utils";

export const axiosAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_AUTH_URL,
});

axiosAuth.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (config.headers && token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
