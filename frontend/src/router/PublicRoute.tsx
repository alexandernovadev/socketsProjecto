import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Loading } from "../componets/shared/Loading";

interface PublicRouteProps {
  children: JSX.Element;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const {
    auth: { logged, checking },
  } = useContext(AuthContext);

  if (checking) {
    // Show a loader while checking the token
    return <Loading />;
  }

  if (logged) {
    // If the user is authenticated, redirect to /chat/home
    return <Navigate to="/chat/home" />;
  }

  // If not authenticated, allow access to the requested page
  return children;
};
