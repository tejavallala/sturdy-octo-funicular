import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import { 
  FaGraduationCap,  
  FaBook, 
  FaHeadset, 
  FaCreditCard,
  FaUserCircle,
  FaSignOutAlt,
  FaUserTie,  
  FaClock, 
  FaShoppingCart,
  FaSpinner,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import '../CSS/PaidCourse.css';


const PaidCourse = () => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndCourses = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const storedUserName = localStorage.getItem('userName');

        if (!userId) {
          navigate('/login');
          return;
        }

        if (storedUserName) {
          setUserName(storedUserName);
        } else {
          // Fetch user data if name is not in storage
          const userResponse = await axios.get(
            `https://learning-managment-system-using-mern.onrender.com/userRoute/get-user/${userId}`
          );
          if (userResponse.data.success) {
            setUserName(userResponse.data.user.name);
            localStorage.setItem('userName', userResponse.data.user.name);
          }
        }

        // Fetch purchased courses
        const response = await axios.get(`https://learning-managment-system-using-mern.onrender.com/payment/purchased-courses/${userId}`);
        if (response.data.success) {
          setPurchasedCourses(response.data.courses);
        }
      } catch (err) {
        console.error("Error:", err);
        setError(err.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndCourses();
  }, [navigate]);

  const handleViewCourseClick = (courseId) => {
    navigate(`/course-content/${courseId}`);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <FaSpinner className="spinner-border text-primary" role="status" />
        <span className="ms-2">Loading your courses...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-5" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-primary">
        <h2 className="text-center">Welcome, {userName}</h2>
        <FaGraduationCap className="me-2" />
        My Learning Journey
      </h1>
      
      {purchasedCourses.length === 0 ? (
        <div className="text-center p-5 bg-light rounded empty-courses-container">
        <div className="stacked-text">
          <h4 className="primary-text">No courses purchased yet</h4>
          
        </div>
        <div className="stacked-text mt-4">
          <p className="primary-text text-muted">Start your learning journey by exploring our courses!</p>
        </div>
        <button 
          className="btn btn-primary mt-4 hover-effect"
          onClick={() => navigate('/view-courses')}
        >
          Browse Courses
        </button>
      </div>
      ) : (
        <div className="row g-4">
          {purchasedCourses.map((course) => (
            <div key={course._id} className="col-lg-4 col-md-6">
              <div className="card h-100 shadow-sm hover-effect">
                <img
                  src={course.imageUrl || 'https://via.placeholder.com/300x200?text=Course+Image'}
                  alt={course.CourseName}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                
                <div className="card-body">
                  <h5 className="card-title text-primary">{course.CourseName}</h5>
                  <p className="card-text text-muted small">
                    {course.CourseDescription?.substring(0, 100)}...
                  </p>
                  
                  <div className="d-flex align-items-center mb-3">
                    <FaUserTie className="text-secondary me-2" />
                    <span className="text-muted small">
                      {course.instructor?.name || 'Unknown Instructor'}
                    </span>
                  </div>
                  
                  <div className="d-flex align-items-center mb-3">
                    <FaClock className="text-secondary me-2" />
                    <span className="text-muted small">{course.duration}</span>
                  </div>
                </div>
                
                <div className="card-footer bg-transparent border-top-0">
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => handleViewCourseClick(course._id)}
                  >
                    Continue Learning
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Navbar = ({ userName,cartCount }) => {
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
const CombinedComponent = () => {
  const [userName, setUserName] = useState('');
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }

    // Fetch cart count if needed
    const fetchCartCount = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (userId) {
          const response = await axios.get(`https://learning-managment-system-using-mern.onrender.com/cart/count/${userId}`);
          setCartCount(response.data.count);
        }
      } catch (error) {
        console.error('Error fetching cart count:', error);
      }
    };

    fetchCartCount();
  }, []);

  return (
    <>
      <Navbar userName={userName} cartCount={cartCount} />
      <PaidCourse />
    </>
  );
};

export default CombinedComponent;