import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check if the user has a valid access token in localStorage
  const isAuthenticated = localStorage.getItem("accessToken");

  // If the user is not authenticated, redirect to the login page
  
  // If authenticated, render the protected component (children)
  return children;
};

export default ProtectedRoute;
