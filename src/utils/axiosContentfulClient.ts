import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://cdn.contentful.com/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
