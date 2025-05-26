import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import {
  FaGraduationCap,
  FaBook,
  FaHeadset,
  FaCreditCard,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const Navbar = ({ userName }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const navStyle = {
    backgroundColor: "#ffffff",
    padding: "15px 0",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  };

  const navItemStyle = {
    display: "flex",
    alignItems: "center",
    padding: "8px 15px",
    color: "#2c3e50",
    textDecoration: "none",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    margin: "0 5px",
  };

  const dropdownStyle = {
    position: "absolute",
    top: "100%",
    right: 0,
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    padding: "8px 0",
    minWidth: "200px",
    zIndex: 1001,
  };

  const dropdownItemStyle = {
    display: "flex",
    alignItems: "center",
    padding: "10px 20px",
    color: "#2c3e50",
    textDecoration: "none",
    transition: "background-color 0.3s",
    cursor: "pointer",
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <nav style={navStyle}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              <h3 className="mb-0 text-primary" style={{ fontWeight: "bold" }}>
                LearnHub
              </h3>
            </Link>
          </div>

          <div className="d-flex align-items-center">
            <Link
              to="/view-courses"
              className="nav-link"
              style={navItemStyle}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#e3f2fd";
                e.currentTarget.style.color = "#1976d2";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#2c3e50";
              }}
            >
              <FaBook className="me-2" /> View Courses
            </Link>

            <Link
              to="/registered-courses"
              className="nav-link"
              style={navItemStyle}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#e3f2fd";
                e.currentTarget.style.color = "#1976d2";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#2c3e50";
              }}
            >
              <FaGraduationCap className="me-2" /> Registered Courses
            </Link>

            <Link
              to="/my-courses"
              className="nav-link"
              style={navItemStyle}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#e3f2fd";
                e.currentTarget.style.color = "#1976d2";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#2c3e50";
              }}
            >
              <MdDashboard className="me-2" /> My Courses
            </Link>

            <Link
              to="/support"
              className="nav-link"
              style={navItemStyle}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#e3f2fd";
                e.currentTarget.style.color = "#1976d2";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#2c3e50";
              }}
            >
              <FaHeadset className="me-2" /> Support
            </Link>

            <Link
              to="/payments"
              className="nav-link"
              style={navItemStyle}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#e3f2fd";
                e.currentTarget.style.color = "#1976d2";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#2c3e50";
              }}
            >
              <FaCreditCard className="me-2" /> Payments
            </Link>

            <div className="position-relative">
              <div
                className="ms-3 px-3 py-2 bg-light rounded-pill"
                style={{ cursor: "pointer" }}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <span className="text-primary fw-bold d-flex align-items-center">
                  <FaUserCircle className="me-2" />
                  {userName || "User"} 👋
                </span>
              </div>

              {showDropdown && (
                <div style={dropdownStyle}>
                  <Link
                    to="/profile"
                    style={dropdownItemStyle}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#f8f9fa")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "transparent")
                    }
                  >
                    <FaUserCircle className="me-2" /> View Profile
                  </Link>
                  <div
                    style={dropdownItemStyle}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#f8f9fa")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "transparent")
                    }
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="me-2" /> Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
