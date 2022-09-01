// PrivateRoutes are only accessible for the user who is already logged in

import React from "react";
import { Navigate } from "react-router-dom";

function Private({ children }) {
  const status = sessionStorage.getItem("isAdminLogedIn");
  if (!status) {
    return <Navigate to="/admin" />
  }
  return children;
}

export default Private;
