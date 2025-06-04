// noinspection JSAnnotator

import axios from 'axios'
const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN // Access token from .env

// Ensure this is a string

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ADMI_SERVICES_API,
  headers: {
    'Content-Type': 'application/json', // Default content type for all requests
    Authorization: `Bearer ${token}` // Add the token to the headers
  },
  timeout: 10000 // Optional: Set a timeout for all requests
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Add custom error handling logic, e.g., refresh tokens if needed
    return Promise.reject(error)
  }
)

export default apiClient
