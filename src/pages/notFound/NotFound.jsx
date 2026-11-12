import React from "react";
import { Link } from "react-router-dom";

import { useAppSelector } from "../../store/hooks";
import "../../components/ErrorBoundary/ErrorFallback.css";
import "../../components/buttons/Button.css";

const NotFound = () => {
  const token = useAppSelector((state) => state.auth.token);
  const homePath = token ? "/dashboard" : "/login";

  return (
    <div className="status-page status-page--fullscreen">
      <div className="status-card">
        <div className="status-code">404</div>
        <h1>Page not found</h1>
        <p>
          The page you are looking for does not exist or has been moved. Check
          the address, or return to a known screen.
        </p>

        <div className="status-actions">
          <Link to={homePath} className="btn btn-add">
            {token ? "Go to dashboard" : "Go to login"}
          </Link>
          <button
            type="button"
            className="btn btn-emi"
            onClick={() => window.history.back()}
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
