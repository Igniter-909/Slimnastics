import axios from "axios";

const BASE_URL = "https://slimnastics-backend.vercel.app/";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;