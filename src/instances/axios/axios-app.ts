import axios from "axios";
import { getAccessToken } from "@utils";

export const axiosApp = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_APP_URL,
});
axiosApp.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (config.headers && token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
