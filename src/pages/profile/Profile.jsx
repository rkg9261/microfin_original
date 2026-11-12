import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaUserShield,
  FaCamera,
  FaEdit,
  FaLock,
  FaArrowLeft,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";

import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // =========================================
  // PROFILE DATA
  // =========================================

  const [profile, setProfile] = useState({
    name: "ADMIN",
    email: "admin@microfinance.com",
    mobile: "9876543210",
    role: "Administrator",
    branch: "Head Office",
  });

  // =========================================
  // PROFILE IMAGE
  // =========================================

  const [profileImage, setProfileImage] = useState(null);

  // =========================================
  // EDIT POPUP
  // =========================================

  const [editMode, setEditMode] = useState(false);

  // =========================================
  // TEMP PROFILE DATA
  // Used while popup is open
  // =========================================

  const [editProfile, setEditProfile] = useState(profile);

  // =========================================
  // SUCCESS MESSAGE
  // =========================================

  const [saved, setSaved] = useState(false);

  // =========================================
  // OPEN EDIT POPUP
  // =========================================

  const handleEditProfile = () => {
    setEditProfile(profile);
    setEditMode(true);
  };

  // =========================================
  // CLOSE EDIT POPUP
  // =========================================

  const handleCloseEdit = () => {
    setEditProfile(profile);
    setEditMode(false);
  };

  // =========================================
  // INPUT CHANGE
  // =========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================================
  // PROFILE IMAGE CHANGE
  // =========================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setProfileImage(imageUrl);
  };

  // =========================================
  // SAVE PROFILE
  // =========================================

  const handleSave = () => {
    setProfile(editProfile);

    setEditMode(false);

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  // =========================================
  // CHANGE PASSWORD
  // =========================================

  const handleChangePassword = () => {
    setEditMode(false);

    navigate("/change-password");
  };

  // =========================================
  // CLOSE POPUP ON BACKDROP
  // =========================================

  const handlePopupBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseEdit();
    }
  };

  return (
    <div className="profile-page">

      {/* =====================================
          PAGE HEADER
      ====================================== */}

      <div className="profile-page-header">

        <div className="profile-header-left">

          <button
            type="button"
            className="profile-back-btn"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
          </button>

          <div>
            <h2>My Profile</h2>

            <p>
              Manage your personal account information
            </p>
          </div>

        </div>

        <div className="profile-security-badge">
          <FaUserShield />

          <span>
            Administrator Account
          </span>
        </div>

      </div>


      {/* =====================================
          SUCCESS MESSAGE
      ====================================== */}

      {saved && (
        <div className="profile-success">

          <FaCheckCircle />

          <span>
            Profile updated successfully.
          </span>

        </div>
      )}


      {/* =====================================
          PROFILE CONTENT
      ====================================== */}

      <div className="profile-content">

        <div className="profile-main-card">

          {/* =================================
              COVER
          ================================== */}

          <div className="profile-cover">

            <div className="profile-cover-pattern"></div>

          </div>


          {/* =================================
              PROFILE IMAGE
          ================================== */}

          <div className="profile-image-section">

            <div className="profile-image-wrapper">

              {profileImage ? (

                <img
                  src={profileImage}
                  alt="Profile"
                  className="profile-image"
                />

              ) : (

                <div className="profile-default-image">
                  <FaUser />
                </div>

              )}

            </div>


            <div className="profile-name-section">

              <h3>
                {profile.name}
              </h3>

              <p>
                {profile.role}
              </p>

            </div>

          </div>


          {/* =================================
              PROFILE ACTION
          ================================== */}

          <div className="profile-card-action">

            <button
              type="button"
              className="profile-edit-btn"
              onClick={handleEditProfile}
            >

              <FaEdit />

              Edit Profile

            </button>

          </div>


          {/* =================================
              PROFILE INFORMATION
          ================================== */}

          <div className="profile-information">

            {/* EMAIL */}

            <div className="profile-information-card">

              <div className="profile-information-icon profile-email-icon">
                <FaEnvelope />
              </div>

              <div>

                <span>
                  Email Address
                </span>

                <strong>
                  {profile.email}
                </strong>

              </div>

            </div>


            {/* MOBILE */}

            <div className="profile-information-card">

              <div className="profile-information-icon profile-phone-icon">
                <FaPhone />
              </div>

              <div>

                <span>
                  Mobile Number
                </span>

                <strong>
                  {profile.mobile}
                </strong>

              </div>

            </div>


            {/* ROLE */}

            <div className="profile-information-card">

              <div className="profile-information-icon profile-role-icon">
                <FaUserShield />
              </div>

              <div>

                <span>
                  Account Role
                </span>

                <strong>
                  {profile.role}
                </strong>

              </div>

            </div>


            {/* BRANCH */}

            <div className="profile-information-card">

              <div className="profile-information-icon profile-branch-icon">
                <FaBuilding />
              </div>

              <div>

                <span>
                  Branch
                </span>

                <strong>
                  {profile.branch}
                </strong>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =================================================
          EDIT PROFILE POPUP
      ================================================= */}

      {editMode && (

        <div
          className="profile-modal-overlay"
          onMouseDown={handlePopupBackgroundClick}
        >

          <div
            className="profile-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >

            {/* =========================================
                POPUP HEADER
            ========================================== */}

            <div className="profile-modal-header">

              <div>

                <h3>
                  Edit Profile
                </h3>

                <p>
                  Update your personal information
                </p>

              </div>


              <button
                type="button"
                className="profile-modal-close"
                onClick={handleCloseEdit}
              >

                <FaTimes />

              </button>

            </div>


            {/* =========================================
                POPUP BODY
            ========================================== */}

            <div className="profile-modal-body">


              {/* PROFILE IMAGE */}

              <div className="profile-modal-image-area">

                <div className="profile-modal-image-wrapper">

                  {profileImage ? (

                    <img
                      src={profileImage}
                      alt="Profile"
                      className="profile-modal-image"
                    />

                  ) : (

                    <div className="profile-modal-default-image">
                      <FaUser />
                    </div>

                  )}


                  <button
                    type="button"
                    className="profile-modal-camera"
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                  >

                    <FaCamera />

                  </button>

                </div>


                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />

                <div>

                  <strong>
                    Profile Photo
                  </strong>

                  <p>
                    Click the camera icon to change
                  </p>

                </div>

              </div>


              {/* =====================================
                  NAME
              ====================================== */}

              <div className="profile-modal-field">

                <label>
                  Full Name
                </label>

                <div className="profile-modal-input">

                  <FaUser />

                  <input
                    type="text"
                    name="name"
                    value={editProfile.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />

                </div>

              </div>


              {/* =====================================
                  EMAIL
              ====================================== */}

              <div className="profile-modal-field">

                <label>
                  Email Address
                </label>

                <div className="profile-modal-input">

                  <FaEnvelope />

                  <input
                    type="email"
                    name="email"
                    value={editProfile.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                  />

                </div>

              </div>


              {/* =====================================
                  MOBILE
              ====================================== */}

              <div className="profile-modal-field">

                <label>
                  Mobile Number
                </label>

                <div className="profile-modal-input">

                  <FaPhone />

                  <input
                    type="tel"
                    name="mobile"
                    value={editProfile.mobile}
                    onChange={handleChange}
                    maxLength="10"
                    placeholder="Enter mobile number"
                  />

                </div>

              </div>


              {/* =====================================
                  ROLE
              ====================================== */}

              <div className="profile-modal-field">

                <label>
                  Account Role
                </label>

                <div className="profile-modal-input">

                  <FaUserShield />

                  <input
                    type="text"
                    value={editProfile.role}
                    disabled
                  />

                </div>

              </div>


              {/* =====================================
                  BRANCH
              ====================================== */}

              <div className="profile-modal-field">

                <label>
                  Branch
                </label>

                <div className="profile-modal-input">

                  <FaBuilding />

                  <input
                    type="text"
                    value={editProfile.branch}
                    disabled
                  />

                </div>

              </div>


              {/* =====================================
                  CHANGE PASSWORD
              ====================================== */}

              <button
                type="button"
                className="profile-modal-password"
                onClick={handleChangePassword}
              >

                <FaLock />

                Change Password

              </button>

            </div>


            {/* =========================================
                POPUP FOOTER
            ========================================== */}

            <div className="profile-modal-footer">

              <button
                type="button"
                className="profile-modal-cancel"
                onClick={handleCloseEdit}
              >
                Cancel
              </button>


              <button
                type="button"
                className="profile-modal-save"
                onClick={handleSave}
              >

                <FaCheckCircle />

                Save Changes

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Profile;