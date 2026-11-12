import React, { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";

import {
  FaUserCircle,
  FaUser,
  FaCog,
  FaLock,
  FaSignOutAlt,
  FaChevronDown,
  FaBuilding,
  FaCalendarAlt,
} from "react-icons/fa";

import "./AdminProfile.css";


const AdminProfile = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [adminOpen, setAdminOpen] = useState(false);

  const adminRef = useRef(null);


  // =========================================
  // CLOSE WHEN CLICK OUTSIDE
  // =========================================

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        adminRef.current &&
        !adminRef.current.contains(event.target)
      ) {
        setAdminOpen(false);
      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);


  // =========================================
  // ADMIN CLICK
  // =========================================

  const handleAdminClick = () => {

    setAdminOpen((previous) => !previous);

  };


  // =========================================
  // PROFILE
  // =========================================

  const handleProfile = () => {

    setAdminOpen(false);

    navigate("/profile");

  };


  // =========================================
  // SETTINGS
  // =========================================

  const handleSettings = () => {

    setAdminOpen(false);

    navigate("/setting");

  };


  // =========================================
  // CHANGE PASSWORD
  // =========================================

  const handleChangePassword = () => {

    setAdminOpen(false);

    navigate("/change-password");

  };


  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = () => {

    setAdminOpen(false);

    dispatch(logout());

    navigate("/login");

  };


  return (

    <div
      className="admin-profile-wrapper"
      ref={adminRef}
    >

      {/* =====================================
          ADMIN BUTTON
      ====================================== */}

      <button
        type="button"
        className={`admin-profile-button ${
          adminOpen
            ? "admin-profile-button-active"
            : ""
        }`}
        onClick={handleAdminClick}
      >

        <FaUserCircle />

        <span>
          {(user?.name || user?.fullName || "ADMIN").toString().toUpperCase()}
        </span>

        <FaChevronDown
          className={`admin-profile-arrow ${
            adminOpen
              ? "admin-profile-arrow-open"
              : ""
          }`}
        />

      </button>


      {/* =====================================
          DROPDOWN
      ====================================== */}

      {adminOpen && (

        <div className="admin-profile-dropdown">


          {/* ===================================
              HEADER
          ==================================== */}

          <div className="admin-profile-top">

            <div className="admin-profile-avatar">

              <FaUser />

            </div>


            <div className="admin-profile-details">

              <h3>
                {(user?.name || user?.fullName || "ADMIN").toString().toUpperCase()}
              </h3>

              <p>
                {user?.role || user?.email || "Administrator"}
              </p>

            </div>

          </div>


          {/* ===================================
              ONLINE
          ==================================== */}

          <div className="admin-profile-online">

            <span className="admin-online-circle"></span>

            <span>
              Online
            </span>

            <small>
              Active now
            </small>

          </div>


          {/* ===================================
              INFORMATION
          ==================================== */}

          <div className="admin-profile-information">

            <div className="admin-information-item">

              <div className="admin-information-label">

                <FaBuilding />

                <span>
                  Branch
                </span>

              </div>

              <strong>
                Head Office
              </strong>

            </div>


            <div className="admin-information-item">

              <div className="admin-information-label">

                <FaCalendarAlt />

                <span>
                  Session
                </span>

              </div>

              <strong>
                2026-2027
              </strong>

            </div>

          </div>


          {/* ===================================
              MENU
          ==================================== */}

          <div className="admin-profile-menu">


            <button
              type="button"
              onClick={handleProfile}
            >

              <span className="admin-menu-icon admin-menu-profile">
                <FaUser />
              </span>

              <span className="admin-menu-content">

                <strong>
                  My Profile
                </strong>

                <small>
                  View your profile
                </small>

              </span>

            </button>


            <button
              type="button"
              onClick={handleSettings}
            >

              <span className="admin-menu-icon admin-menu-settings">
                <FaCog />
              </span>

              <span className="admin-menu-content">

                <strong>
                  Settings
                </strong>

                <small>
                  Manage account settings
                </small>

              </span>

            </button>


            <button
              type="button"
              onClick={handleChangePassword}
            >

              <span className="admin-menu-icon admin-menu-password">
                <FaLock />
              </span>

              <span className="admin-menu-content">

                <strong>
                  Change Password
                </strong>

                <small>
                  Update your password
                </small>

              </span>

            </button>

          </div>


          {/* ===================================
              LOGOUT
          ==================================== */}

          <button
            type="button"
            className="admin-profile-logout"
            onClick={handleLogout}
          >

            <FaSignOutAlt />

            <span>
              Sign Out
            </span>

          </button>

        </div>

      )}

    </div>

  );

};


export default AdminProfile;