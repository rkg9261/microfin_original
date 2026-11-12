import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaPhone,
  FaKey,
  FaLock,
} from "react-icons/fa";

import "./Auth.css";

import { validateRequired } from "../../utils/validation";
import "../../utils/validation.css";
import { toast } from "react-toastify";

const ForgotPassword = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    phone: "",
    otp: "",
    password: "",
    confirmPassword: "",

  });

//   validations

  const [errors, setErrors] = useState({});

//   handle change
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

//   handle submit
  const handleSubmit = (e) => {

    e.preventDefault();

    // validation
    
    const validation = validateRequired(

      formData,

      [

        {
          name: "phone",
          label: "Mobile Number",
        },

        {
          name: "otp",
          label: "OTP",
        },

        {
          name: "password",
          label: "New Password",
        },

        {
          name: "confirmPassword",
          label: "Confirm Password",
        },

      ]

    );

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

    setErrors({});

    // Reset Password API

    console.log(formData);

    toast.success("Password Changed Successfully");

    navigate("/login");

  };

  return (

    <div className="auth-page">

      <div className="auth-card">

        <h1 className="auth-title">
          Forgot Password
        </h1>

        <form onSubmit={handleSubmit}>

            {/* ================= Mobile Number ================= */}

          <div className="auth-input-box">

            <input
              type="tel"
              name="phone"
              placeholder="Mobile Number"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? "error-input" : ""}
            />

            <FaPhone className="auth-icon" />

            {errors.phone && (
              <p className="error-text">
                {errors.phone}
              </p>
            )}

          </div>

          {/* ================= OTP ================= */}

          <div className="auth-input-box">

            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              className={errors.otp ? "error-input" : ""}
            />

            <FaKey className="auth-icon" />

            {errors.otp && (
              <p className="error-text">
                {errors.otp}
              </p>
            )}

          </div>

          {/* ================= New Password ================= */}

          <div className="auth-input-box">

            <input
              type="password"
              name="password"
              placeholder="New Password"
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

          {/* ================= Confirm Password ================= */}

          <div className="auth-input-box">

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={
                errors.confirmPassword ? "error-input" : ""
              }
            />

            <FaLock className="auth-icon" />

            {errors.confirmPassword && (
              <p className="error-text">
                {errors.confirmPassword}
              </p>
            )}

          </div>

          {/* ================= Reset Password Button ================= */}

          <button
            type="submit"
            className="login-btn"
          >
            Reset Password
          </button>

          {/* ================= Login Link ================= */}

          <div className="register-text">

            Remember your password?

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

export default ForgotPassword;