import React from "react";
import { useLocation } from "react-router-dom";

import ErrorBoundary from "./ErrorBoundary";

const RouteErrorBoundary = ({ children, fallback }) => {
  const location = useLocation();

  return (
    <ErrorBoundary key={location.pathname} fallback={fallback}>
      {children}
    </ErrorBoundary>
  );
};

export default RouteErrorBoundary;
