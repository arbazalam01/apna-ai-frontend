import { atom } from "jotai";
import { addTokenToAxios } from "../utils/api";



const getTokenFromCookie = () => {
  const cookieName = "token=";
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(cookieName)) {
      const authToken = cookie.substring(cookieName.length, cookie.length);
      //   addTokenToAxios(authToken);
      return cookie.substring(cookieName.length, cookie.length);
    }
  }

  return null;
};

export const tokenAtom = atom(getTokenFromCookie());

export const isAuthenticatedAtom = atom((get) => !!get(tokenAtom));

export const stepNumber = atom(1);
export const Email=atom(null);
