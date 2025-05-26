import React, { useState, useEffect } from "react";
import { FaUserCircle, FaSignOutAlt, FaTools, FaCog } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBook,
  FaShoppingCart,
  FaHeadset,
  FaCreditCard,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import "../CSS/SupportForm.css";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate(); // Add this line
  const [userName, setUserName] = useState(() => {
    return (
      localStorage.getItem("userName") ||
      sessionStorage.getItem("userName") ||
      "User"
    );
  });


  useEffect(() => {
    const storedName =
      localStorage.getItem("userName") || sessionStorage.getItem("userName");
    if (storedName && storedName !== userName) {
      setUserName(storedName);
    }
  }, [userName]);

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
              to="/add-to-cart"
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
              <FaShoppingCart className="me-2" /> Cart
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
                    to={`/profile`}
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

const SupportForm = () => {
  return (
    <div style={styles.container}>
      <div style={styles.iconContainer}>
        <FaTools style={styles.mainIcon} />
        <FaCog style={{ ...styles.gearIcon, ...styles.gearLeft }} />
        <FaCog style={{ ...styles.gearIcon, ...styles.gearRight }} />
      </div>
      <h1 style={styles.text}>Under Construction</h1>
      <p style={styles.subtext}>
        We're working hard to bring you an amazing support experience. This
        feature will be available soon!
      </p>
      <Link
        to="/dashboard"
        style={styles.backButton}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#1565c0";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#1976d2";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        Return to Dashboard
      </Link>
    </div>
  );
};
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    textAlign: "center",
    padding: "20px",
  },
  iconContainer: {
    position: "relative",
    width: "120px",
    height: "120px",
    margin: "20px 0",
  },
  mainIcon: {
    fontSize: "5rem",
    color: "#1976d2",
    animation: "bounce 2s infinite",
  },
  gearIcon: {
    position: "absolute",
    fontSize: "2.5rem",
    color: "#64b5f6",
    animation: "spin 4s linear infinite",
  },
  gearLeft: {
    top: "10px",
    left: "-20px",
  },
  gearRight: {
    bottom: "10px",
    right: "-20px",
  },
  text: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#1976d2",
    marginBottom: "1rem",
  },
  subtext: {
    fontSize: "1.2rem",
    color: "#666",
    maxWidth: "600px",
    lineHeight: "1.6",
  },
  backButton: {
    marginTop: "2rem",
    padding: "12px 24px",
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textDecoration: "none",
    display: "inline-block",
  },
};

const CombinedComponent = () => {
  return (
    <>
      <Navbar />
      <SupportForm />
    </>
  );
};

export default CombinedComponent;
