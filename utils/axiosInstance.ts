import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 30000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const { token }: { token?: string } = await new Promise((resolve) => {
        chrome.storage.local.get(["token"], (res) => {
          resolve(res);
        });
      });

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.withCredentials = true;
      }

      console.log("headers: ", config.headers.Authorization);

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error: Error): Promise<Error> => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
