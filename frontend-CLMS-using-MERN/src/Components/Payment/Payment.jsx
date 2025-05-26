import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import {
  FaCheckCircle,
  FaClock,
  FaBook,
  FaRupeeSign,
  FaRegCalendarAlt,
  FaCreditCard,
  FaDownload,
  FaUserCircle,
  FaSignOutAlt,
  FaShoppingCart,
  FaHeadset,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

import "../CSS/Payment.css";

// First, import the Navbar component
const Navbar = ({ userName }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate(); // Add this line

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

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (location.state?.userName) {
          setUserName(location.state.userName);
          return;
        }

        const userId =
          localStorage.getItem("userId") || sessionStorage.getItem("userId");
        const storedName =
          localStorage.getItem("userName") ||
          sessionStorage.getItem("userName");

        if (userId && !storedName) {
          const response = await axios.get(
            `https://learning-managment-system-using-mern.onrender.com/userRoute/get-user/${userId}`
          );

          if (response.data.success) {
            const { name } = response.data.user;
            setUserName(name);
            const storage = localStorage.getItem("userId")
              ? localStorage
              : sessionStorage;
            storage.setItem("userName", name);
          }
        } else if (storedName) {
          setUserName(storedName);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    };

    fetchUserData();
    fetchPaymentHistory();
  }, [location, navigate]);

  const fetchPaymentHistory = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(
        `https://learning-managment-system-using-mern.onrender.com/payment/history/${userId}`
      );
      if (response.data.success) {
        setPayments(response.data.payments);
      }
    } catch (error) {
      console.error("Error fetching payment history:", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadInvoice = async (paymentId) => {
    try {
      const response = await axios.get(
        `https://learning-managment-system-using-mern.onrender.com/payment/invoice/${paymentId}`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice-${paymentId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading invoice:", error);
    }
  };

  const getFilteredPayments = () => {
    if (filter === "all") return payments;

    const now = new Date();
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));

    return payments.filter((payment) => {
      const paymentDate = new Date(payment.purchaseDate);
      return filter === "recent"
        ? paymentDate >= thirtyDaysAgo
        : paymentDate < thirtyDaysAgo;
    });
  };

  if (loading) {
    return (
      <div className="payment-loader">
        <div className="spinner-grow text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar userName={userName} />
      <div className="payment-container">
        <div className="payment-header">
          <h2>Payment History</h2>
          <div className="filter-controls">
            <select
              className="form-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Payments</option>
              <option value="recent">Last 30 Days</option>
              <option value="older">Older</option>
            </select>
          </div>
        </div>

        {payments.length === 0 ? (
          <div className="no-payments">
            <FaClock size={48} />
            <h3>No Payment History</h3>
            <p>You haven't made any payments yet.</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/view-courses")}
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="payment-grid">
            {getFilteredPayments().map((payment) => (
              <div key={payment._id} className="payment-card">
                <div className="payment-status">
                  <FaCheckCircle className="text-success" />
                  <span className="status-badge success">
                    Payment Successful
                  </span>
                </div>

                <div className="payment-content">
                  <div className="courses-purchased">
                    {payment.courses.map((course) => (
                      <div key={course._id} className="course-item">
                        <FaBook className="course-icon" />
                        <span>{course.courseName}</span>
                      </div>
                    ))}
                  </div>

                  <div className="payment-info">
                    <div className="amount-info">
                      <FaRupeeSign />
                      <span className="amount">
                        {payment.paymentDetails.amount}
                      </span>
                    </div>

                    <div className="date-info">
                      <FaRegCalendarAlt />
                      <span>
                        {new Date(payment.purchaseDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    </div>

                    <div className="payment-method">
                      <FaCreditCard />
                      <span>{payment.paymentDetails.paymentMethod}</span>
                    </div>
                  </div>

                  <div className="payment-actions">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => downloadInvoice(payment._id)}
                    >
                      <FaDownload className="me-2" />
                      Download Invoice
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
