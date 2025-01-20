import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const UserRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user.access_token && user.role === "user" ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" />
  );
};

export const HotelRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user.access_token && user.role === "hotel" ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" />
  );
};

export const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return !user.access_token ? (
    <>{children}</>
  ) : user.role === "user" ? (
    <>{children}</>
  ) : (
    <Navigate to="/dashboard/hotel" />
  );
};
