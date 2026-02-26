import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const api = axios.create({
  baseURL: baseURL,
});

// REQUEST INTERCEPTERS: attack the token with request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// RESPONCE INTERCEPTERS: handling 401 (Expired Token)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/api/token/")
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refresh_token");
        const res = await axios.post(baseURL, {
          refresh: refreshToken,
        });
        if (res.status === 200) {
          localStorage.setItem("access_token", res.data.access);
          return api(originalRequest);
        }
      } catch (err) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
