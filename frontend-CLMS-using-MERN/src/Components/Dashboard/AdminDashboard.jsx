import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaSignOutAlt,
  FaChartLine,
  FaUserShield,
  FaBookReader,
  FaTools,
  FaClipboardList,
  FaUserCircle,
  FaListAlt,
  FaPlusCircle,
  FaDatabase,
} from "react-icons/fa";
import "../CSS/AdminDashboard.css";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  useEffect(() => {
    const storedName =
      localStorage.getItem("adminName") || sessionStorage.getItem("adminName");
    const storedId =
      localStorage.getItem("adminId") || sessionStorage.getItem("adminId");

    if (!storedId) {
      navigate("/admin");
      return;
    }

    setAdminName(storedName || "Admin");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/admin");
  };

  const adminActions = [
    {
      title: "Course Management",
      icon: FaBookReader,
      description: "Manage courses, curriculum, and content",
      actions: [
        "Add new courses",
        "Edit existing courses",
        "Monitor course progress",
      ],
    },
    {
      title: "User Management",
      icon: FaUsers,
      description: "Handle user accounts and permissions",
      actions: ["Manage students", "Manage instructors", "Handle user issues"],
    },
    {
      title: "System Settings",
      icon: FaTools,
      description: "Configure system preferences and settings",
      actions: [
        "Security settings",
        "Payment configuration",
        "Email templates",
      ],
    },
    {
      title: "Analytics & Reports",
      icon: FaChartLine,
      description: "View detailed analytics and generate reports",
      actions: ["Revenue reports", "User analytics", "Course statistics"],
    },
  ];

  const navItems = [
    {
      to: "/add-course",
      icon: FaPlusCircle,
      text: "Add Course",
    },
    {
      to: "/course-list",
      icon: FaListAlt,
      text: "Course List",
    },
    // Add new course content management link
    {
      to: "/manage-content",
      icon: FaBookReader,
      text: "Course Content",
    },
    {
      to: "/user-data",
      icon: FaDatabase,
      text: "User Data",
    },
  ];

  return (
    <div className="admin-dashboard bg-light min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/AdminDashboard">
            <FaUserShield className="me-2" />
            LearnHub Admin
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Add this new section for navigation items */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {navItems.map((item, index) => (
                <li className="nav-item" key={index}>
                  <Link
                    to={item.to}
                    className="nav-link d-flex align-items-center"
                    style={{ padding: "8px 16px" }}
                  >
                    <item.icon className="me-2" />
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Existing profile and notification section */}
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item dropdown">
                <div
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  style={{ cursor: "pointer" }}
                >
                  <FaUserCircle className="me-2" size={24} />
                  {adminName}
                </div>
                {showProfileDropdown && (
                  <div className="dropdown-menu show position-absolute">
                    <Link className="dropdown-item" to="/admin-profile">
                      <FaUserCircle className="me-2" /> Profile
                    </Link>
                    <div className="dropdown-divider"></div>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt className="me-2" /> Logout
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container py-4">
        {/* Admin Actions Section */}
        <div className="row g-4">
          {adminActions.map((action, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100 hover-card">
                <div className="card-body">
                  <div className="text-center mb-3">
                    <action.icon size={40} className="text-primary" />
                  </div>
                  <h5 className="card-title text-center mb-3">
                    {action.title}
                  </h5>
                  <p className="card-text text-muted">{action.description}</p>
                  <ul className="list-unstyled">
                    {action.actions.map((item, i) => (
                      <li key={i} className="mb-2">
                        <FaClipboardList className="text-primary me-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
