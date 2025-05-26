import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../CSS/UserProfile.css';
import { FaUser, FaEnvelope, FaPhone, FaVenusMars, FaClock, FaArrowLeft } from 'react-icons/fa';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const profileCardStyle = {
    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    borderRadius: '15px',
    border: 'none',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
  };

  const headerStyle = {
    color: '#2c3e50',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: '600',
    borderBottom: '2px solid #3498db',
    paddingBottom: '15px',
    marginBottom: '30px',
  };

  const infoContainerStyle = {
    background: '#ffffff',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '15px',
    transition: 'transform 0.2s',
    cursor: 'default',
    border: '1px solid #eee',
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
        if (!userId) {
          navigate('/user-login');
          return;
        }

        const response = await Axios.get(
          `https://learning-managment-system-using-mern.onrender.com/userRoute/get-user/${userId}`
        );

        if (response.data.success) {
          setUserData(response.data.user);
          // Store last login time
          const currentTime = new Date().toLocaleString();
          localStorage.setItem('lastLoginTime', currentTime);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card" style={profileCardStyle}>
        <div className="card-body p-5">
          <h2 className="text-center" style={headerStyle}>User Profile</h2>
          
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div style={infoContainerStyle} className="hover-effect">
                <div className="d-flex align-items-center">
                  <FaUser className="text-primary me-3" size={28} />
                  <div className="flex-grow-1">
                    <small className="text-muted" style={{ fontSize: '0.9rem' }}>Name</small>
                    <p className="mb-0" style={{ fontSize: '1.2rem', fontWeight: '600', color: '#2c3e50' }}>
                      {userData?.name}
                    </p>
                  </div>
                </div>
              </div>

              <div style={infoContainerStyle} className="hover-effect">
                <div className="d-flex align-items-center">
                  <FaEnvelope className="text-primary me-3" size={28} />
                  <div className="flex-grow-1">
                    <small className="text-muted" style={{ fontSize: '0.9rem' }}>Email</small>
                    <p className="mb-0" style={{ fontSize: '1.2rem', fontWeight: '600', color: '#2c3e50' }}>
                      {userData?.email}
                    </p>
                  </div>
                </div>
              </div>

              <div style={infoContainerStyle} className="hover-effect">
                <div className="d-flex align-items-center">
                  <FaPhone className="text-primary me-3" size={28} />
                  <div className="flex-grow-1">
                    <small className="text-muted" style={{ fontSize: '0.9rem' }}>Phone Number</small>
                    <p className="mb-0" style={{ fontSize: '1.2rem', fontWeight: '600', color: '#2c3e50' }}>
                      {userData?.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>

              <div style={infoContainerStyle} className="hover-effect">
                <div className="d-flex align-items-center">
                  <FaVenusMars className="text-primary me-3" size={28} />
                  <div className="flex-grow-1">
                    <small className="text-muted" style={{ fontSize: '0.9rem' }}>Gender</small>
                    <p className="mb-0" style={{ fontSize: '1.2rem', fontWeight: '600', color: '#2c3e50' }}>
                      {userData?.gender?.charAt(0).toUpperCase() + userData?.gender?.slice(1)}
                    </p>
                  </div>
                </div>
              </div>

              <div style={infoContainerStyle} className="hover-effect">
                <div className="d-flex align-items-center">
                  <FaClock className="text-primary me-3" size={28} />
                  <div className="flex-grow-1">
                    <small className="text-muted" style={{ fontSize: '0.9rem' }}>Last Login</small>
                    <p className="mb-0" style={{ fontSize: '1.2rem', fontWeight: '600', color: '#2c3e50' }}>
                      {localStorage.getItem('lastLoginTime') || 'First login'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/dashboard')}
              style={{
                padding: '12px 30px',
                borderRadius: '30px',
                fontWeight: '500',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <FaArrowLeft /> Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;