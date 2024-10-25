import React from "react";
import { useAtomValue } from "jotai";
import { Navigate } from "react-router-dom";
import { isAuthenticatedAtom } from "../../store/AuthStore";

const PublicRoute = ({ element }) => {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);

  return isAuthenticated ? <Navigate to="/admindashboard" /> : element;
};

export default PublicRoute;
