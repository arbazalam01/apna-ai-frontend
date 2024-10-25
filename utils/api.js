import axios from "axios";
import { useAtom } from "jotai";
import { tokenAtom } from "../store/AuthStore";

// create axios instance

const getTokenFromCookie = () => {
  const cookieName = "token=";
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(cookieName)) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return null;
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const addTokenToAxios = (token) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const useAxios = () => {
  const [token] = useAtom(tokenAtom);

  // Set up an Axios interceptor to attach the token to every request
  axiosInstance.interceptors.request.use(
    (config) => {
      const updatedToken = token || getTokenFromCookie(); // Fallback to cookie if token not in atom
      if (updatedToken) {
        config.headers["Authorization"] = `Bearer ${updatedToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export const removeTokenFromAxios = () => {
  delete axiosInstance.defaults.headers.common["Authorization"];
};

export const removeTokenFromCookie = () => {
  document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

const authToken = getTokenFromCookie();
if (authToken) {
  addTokenToAxios(authToken);
}

export default axiosInstance;
