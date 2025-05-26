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
import "../CSS/Userdashboard.css";

// Add these mock data arrays after the imports
const MOCK_IN_PROGRESS = [
  {
    _id: 1,
    title: "React.js Advanced Concepts",
    thumbnail: "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
    progress: 65,
  },
  {
    _id: 2,
    title: "Node.js for Beginners",
    thumbnail: "https://nodejs.org/static/images/logo-hexagon-card.png",
    progress: 32,
  },
  {
    _id: 3,
    title: "MongoDB Complete Guide",
    thumbnail:
      "https://webimages.mongodb.com/_com_assets/cms/kuzt9r42or1fxvlq2-Meta_Generic.png",
    progress: 89,
  },
];

const MOCK_TRENDING = [
  {
    _id: 1,
    title: "Machine Learning Basics",
    thumbnail:
      "https://www.tensorflow.org/static/site-assets/images/marketing/learn/learn-hero.svg",
    shortDescription: "Learn the fundamentals of ML and AI",
    price: 1999,
  },
  {
    _id: 2,
    title: "Web Development Bootcamp",
    thumbnail:
      "https://cdn.dribbble.com/users/1162077/screenshots/5403918/focus-animation.gif",
    shortDescription: "Full stack web development course",
    price: 2499,
  },
  {
    _id: 3,
    title: "Python Programming",
    thumbnail:
      "https://www.python.org/static/community_logos/python-logo-generic.svg",
    shortDescription: "Master Python programming language",
    price: 1499,
  },
  {
    _id: 4,
    title: "UI/UX Design",
    thumbnail:
      "data:image/png;base64,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",
    shortDescription: "Create beautiful user interfaces",
    price: 1799,
  },
];

const MOCK_RECENT = [
  {
    _id: 1,
    title: "JavaScript ES6+",
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
  },
  {
    _id: 2,
    title: "React Native Mobile Apps",
    thumbnail: "https://reactnative.dev/img/header_logo.svg",
  },
  {
    _id: 3,
    title: "Docker and Kubernetes",
    thumbnail:
      "data:image/png;base64,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",
  },
  {
    _id: 3,
    title: "Ansible",
    thumbnail:
      "data:image/png;base64,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",
  },
];

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
    navigate("/user-login");
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

// Update the Dashboard component
// Update the Dashboard component's state initialization
const Dashboard = () => {
  const [userName, setUserName] = useState(() => {
    return (
      localStorage.getItem("userName") ||
      sessionStorage.getItem("userName") ||
      "User"
    );
  });
  const [inProgressCourses] = useState(MOCK_IN_PROGRESS);
  const [trendingCourses] = useState(MOCK_TRENDING);
  const [recentlyViewed] = useState(MOCK_RECENT);
  
  useEffect(() => {
    const storedName =
      localStorage.getItem("userName") || sessionStorage.getItem("userName");
    if (storedName && storedName !== userName) {
      setUserName(storedName);
    }
  }, [userName]);

  return (
    <div className="dashboard-container">
      <Navbar userName={userName} />

      <div className="dashboard-content">
        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="container py-4">
            <h1>Welcome back, {userName}! 👋</h1>
            <p className="text-muted">
              Ready to continue your learning journey?
            </p>
          </div>
        </div>

        {/* Learning Progress Section */}
        <div className="container py-4">
          <div className="row">
            <div className="col-md-8">
              <div className="continue-learning card">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Continue Learning</h5>
                  <Link to="/my-courses" className="btn btn-light btn-sm">
                    View All
                  </Link>
                </div>
                <div className="card-body">
                  {inProgressCourses.length === 0 ? (
                    <div className="text-center py-4">
                      <img
                        src="/images/empty-courses.svg"
                        alt="No courses"
                        style={{ width: "150px" }}
                      />
                      <p className="mt-3">
                        You haven't started any courses yet.
                      </p>
                      <Link to="/view-courses" className="btn btn-primary">
                        Browse Courses
                      </Link>
                    </div>
                  ) : (
                    <div className="progress-courses">
                      {inProgressCourses.map((course) => (
                        <div key={course._id} className="course-progress-card">
                          <div className="d-flex align-items-center">
                            <img
                              src={course.thumbnail}
                              alt={course.title}
                              className="course-thumb"
                            />
                            <div className="ms-3">
                              <h6>{course.title}</h6>
                              <div
                                className="progress"
                                style={{ height: "8px" }}
                              >
                                <div
                                  className="progress-bar"
                                  style={{ width: `${course.progress}%` }}
                                  role="progressbar"
                                ></div>
                              </div>
                              <small className="text-muted">
                                {course.progress}% Complete
                              </small>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="learning-stats card">
                <div className="card-body">
                  <h5>Your Learning Stats</h5>
                  <div className="stats-grid">
                    <div className="stat-item">
                      <h3>{inProgressCourses.length}</h3>
                      <p>Courses in Progress</p>
                    </div>
                    <div className="stat-item">
                      <h3>
                        {Math.round(
                          inProgressCourses.reduce(
                            (acc, curr) => acc + curr.progress,
                            0
                          ) / inProgressCourses.length || 0
                        )}
                        %
                      </h3>
                      <p>Average Progress</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trending Courses Section */}
        <div className="container py-4">
          <div className="trending-section">
            <h4>Trending Courses</h4>
            <div className="row">
              {trendingCourses.map((course) => (
                <div key={course._id} className="col-md-3">
                  <div className="trending-card card h-100">
                    <img
                      src={course.thumbnail}
                      className="card-img-top"
                      alt={course.title}
                    />
                    <div className="card-body">
                      <h6 className="card-title">{course.title}</h6>
                      <p className="card-text small">
                        {course.shortDescription}
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-primary">₹{course.price}</span>
                        <Link
                          to="/view-courses"
                          className="btn btn-outline-primary btn-sm"
                        >
                          Learn More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recently Viewed Section */}
        <div className="container py-4">
          <div className="recent-section">
            <h4>Recently Viewed</h4>
            <div className="recent-scroll">
              {recentlyViewed.map((course) => (
                <div key={course._id} className="recent-card">
                  <img src={course.thumbnail} alt={course.title} />
                  <div className="recent-info">
                    <h6>{course.title}</h6>
                    <Link to="/my-courses">Resume</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Learning Path Section */}
        <div className="container py-4">
          <div className="learning-path-section mb-4">
            <h4>Recommended Learning Path</h4>
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <div className="path-icon me-3">
                    <i className="fas fa-road fs-2 text-primary"></i>
                  </div>
                  <div>
                    <h5 className="mb-1">Full Stack Development Path</h5>
                    <p className="text-muted mb-0">
                      Estimated completion: 6 months
                    </p>
                  </div>
                </div>
                <div className="path-milestones">
                  <div className="milestone completed">
                    <span className="milestone-marker">✓</span>
                    HTML & CSS Basics
                  </div>
                  <div className="milestone completed">
                    <span className="milestone-marker">✓</span>
                    JavaScript Fundamentals
                  </div>
                  <div className="milestone active">
                    <span className="milestone-marker">→</span>
                    React.js
                  </div>
                  <div className="milestone">
                    <span className="milestone-marker">○</span>
                    Node.js & Express
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="achievements-section mb-4">
            <h4>Your Achievements</h4>
            <div className="row g-3">
              <div className="col-md-3">
                <div className="achievement-card">
                  <div className="achievement-icon gold">🏆</div>
                  <h6>Quick Learner</h6>
                  <p>Completed 5 courses</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="achievement-card">
                  <div className="achievement-icon silver">⭐</div>
                  <h6>Consistent</h6>
                  <p>7 day streak</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="achievement-card">
                  <div className="achievement-icon bronze">🎯</div>
                  <h6>Focus Master</h6>
                  <p>3hr session completed</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="achievement-card locked">
                  <div className="achievement-icon">🔒</div>
                  <h6>Expert</h6>
                  <p>Complete 10 courses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
