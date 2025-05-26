import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import '../CSS/UserLogin.css';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / card.offsetWidth) * 100;
    const y = ((e.clientY - rect.top) / card.offsetHeight) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.post(
        "https://learning-managment-system-using-mern.onrender.com/userRoute/login",
        { email, password }
      );

      if (response.data.success) {
        const { user } = response.data;
        
        const storage = localStorage;
        storage.setItem('userId', user._id);
        storage.setItem('userName', user.name);
        storage.setItem('userEmail', user.email);

        showAlert("Login successful! Redirecting...", "success");
        
        // Add delay before navigation for alert to be visible
        setTimeout(() => {
          navigate("/Dashboard", { 
            state: { 
              userId: user._id,
              userName: user.name
            } 
          });
        }, 1500);
      }
    } catch (error) {
      console.error("Login error:", error);
      showAlert(error.response?.data?.message || "Invalid email or password", "error");
    }
  };

  return (
    <div className="login-container">
      {alert.show && (
        <div className={`alert-message alert-${alert.type}`}>
          {alert.message}
        </div>
      )}

      <div 
        className="login-card"
        onMouseMove={handleMouseMove}
      >
        <div className="shine-effect" />
        
        <div className="image-section">
          <img
            src="https://img.freepik.com/free-vector/learning-management-system-abstract-concept-illustration_335657-4808.jpg"
            alt="Learning Management System"
          />
        </div>

        <div className="form-section">
          <h2 className="text-white text-center mb-4">Welcome Back</h2>
          
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="email"
                className="floating-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                className="floating-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="remember-me">
              <label className="text-white">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <span className="ms-2">Remember me</span>
              </label>
            </div>

            <button type="submit" className="submit-button">
              Log In
            </button>

            <div className="links mt-4 text-center">
              <Link to="/user-registration" className="text-white d-block mb-2">
                Create an account
              </Link>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;