import React from "react";

const Connection = React.lazy(() => import("../User/connection/Connection"));

const MainRoutes = [
  { path: "/", component: <Connection /> },
];

export default MainRoutes;
