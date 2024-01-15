import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL,
  timeout: 30000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    chrome.storage.local.get(["token"], (res) => {
      const token: string = res.token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.withCredentials = true;
      }
    });
    return config;
  },
  (error: Error): Promise<Error> => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
