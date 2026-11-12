import React from "react";
import { Navigate } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import RouteErrorBoundary from "./ErrorBoundary/RouteErrorBoundary";
import ErrorFallback from "./ErrorBoundary/ErrorFallback";

import { useAppSelector } from "../store/hooks";
import { isLoggedIn } from "./auth/ProtectedRoute";

import "./Layout.css";

const Layout = ({ children }) => {
  const token = useAppSelector((state) => state.auth.token);
  const { sidebarOpen } = useAppSelector((state) => state.ui);

  if (!isLoggedIn(token)) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <Navbar />

      <main
        className={`main-content ${
          sidebarOpen ? "content-open" : "content-close"
        }`}
      >
        <RouteErrorBoundary
          fallback={(error, reset) => (
            <ErrorFallback error={error} onReset={reset} embedded />
          )}
        >
          {children}
        </RouteErrorBoundary>
      </main>
    </div>
  );
};

export default Layout;
