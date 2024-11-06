import axios from 'axios';

const baseUrl = new URL(process.env.REACT_APP_URL || "http://localhost:8080");
const fullUrl = new URL('/api/v1', baseUrl).toString();

console.log(fullUrl, "fullUrl")

const axiosInstance = axios.create({
  baseURL: fullUrl,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error || 'something went wrong')
);

export default axiosInstance;
