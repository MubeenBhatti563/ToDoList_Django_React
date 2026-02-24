import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
  (responce) => responce,
  async (error) => {
    const originalRequest = error.config;
    if (error.responce.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
    }
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/token/refresh/`,
        {
          refresh: refreshToken,
        },
      );
      if (res.status === 200) {
        localStorage.setItem("access_token", res.data.access);
        return api(originalRequest);
      }
    } catch {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
