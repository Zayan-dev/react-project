import axios from "axios";
import { API_BASEURL } from "./constants";
// Create axios instance
export const axiosInstance = axios.create({
  baseURL: API_BASEURL || import.meta.env.VITE_BACKEND_URL,
});

export default axiosInstance;
