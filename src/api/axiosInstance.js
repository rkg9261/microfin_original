import axios from "axios";
import BASE_URL from "./api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    const value = token.startsWith("Bearer ")
      ? token
      : `Bearer ${token}`;

    config.headers.Authorization = value;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config?.url?.includes("/Auth/login")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      import("../store").then(({ default: store }) => {
        import("../store/slices/authSlice").then(({ logout }) => {
          store.dispatch(logout());
        });
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
