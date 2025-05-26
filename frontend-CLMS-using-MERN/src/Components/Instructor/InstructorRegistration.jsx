import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { BiHome } from 'react-icons/bi';
import { FaChalkboardTeacher } from 'react-icons/fa';

const InstructorRegistration = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [instructorData, setInstructorData] = useState({
    name: '',
    email: '',
    password: '',
    specialization: '',
    qualifications: '',
    experience: '',
    bio: '',
    phoneNumber: ''
  });

  const handleChange = (e) => {
    setInstructorData({
      ...instructorData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(
        'https://learning-managment-system-using-mern.onrender.com/adminRoute/create-instructor',
        instructorData
      );

      if (response.data.success) {
        alert('Registration successful! Please wait for admin approval.');
        navigate('/admin');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error during registration');
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <Link to="/" className="home-link" style={{ textDecoration: 'none', color: '#333' }}>
        <div className="d-flex align-items-center p-3">
          <BiHome size={24} className="me-2" />
          <span className="fw-bold">Home</span>
        </div>
      </Link>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-lg border-0 rounded-lg">
              <div className="card-header bg-primary text-white text-center py-4">
                <FaChalkboardTeacher size={50} className="mb-3" />
                <h3 className="font-weight-light">Instructor Registration</h3>
              </div>
              <div className="card-body p-5">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <label className="small mb-1">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={instructorData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <label className="small mb-1">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={instructorData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <label className="small mb-1">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={instructorData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <label className="small mb-1">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="phoneNumber"
                        value={instructorData.phoneNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <label className="small mb-1">Specialization</label>
                      <input
                        type="text"
                        className="form-control"
                        name="specialization"
                        value={instructorData.specialization}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <label className="small mb-1">Years of Experience</label>
                      <input
                        type="number"
                        className="form-control"
                        name="experience"
                        value={instructorData.experience}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="small mb-1">Qualifications</label>
                    <textarea
                      className="form-control"
                      name="qualifications"
                      value={instructorData.qualifications}
                      onChange={handleChange}
                      rows="2"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="small mb-1">Bio</label>
                    <textarea
                      className="form-control"
                      name="bio"
                      value={instructorData.bio}
                      onChange={handleChange}
                      rows="3"
                      required
                    />
                  </div>

                  {error && (
                    <div className="alert alert-danger text-center mb-4">
                      {error}
                    </div>
                  )}

                  <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                    <Link to="/admin" className="btn btn-light">
                      Back to Login
                    </Link>
                    <button type="submit" className="btn btn-primary">
                      Register as Instructor
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-footer text-center py-3">
                <div className="small">
                  Already have an account? <Link to="/admin">Sign in</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorRegistration;