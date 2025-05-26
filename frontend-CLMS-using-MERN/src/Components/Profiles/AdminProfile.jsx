import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/AdminProfile.css'
import { FaUserShield, FaEnvelope, FaClock, FaArrowLeft } from 'react-icons/fa';

const AdminProfile = () => {
    const [adminData, setAdminData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const adminId = localStorage.getItem('adminId') || sessionStorage.getItem('adminId');
                if (!adminId) {
                    navigate('/admin');
                    return;
                }

                const response = await axios.get(`https://learning-managment-system-using-mern.onrender.com/adminRoute/profile/${adminId}`);
                if (response.data.success) {
                    setAdminData(response.data.admin);
                    setLoading(false);
                }
            } catch (err) {
                setError('Failed to fetch admin profile');
                setLoading(false);
            }
        };

        fetchAdminData();
    }, [navigate]);

    if (loading) return <div className="text-center p-5">Loading...</div>;
    if (error) return <div className="text-center p-5 text-danger">{error}</div>;

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card border-0 shadow-lg">
                        <div className="card-header bg-primary text-white p-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <button 
                                    className="btn btn-light btn-sm"
                                    onClick={() => navigate('/AdminDashboard')}
                                >
                                    <FaArrowLeft className="me-2" /> Back
                                </button>
                                <h4 className="mb-0">Instructor Profile</h4>
                            </div>
                        </div>
                        <div className="card-body p-4">
                            <div className="text-center mb-4">
                                <div className="avatar-circle mb-3">
                                    <FaUserShield size={50} className="text-primary" />
                                </div>
                                <h3>{adminData?.name}</h3>
                                <p className="text-muted mb-0">Instructor</p>
                            </div>

                            <div className="row g-4">
                                <div className="col-md-6">
                                    <div className="info-card p-3 bg-light rounded">
                                        <FaEnvelope className="text-primary mb-2" size={20} />
                                        <h6 className="text-muted mb-1">Email</h6>
                                        <p className="mb-0">{adminData?.email}</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="info-card p-3 bg-light rounded">
                                        <FaClock className="text-primary mb-2" size={20} />
                                        <h6 className="text-muted mb-1">Last Login</h6>
                                        <p className="mb-0">
                                            {new Date(adminData?.lastLogin).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;