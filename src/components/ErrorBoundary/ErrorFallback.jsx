import React from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../store/hooks";
import "../buttons/Button.css";
import "./ErrorFallback.css";

const ErrorFallback = ({ error, onReset, embedded = false }) => {
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);

  const handleHome = () => {
    navigate(token ? "/dashboard" : "/login", { replace: true });
  };

  const handleReload = () => {
    if (onReset) {
      onReset();
      return;
    }
    window.location.reload();
  };

  return (
    <div className={`status-page ${embedded ? "" : "status-page--fullscreen"}`}>
      <div className="status-card">
        <div className="status-code">500</div>
        <h1>Something went wrong</h1>
        <p>
          An unexpected error occurred while loading this page. You can try
          again or return to a safe screen.
        </p>

        {error?.message ? (
          <pre className="status-error">{error.message}</pre>
        ) : null}

        <div className="status-actions">
          <button type="button" className="btn btn-add" onClick={handleReload}>
            Try again
          </button>
          <button type="button" className="btn btn-emi" onClick={handleHome}>
            {token ? "Go to dashboard" : "Go to login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
