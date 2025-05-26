import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  FaBook,
  FaShoppingCart,
  FaHeadset,
  FaCreditCard,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import axios from "axios";
import { FaTrash, FaRupeeSign } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import '../CSS/Cart.css'; 

//const stripePromise = loadStripe("your_publishable_key");

const Navbar = ({ userName, cartCount }) => {
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
              className="nav-link position-relative"
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
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                  <span className="visually-hidden">items in cart</span>
                </span>
              )}
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

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        setError("Please login to view your cart");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `https://learning-managment-system-using-mern.onrender.com/cartRoute/user-cart/${userId}`
      );

      if (response.data.success) {
        setCartItems(response.data.cartItems);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch cart items");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (cartItemId) => {
    try {
      const response = await axios.delete(
        `https://learning-managment-system-using-mern.onrender.com/cartRoute/remove-from-cart/${cartItemId}`
      );

      if (response.data.success) {
        fetchCartItems();
      }
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item from cart");
    }
  };

  const handleCheckout = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("Please login to proceed with checkout");
        navigate("/user-login");
        return;
      }

      const {
        data: { publishableKey },
      } = await axios.get("https://learning-managment-system-using-mern.onrender.com/payment/config");
      const stripe = await loadStripe(publishableKey);

      // Create checkout session
      const { data } = await axios.post(
        "https://learning-managment-system-using-mern.onrender.com/payment/create-checkout-session",
        {
          cartItems,
          userId,
          metadata: {
            userId,
            courses: cartItems.map((item) => item.course._id),
          },
        }
      );

      if (data.sessionId) {
        const result = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });

        if (result.error) {
          throw new Error(result.error.message);
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert(error.message || "Payment failed. Please try again.");
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <div className="cart-page">
      <Navbar
        userName={localStorage.getItem("userName")}
        cartCount={cartItems.length}
      />
      <div className="container py-4">
        <h2 className="mb-4 text-primary">
          Shopping Cart ({cartItems.length} items)
        </h2>

        {cartItems.length === 0 ? (
          <div className="text-center p-5 bg-light rounded empty-cart-container">
          <div className="stacked-text-container">
            <h4 className="stacked-heading primary">Your cart is empty</h4>
          </div>
          <div className="stacked-text-container mt-4">
            <p className="stacked-text primary text-muted">Browse our courses and add some to your cart!</p>
          </div>
          <Link to="/view-courses" className="btn btn-primary mt-4 hover-lift">
            Browse Courses
          </Link>
        </div>
        ) : (
          <>
            <div className="row">
              <div className="col-md-8">
                {cartItems.map((item) => (
                  <div key={item._id} className="card mb-3 shadow-sm">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h5 className="card-title">
                            {item.course.CourseName}
                          </h5>
                          <p className="text-muted mb-0">
                            Instructor: {item.instructor.name}
                          </p>
                          <p className="text-muted mb-1">
                            Email: {item.instructor.email}
                          </p>
                        </div>
                        <div className="text-end">
                          <h5 className="text-primary mb-2">
                            <FaRupeeSign className="me-1" />
                            {item.price}
                          </h5>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleRemoveFromCart(item._id)}
                          >
                            <FaTrash className="me-1" /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="col-md-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title mb-4">Order Summary</h5>
                    <div className="d-flex justify-content-between mb-3">
                      <span>Total Items:</span>
                      <span>{cartItems.length}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <span>Total Amount:</span>
                      <span className="text-primary fw-bold">
                        <FaRupeeSign className="me-1" />
                        {calculateTotal()}
                      </span>
                    </div>
                    <button
                      className="btn btn-primary w-100"
                      onClick={handleCheckout}
                      disabled={!cartItems.length}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default CartPage;
