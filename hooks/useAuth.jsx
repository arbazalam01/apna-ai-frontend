// useAuth.js
import { useEffect } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { isAuthenticatedAtom, tokenAtom } from "../store/AuthStore";

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

const useAuth = () => {
  const [token, setToken] = useAtom(tokenAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom); // No need to set

  useEffect(() => {
    const storedToken = token || getTokenFromCookie();
    console.log("storedToken", storedToken);
    console.log("token before set", token);

    if (storedToken) {
      setToken(storedToken); // Set token in atom, `isAuthenticatedAtom` will auto-update
      console.log("token after set", token);
    }
    // No need to explicitly set isAuthenticated
    // Adding logs to check the states
    console.log("tokenAtom:", token);
    console.log("isAuthenticatedAtom:", isAuthenticated);
  }, [setToken]);

  return { isAuthenticated };
};

export default useAuth;
