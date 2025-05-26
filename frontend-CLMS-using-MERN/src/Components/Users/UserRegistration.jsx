import React, { useState } from "react";
import Axios from "axios";
import "../CSS/UserRegistration.css";

const NewUserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
  });
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Name validation
    if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
      isValid = false;
    } else {
      newErrors.name = "";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    } else {
      newErrors.email = "";
    }

    // Password validation
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    } else {
      newErrors.password = "";
    }

    // Phone number validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
      isValid = false;
    } else {
      newErrors.phoneNumber = "";
    }

    // Gender validation
    if (!gender) {
      newErrors.gender = "Please select a gender";
      isValid = false;
    } else {
      newErrors.gender = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await Axios.post(
        "https://learning-managment-system-using-mern.onrender.com/userRoute/create-user",
        { name, email, password, phoneNumber, gender }
      );

      if (response.data.success) {
        showAlert("Registration successful!", "success");
        // Clear form fields
        setName("");
        setEmail("");
        setPassword("");
        setPhoneNumber("");
        setGender("");
      }
    } catch (error) {
      showAlert(
        error.response?.data?.message || "Registration failed",
        "error"
      );
    }
  };

  return (
    <div className="registration-container">
      {alert.show && (
        <div className={`alert-message alert-${alert.type}`}>
          {alert.message}
        </div>
      )}

      <div className="registration-card">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              className="floating-input"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="input-container">
            <input
              type="email"
              className="floating-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="input-container">
            <input
              type="password"
              className="floating-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <div className="input-container">
            <input
              type="tel"
              className="floating-input"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
          </div>

          <div className="input-container">
            <select
              className="floating-input select-gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <div className="error-message">{errors.gender}</div>}
          </div>

          <button type="submit" className="submit-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewUserForm;
