
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

interface PrivateRouteProps {
  children: React.ReactNode; 
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, path }) => {
  const { user } = useAuth();

  return (
    <Route
      path={path}
      element={
        user ? (
          children 
        ) : (
          <Navigate to="/login" replace /> 
        )
      }
    />
  );
};

export default PrivateRoute;
