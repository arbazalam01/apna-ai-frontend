// ProtectedRoute.js
import React from "react";
import { useAtom, useAtomValue } from "jotai";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { isAuthenticatedAtom } from "../../store/AuthStore";

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
