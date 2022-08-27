// PrivateRoutes are only accessible for the user who is already logged in

import { Navigate } from "react-router-dom";
import React from "react";

function Private({ children }) {
  const status = sessionStorage.getItem("isAdminLogedIn")
  console.log(status);
  if (!status) {
    return <Navigate to="/admin" />
  }
  return children;
}

export default Private;
