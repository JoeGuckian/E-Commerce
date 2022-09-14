import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { authenticationService } from "../services/authentication-service";

const ProtectedRoutes = (): JSX.Element => {
  const isLoggedIn = authenticationService.isLoggedIn();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
