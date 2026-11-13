import React from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleSidebar, setSelectedSession } from "../store/slices/uiSlice";
import { logout } from "../store/slices/authSlice";

import {
  FaBars,
  FaBook,
  FaWallet,
  FaChartLine,
  FaPowerOff,
  FaShieldAlt,
} from "react-icons/fa";

import AdminProfile from "./AdminProfile/Adminprofile1";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { sidebarOpen, selectedSession } = useAppSelector((state) => state.ui);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };


  // ==========================================
  // SESSION OPTIONS
  // ==========================================

  const sessionOptions = [
    "2026-2027",
    "2025-2026",
    "2024-2025",
    "2023-2024",
    "2022-2023",
  ];




  return (

    <header
      className={`top-navbar ${sidebarOpen
        ? "sidebar-open"
        : "sidebar-close"
        }`}
    >

      {/* =====================================
          LEFT
      ===================================== */}

      <div className="navbar-left">

        <button
          className="menu-btn"
          onClick={() => dispatch(toggleSidebar())}
        >

          <FaBars />

        </button>

      </div>


      {/* =====================================
          RIGHT
      ===================================== */}

      <div className="navbar-right">


        {/* =====================================
            SESSION DROPDOWN
        ===================================== */}

        <div className="nav-box session-box">

          <FaShieldAlt />

          <span>
            SESSION :
          </span>

          <select
            value={selectedSession}
            onChange={(e) =>
              dispatch(setSelectedSession(e.target.value))
            }
            className="session-select"
          >

            {sessionOptions.map(
              (session) => (

                <option
                  key={session}
                  value={session}
                >
                  {session}
                </option>

              )
            )}

          </select>

        </div>


        {/* =====================================
            DAY BOOK
        ===================================== */}

        <NavLink
          to="/day-book"
          className="nav-box"
        >

          <FaBook />

          <span>
            DAY BOOK
          </span>

        </NavLink>


        {/* =====================================
            CASH BOOK
        ===================================== */}

        <NavLink
          to="/cash-book"
          className="nav-box"
        >

          <FaWallet />

          <span>
            CASH BOOK
          </span>

        </NavLink>


        {/* =====================================
            VOUCHER ENTRIES
        ===================================== */}

        <NavLink
          to="/voucher-entries"
          className="nav-box"
        >

          <FaChartLine />

          <span>
            VOUCHER ENTRIES
          </span>

        </NavLink>


        {/* =====================================
            ADMIN PROFILE
        ===================================== */}

        <AdminProfile />


        {/* =====================================
            LOGOUT
        ===================================== */}

        <button type="button" className="logout-btn" onClick={handleLogout}>

          <FaPowerOff />

        </button>

      </div>

    </header>
  );
};

export default Navbar;