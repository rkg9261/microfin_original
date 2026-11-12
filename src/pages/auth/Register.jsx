import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
} from "react-icons/fa";

import "./Auth.css";

import { validateRequired } from "../../utils/validation";
import "../../utils/validation.css";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { registerUser } from "../../store/slices/authSlice";
import { toast } from "react-toastify";

const Register = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const validation = validateRequired(formData, [
      { name: "fullName", label: "Full Name" },
      { name: "email", label: "Email" },
      { name: "mobile", label: "Mobile Number" },
      { name: "role", label: "Role" },
      { name: "password", label: "Password" },
      { name: "confirmPassword", label: "Confirm Password" },
    ]);

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors({
        confirmPassword: "Passwords do not match",
      });
      return;
    }

    try {
      await dispatch(
        registerUser({
          name: formData.fullName,
          email: formData.email,
          mobile: formData.mobile,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          role: formData.role,
        })
      ).unwrap();

      toast.success("Registration Successful");
      navigate("/login");
    } catch (error) {
      toast.error(error || "Registration Failed");
    }

  };

  return (

    <div className="auth-page">

      <div className="auth-card register-card">

        <h1 className="auth-title">
          Registration
        </h1>

        <form onSubmit={handleSubmit}>

          {/* Full Name */}

          <div className="auth-input-box">

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? "error-input" : ""}
            />

            <FaUser className="auth-icon" />

            {errors.fullName && (
              <p className="error-text">
                {errors.fullName}
              </p>
            )}

          </div>

          {/* Email */}

          <div className="auth-input-box">

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error-input" : ""}
            />

            <FaEnvelope className="auth-icon" />

            {errors.email && (
              <p className="error-text">
                {errors.email}
              </p>
            )}

          </div>

          {/* Mobile */}

          <div className="auth-input-box">

            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              className={errors.mobile ? "error-input" : ""}
            />

            <FaPhone className="auth-icon" />

            {errors.mobile && (
              <p className="error-text">
                {errors.mobile}
              </p>
            )}

          </div>

          {/* Role */}

          <div className="auth-input-box">

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={errors.role ? "error-input" : ""}
            >
              <option value="">
                Select Role
              </option>

              <option value="Admin">
                Admin
              </option>

              <option value="User">
                User
              </option>

            </select>

            <FaUser className="auth-icon" />

            {errors.role && (
              <p className="error-text">
                {errors.role}
              </p>
            )}

          </div>

          {/* Password */}

          <div className="auth-input-box">

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "error-input" : ""}
            />

            <FaLock className="auth-icon" />

            {errors.password && (
              <p className="error-text">
                {errors.password}
              </p>
            )}

          </div>

          {/* Confirm Password */}

          <div className="auth-input-box">

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={
                errors.confirmPassword
                  ? "error-input"
                  : ""
              }
            />

            <FaLock className="auth-icon" />

            {errors.confirmPassword && (
              <p className="error-text">
                {errors.confirmPassword}
              </p>
            )}

          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Please Wait..." : "Register"}
          </button>

          <div className="register-text">

            Already have an account?

            <Link
              to="/login"
              className="register-link"
            >
              Login
            </Link>

          </div>

        </form>

      </div>

    </div>

  );

};

export default Register;