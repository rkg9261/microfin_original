import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";

export const getStoredToken = () => {
  const token = localStorage.getItem("token");
  if (!token || !String(token).trim()) return "";
  return String(token).trim();
};

export const isLoggedIn = (token) =>
  Boolean(token && String(token).trim() && getStoredToken());

export const ProtectedRoute = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const token = useAppSelector((state) => state.auth.token);
  const storedToken = getStoredToken();
  const authenticated = isLoggedIn(token) && Boolean(storedToken);

  useEffect(() => {
    if (token && !storedToken) {
      dispatch(logout());
    }
  }, [dispatch, token, storedToken]);

  if (!authenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
};

export const GuestRoute = () => {
  const token = useAppSelector((state) => state.auth.token);

  if (isLoggedIn(token)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export const HomeRedirect = () => {
  const token = useAppSelector((state) => state.auth.token);
  const destination = isLoggedIn(token) ? "/dashboard" : "/login";
  return <Navigate to={destination} replace />;
};
