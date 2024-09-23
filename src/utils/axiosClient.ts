import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ADMI_SERVICES_API,
    timeout: 10000, // Optional: Set a timeout for all requests
});

apiClient.interceptors.response.use(
    response => response,
    error => {
        // Add custom error handling logic, e.g., refresh tokens incase needed
        return Promise.reject(error);
    }
);

export default apiClient;
