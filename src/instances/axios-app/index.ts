import axios from "axios";
import { getAccessToken } from "@utils";

export const axiosInstanceApp = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
axiosInstanceApp.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  console.log(token);
  if (config.headers && token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
