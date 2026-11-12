import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

import "./Auth.css";
import "../../utils/validation.css";
import { validateRequired } from "../../utils/validation";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearAuthError, loginUser } from "../../store/slices/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error: authError } = useAppSelector((state) => state.auth);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    if (authError) {
      dispatch(clearAuthError());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateRequired(formData, [
      {
        name: "email",
        label: "Username",
      },
      {
        name: "password",
        label: "Password",
      },
    ]);

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    try {
      await dispatch(
        loginUser({
          email: formData.email,
          password: formData.password,
        })
      ).unwrap();

      toast.success("Login successful");
      navigate("/loan-plan");
    } catch (error) {
      toast.error(error || "Login Failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1 className="auth-title">
          Login
        </h1>

        <form onSubmit={handleSubmit}>

          {/* Email */}

          <div className="auth-input-box">

            <input
              type="text"
              name="email"
              autoComplete="username"
              placeholder="Enter Username or Email"
              value={formData.email}
              onChange={handleChange}
              className={
                errors.email ? "error-input" : ""
              }
            />

            <FaUser className="auth-icon" />

            {errors.email && (
              <p className="error-text">
                {errors.email}
              </p>
            )}

          </div>

          {/* Password */}

          <div className="auth-input-box">

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className={
                errors.password
                  ? "error-input"
                  : ""
              }
            />

            <FaLock className="auth-icon" />

            {errors.password && (
              <p className="error-text">
                {errors.password}
              </p>
            )}

          </div>

          {/* Remember */}

          <div className="auth-options">

            <label className="remember-box">

              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />

              Remember me

            </label>

            <Link
              to="/forgot-password"
              className="auth-link"
            >
              Forgot password?
            </Link>

          </div>

          {/* Login Button */}

          {authError && (
            <p className="error-text">{authError}</p>
          )}

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading
              ? "Please Wait..."
              : "Login"}
          </button>

          {/* Register */}

          <div className="register-text">

            Don't have an account?

            <Link
              to="/register"
              className="register-link"
            >
              Register
            </Link>

          </div>

        </form>

      </div>
    </div>
  );
};

export default Login;