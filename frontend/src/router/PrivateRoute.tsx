import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const {
    auth: { logged, checking },
  } = useContext(AuthContext);

  if (checking) {
    // Show a loader while checking the token
    return <div>Loading...</div>;
  }

  if (!logged) {
    // If the user is not authenticated, redirect to login
    return <Navigate to="/chat/login" />;
  }

  // If authenticated, allow access to the requested page
  return children;
};
