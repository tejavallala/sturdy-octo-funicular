import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";
import { BiHome } from "react-icons/bi";
import { FaUserShield, FaLock, FaEnvelope } from "react-icons/fa";
import "../CSS/Admin.css";


const Admin = () => {
  const navigate = useNavigate();
  const [showInstructorForm, setShowInstructorForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Add instructor form states
  const [instructorData, setInstructorData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    qualifications: "",
    experience: "",
  });

  const handleInstructorDataChange = (e) => {
    setInstructorData({
      ...instructorData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateInstructor = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(
        "https://learning-managment-system-using-mern.onrender.com/adminRoute/create-instructor",
        instructorData
      );

      if (response.data.success) {
        alert("Instructor created successfully!");
        setShowInstructorForm(false);
        setInstructorData({
          name: "",
          email: "",
          password: "",
          specialization: "",
          qualifications: "",
          experience: "",
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error creating instructor");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await Axios.post(
        "https://learning-managment-system-using-mern.onrender.com/adminRoute/login",
        { email, password }
      );

      if (response.data.success) {
        // Store admin data
        localStorage.setItem("adminId", response.data.admin._id);
        localStorage.setItem("adminName", response.data.admin.name);
        navigate("/AdminDashboard");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error.response?.data?.message || "Server error. Please try again."
      );
    }
  };

  // Add mouse move effect for shine
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
    const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
    card.style.setProperty("--mouse-x", `${x}%`);
    card.style.setProperty("--mouse-y", `${y}%`);
  };

  return (
    <div className="login-container">
      <Link to="/" className="home-link">
        <BiHome size={24} />
        <span>Home</span>
      </Link>

      <div className="login-card" onMouseMove={handleMouseMove}>
        <div className="image-section">
          <img
            src="/images/AdminLogin.png"
            alt="Admin Dashboard"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "16px",
              filter: "brightness(0.9) contrast(1.1)",
            }}
          />
        </div>

        <div className="form-section">
          {!showInstructorForm ? (
            <>
              <div className="admin-header">
                <FaUserShield className="admin-icon" />
                <h2>Admin Portal</h2>
                <p>Access your administrative dashboard</p>
              </div>

              <form onSubmit={handleLogin}>
                <div className="input-group">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    className="floating-input"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <FaLock className="input-icon" />
                  <input
                    type="password"
                    className="floating-input"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>

                <button type="submit" className="submit-button">
                  Login to Dashboard
                </button>

                <div className="links">
                  <Link to="/instructor-registration">
                    Register as Instructor
                  </Link>
                </div>

                {error && (
                  <div className={`alert-message alert-error`}>{error}</div>
                )}
              </form>
            </>
          ) : (
            <div className="col-12">
              <h2 className="text-center mb-4">Create Instructor Account</h2>
              <form onSubmit={handleCreateInstructor}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      name="name"
                      value={instructorData.name}
                      onChange={handleInstructorDataChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      value={instructorData.email}
                      onChange={handleInstructorDataChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={instructorData.password}
                      onChange={handleInstructorDataChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Specialization"
                      name="specialization"
                      value={instructorData.specialization}
                      onChange={handleInstructorDataChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Qualifications"
                      name="qualifications"
                      value={instructorData.qualifications}
                      onChange={handleInstructorDataChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Years of Experience"
                      name="experience"
                      value={instructorData.experience}
                      onChange={handleInstructorDataChange}
                      required
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-3">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowInstructorForm(false)}
                  >
                    Back to Login
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Create Instructor
                  </button>
                </div>
                {error && (
                  <div className="text-danger mt-3 text-center">{error}</div>
                )}
              </form>
            </div>
          )}
        </div>
        <div className="shine-effect"></div>
      </div>
    </div>
  );
};

export default Admin;
