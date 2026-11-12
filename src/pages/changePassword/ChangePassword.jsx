import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaKey,
  FaShieldAlt,
  FaCheckCircle,
  FaArrowLeft,
} from "react-icons/fa";

import "./ChangePassword.css";


const ChangePassword = () => {

  const navigate = useNavigate();


  // =========================================
  // FORM STATE
  // =========================================

  const [formData, setFormData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });


  // =========================================
  // PASSWORD VISIBILITY
  // =========================================

  const [showOldPassword, setShowOldPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);


  // =========================================
  // ERRORS
  // =========================================

  const [errors, setErrors] = useState({});


  // =========================================
  // SUCCESS MESSAGE
  // =========================================

  const [successMessage, setSuccessMessage] =
    useState("");


  // =========================================
  // HANDLE INPUT
  // =========================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));


    // Remove error when user starts typing

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));


    setSuccessMessage("");

  };


  // =========================================
  // VALIDATION
  // =========================================

  const validateForm = () => {

    const newErrors = {};


    // EMAIL

    if (!formData.email.trim()) {

      newErrors.email =
        "Email address is required.";

    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {

      newErrors.email =
        "Please enter a valid email address.";

    }


    // OLD PASSWORD

    if (!formData.oldPassword) {

      newErrors.oldPassword =
        "Old password is required.";

    }


    // NEW PASSWORD

    if (!formData.newPassword) {

      newErrors.newPassword =
        "New password is required.";

    } else if (
      formData.newPassword.length < 6
    ) {

      newErrors.newPassword =
        "Password must be at least 6 characters.";

    }


    // CONFIRM PASSWORD

    if (!formData.confirmPassword) {

      newErrors.confirmPassword =
        "Please confirm your new password.";

    } else if (
      formData.newPassword !==
      formData.confirmPassword
    ) {

      newErrors.confirmPassword =
        "Passwords do not match.";

    }


    // SAME PASSWORD CHECK

    if (
      formData.oldPassword &&
      formData.newPassword &&
      formData.oldPassword ===
        formData.newPassword
    ) {

      newErrors.newPassword =
        "New password must be different from old password.";

    }


    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };


  // =========================================
  // SUBMIT
  // =========================================

  const handleSubmit = (e) => {

    e.preventDefault();


    setSuccessMessage("");


    if (!validateForm()) {

      return;

    }


    // =======================================
    // STATIC FRONTEND SUCCESS
    // =======================================

    console.log(
      "Change Password Data:",
      formData
    );


    setSuccessMessage(
      "Password changed successfully."
    );


    // Clear password fields

    setFormData((previous) => ({
      ...previous,

      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));

  };


  // =========================================
  // CANCEL
  // =========================================

  const handleCancel = () => {

    navigate(-1);

  };


  return (

    <div className="change-password-page">


      {/* =====================================
          PAGE HEADER
      ====================================== */}

      <div className="change-password-header">

        <div className="change-password-header-left">

          <button
            type="button"
            className="change-password-back-btn"
            onClick={handleCancel}
          >

            <FaArrowLeft />

          </button>


          <div>

            <h2>
              Change Password
            </h2>

            <p>
              Update your account password securely
            </p>

          </div>

        </div>


        <div className="change-password-security">

          <FaShieldAlt />

          <span>
            Secure Account
          </span>

        </div>

      </div>


      {/* =====================================
          CONTENT
      ====================================== */}

      <div className="change-password-content">


        {/* ===================================
            LEFT INFORMATION CARD
        ==================================== */}

        <div className="change-password-info-card">


          <div className="change-password-info-icon">

            <FaKey />

          </div>


          <h3>
            Keep Your Account Secure
          </h3>


          <p>
            Create a strong password to protect
            your MicroFinance account and
            financial information.
          </p>


          <div className="password-rules">


            <div className="password-rule">

              <FaCheckCircle />

              <span>
                Minimum 6 characters
              </span>

            </div>


            <div className="password-rule">

              <FaCheckCircle />

              <span>
                Use a combination of characters
              </span>

            </div>


            <div className="password-rule">

              <FaCheckCircle />

              <span>
                Don't reuse your old password
              </span>

            </div>


            <div className="password-rule">

              <FaCheckCircle />

              <span>
                Keep your password confidential
              </span>

            </div>


          </div>

        </div>


        {/* ===================================
            FORM CARD
        ==================================== */}

        <div className="change-password-form-card">


          <div className="change-password-form-title">

            <h3>
              Update Password
            </h3>

            <p>
              Enter your current and new password
            </p>

          </div>


          {/* =================================
              SUCCESS
          ================================== */}

          {successMessage && (

            <div className="change-password-success">

              <FaCheckCircle />

              <span>
                {successMessage}
              </span>

            </div>

          )}


          <form
            onSubmit={handleSubmit}
            noValidate
          >


            {/* ===============================
                EMAIL
            ================================ */}

            <div className="change-password-field">

              <label>
                Email Address
                <span>*</span>
              </label>


              <div
                className={`change-password-input-wrapper ${
                  errors.email
                    ? "input-error"
                    : ""
                }`}
              >

                <FaEnvelope
                  className="change-password-input-icon"
                />


                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                />

              </div>


              {errors.email && (

                <small className="change-password-error">
                  {errors.email}
                </small>

              )}

            </div>


            {/* ===============================
                OLD PASSWORD
            ================================ */}

            <div className="change-password-field">

              <label>
                Old Password
                <span>*</span>
              </label>


              <div
                className={`change-password-input-wrapper ${
                  errors.oldPassword
                    ? "input-error"
                    : ""
                }`}
              >

                <FaLock
                  className="change-password-input-icon"
                />


                <input
                  type={
                    showOldPassword
                      ? "text"
                      : "password"
                  }
                  name="oldPassword"
                  placeholder="Enter old password"
                  value={formData.oldPassword}
                  onChange={handleChange}
                />


                <button
                  type="button"
                  className="password-eye-btn"
                  onClick={() =>
                    setShowOldPassword(
                      !showOldPassword
                    )
                  }
                >

                  {showOldPassword
                    ? <FaEyeSlash />
                    : <FaEye />
                  }

                </button>

              </div>


              {errors.oldPassword && (

                <small className="change-password-error">
                  {errors.oldPassword}
                </small>

              )}

            </div>


            {/* ===============================
                NEW PASSWORD
            ================================ */}

            <div className="change-password-field">

              <label>
                New Password
                <span>*</span>
              </label>


              <div
                className={`change-password-input-wrapper ${
                  errors.newPassword
                    ? "input-error"
                    : ""
                }`}
              >

                <FaKey
                  className="change-password-input-icon"
                />


                <input
                  type={
                    showNewPassword
                      ? "text"
                      : "password"
                  }
                  name="newPassword"
                  placeholder="Enter new password"
                  value={formData.newPassword}
                  onChange={handleChange}
                />


                <button
                  type="button"
                  className="password-eye-btn"
                  onClick={() =>
                    setShowNewPassword(
                      !showNewPassword
                    )
                  }
                >

                  {showNewPassword
                    ? <FaEyeSlash />
                    : <FaEye />
                  }

                </button>

              </div>


              {errors.newPassword && (

                <small className="change-password-error">
                  {errors.newPassword}
                </small>

              )}

            </div>


            {/* ===============================
                CONFIRM PASSWORD
            ================================ */}

            <div className="change-password-field">

              <label>
                Confirm Password
                <span>*</span>
              </label>


              <div
                className={`change-password-input-wrapper ${
                  errors.confirmPassword
                    ? "input-error"
                    : ""
                }`}
              >

                <FaLock
                  className="change-password-input-icon"
                />


                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />


                <button
                  type="button"
                  className="password-eye-btn"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >

                  {showConfirmPassword
                    ? <FaEyeSlash />
                    : <FaEye />
                  }

                </button>

              </div>


              {errors.confirmPassword && (

                <small className="change-password-error">
                  {errors.confirmPassword}
                </small>

              )}

            </div>


            {/* =================================
                BUTTONS
            ================================== */}

            <div className="change-password-actions">


              <button
                type="button"
                className="change-password-cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>


              <button
                type="submit"
                className="change-password-submit"
              >

                <FaShieldAlt />

                Change Password

              </button>

            </div>


          </form>

        </div>

      </div>

    </div>

  );

};


export default ChangePassword;