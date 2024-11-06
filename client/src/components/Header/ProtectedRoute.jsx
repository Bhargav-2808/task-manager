import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/userContext";

function ProtectedRoute({ element }) {
  const { user } = useUser();

  return user ? element : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
