import axios from "axios";
import toast from "react-hot-toast";

// const BASE_URL = "https://slimnastics-backend.vercel.app/api/v1";

const axiosInstance = axios.create({
    baseURL: 'https://slimnastics-backend.vercel.app/api/v1',
    withCredentials: true,
    timeout: 15000, // 15 second timeout
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Add any auth headers if needed
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Response error:', error);
        
        // Handle different error scenarios
        if (error.code === 'ECONNABORTED') {
            toast.error('Request timed out. Please try again.');
        } else if (!error.response) {
            toast.error('Network error. Please check your connection.');
        } else {
            switch (error.response.status) {
                case 500:
                    toast.error('Server error. Please try again later.');
                    break;
                case 404:
                    toast.error('Service not found. Please check the API endpoint.');
                    break;
                default:
                    toast.error(error.response.data?.message || 'An error occurred.');
            }
        }
        
        return Promise.reject(error);
    }
);

export default axiosInstance;

export default axiosInstance;