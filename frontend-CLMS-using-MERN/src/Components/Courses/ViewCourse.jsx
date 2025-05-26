import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  FaGraduationCap,
  FaRupeeSign,
  FaBook,
  FaHeadset,
  FaCreditCard,
  FaUserCircle,
  FaSignOutAlt,
  FaUserTie,
  FaClock,
  FaTag,
  FaList,
  FaShoppingCart,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import "../CSS/CourseList.css";

const Navbar = ({ userName, cartCount }) => {
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

function ViewCourse() {
  const [arr, setArr] = useState([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedName =
          localStorage.getItem("userName") ||
          sessionStorage.getItem("userName");
        if (storedName) {
          setUserName(storedName);
        }

        const response = await axios.get("https://learning-managment-system-using-mern.onrender.com/courseRoute");
        console.log("API Response:", response.data);

        if (response.data?.courses && Array.isArray(response.data.courses)) {
          const validCourses = response.data.courses.map((course) => ({
            ...course,
            instructor: course.instructor || {
              name: "Unknown Instructor",
              email: "Email not available",
            },
          }));
          setArr(validCourses);
        } else {
          throw new Error("Invalid data format received from server");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = async (courseId) => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("Please login to add courses to cart");
        navigate("/user-login"); // Add this line to redirect to login
        return;
      }

      // Get the course details from the array
      const course = arr.find((c) => c._id === courseId);
      if (!course) {
        throw new Error("Course not found");
      }

      const cartData = {
        courseId,
        userId,
        price: course.Price,
        instructorId: course.instructor._id,
      };

      const response = await axios.post(
        "https://learning-managment-system-using-mern.onrender.com/cartRoute/add-to-cart",
        cartData
      );

      if (response.data.success) {
        setCartCount(response.data.cartCount);
        alert("Course added to cart successfully");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      if (error.response?.status === 400) {
        alert(
          error.response.data.message ||
            "Course already in cart or invalid data"
        );
      } else {
        alert("Failed to add course to cart. Please try again.");
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">Error: {error}</div>;
  }

  return (
    <div className="course-page">
      <Navbar userName={userName} cartCount={cartCount} />
      <div className="container py-4">
        <h2 className="mb-4 text-primary fw-bold">Available Courses</h2>
        <div className="row g-4">
          {arr.map((course) => (
            <div key={course._id} className="col-md-6 mb-4">
              <div className="card shadow-lg hover-effect">
                <div className="position-relative">
                  <span className="position-absolute top-0 end-0 m-3 badge bg-primary rounded-pill">
                    <FaTag className="me-1" />
                    {course.category}
                  </span>
                </div>

                <div className="card-body">
                  <h5 className="card-title text-primary d-flex align-items-center mb-3">
                    <FaGraduationCap className="me-2" />
                    {course.CourseName}
                  </h5>

                  <div className="instructor-info mb-3 p-3 bg-light rounded">
                    <h6 className="text-primary mb-2 d-flex align-items-center">
                      <FaUserTie className="me-2" />
                      Instructor Details
                    </h6>
                    <div className="instructor-details">
                      <div className="d-flex align-items-center mb-1">
                        <span className="text-muted small me-2">Name:</span>
                        <span className="fw-medium">
                          {course.instructor?.name || "Unknown Instructor"}
                        </span>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="text-muted small me-2">Email:</span>
                        <span className="fw-medium">
                          {course.instructor?.email || "Email not available"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="card-text text-muted mb-3">
                    {course.CourseDescription.length > 120
                      ? `${course.CourseDescription.substring(0, 120)}...`
                      : course.CourseDescription}
                  </p>

                  <div className="course-meta bg-light p-3 rounded mb-3">
                    <div className="row g-2">
                      <div className="col-4 border-end">
                        <div className="d-flex align-items-center">
                          <FaClock className="text-primary me-2" />
                          <small>{course.duration}</small>
                        </div>
                      </div>
                      <div className="col-4 border-end">
                        <div className="d-flex align-items-center">
                          <FaList className="text-primary me-2" />
                          <small>{course.level}</small>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="d-flex align-items-center">
                          <FaRupeeSign className="text-primary me-2" />
                          <strong>₹{course.Price}</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                    onClick={() => handleAddToCart(course._id)}
                  >
                    <FaShoppingCart /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewCourse;
