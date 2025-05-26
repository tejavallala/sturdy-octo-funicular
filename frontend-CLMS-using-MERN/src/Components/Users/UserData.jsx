import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaUser,
  FaCalendar,
  FaRupeeSign,
  FaBook,
  FaSearch,
  FaDownload,
  FaSync,
} from "react-icons/fa";
import "../CSS/UserData.css";

const UserData = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserPurchases = async () => {
      try {
        const instructorId = localStorage.getItem("adminId");
        if (!instructorId) {
          navigate("/admin");
          return;
        }

        const response = await axios.get(
          `https://learning-managment-system-using-mern.onrender.com/payment/instructor-purchases/${instructorId}`,
          {
            params: { 
              timestamp: Date.now(),
              instructorId
            },
            headers: {
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache',
              'Expires': '0',
            }
          }
        );

        if (response.data.success) {
          // Transform the nested courses data into flat purchase records
          const flattenedPurchases = response.data.purchases.flatMap(purchase => 
            purchase.courses.map(course => ({
              userDetails: {
                name: purchase.user.name,
                email: purchase.user.email,
                id: purchase.user._id
              },
              paymentDetails: {
                ...purchase.paymentDetails,
                amount: course.price
              },
              purchaseDate: purchase.purchaseDate,
              courseName: course.courseName, // This now comes directly from the transformed API response
              _id: purchase._id
            }))
          );

          const sortedPurchases = flattenedPurchases.sort((a, b) => 
            new Date(b.purchaseDate) - new Date(a.purchaseDate)
          );

          setPurchases(sortedPurchases);
          console.log("Transformed purchases:", sortedPurchases); // Debug log
        }
      } catch (err) {
        console.error("Error fetching purchases:", err);
        setError(err.response?.data?.message || "Failed to fetch purchase data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPurchases();

    const intervalId = setInterval(() => {
      handleRefresh();
    }, 30000);

    return () => clearInterval(intervalId);
  }, [navigate, refreshKey]);

  const handleRefresh = () => {
    setLoading(true);
    setRefreshKey(prevKey => prevKey + 1);
  };

  const filteredPurchases = purchases.filter((purchase) => {
    if (!purchase?.userDetails?.name || !purchase?.userDetails?.email || !purchase?.courseName) {
      return false;
    }
    
    const searchLower = searchTerm.toLowerCase();
    return (
      purchase.userDetails.name.toLowerCase().includes(searchLower) ||
      purchase.userDetails.email.toLowerCase().includes(searchLower) ||
      purchase.courseName.toLowerCase().includes(searchLower)
    );
  });

  const downloadCSV = () => {
    const headers = ["User Name", "Email", "Course", "Amount", "Purchase Date"];
    const data = filteredPurchases.map((p) => [
      p?.userDetails?.name || 'N/A',
      p?.userDetails?.email || 'N/A',
      p?.courseName || 'N/A',
      p?.paymentDetails?.amount || 0,
      p?.purchaseDate ? new Date(p.purchaseDate).toLocaleDateString() : 'N/A',
    ]);

    const csvContent = [
      headers.join(","),
      ...data.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "purchase-data.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (      
    <div className="user-data-container py-4">
      <div className="container">
        <div className="header-section mb-4">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="section-title">
                <FaUser className="me-2" />
                User Purchase Analytics
              </h2>
            </div>
            <div className="col-md-6">
              <div className="d-flex gap-3 justify-content-md-end">
                <button 
                  className="refresh-btn" 
                  onClick={handleRefresh}
                  disabled={loading}
                >
                  <FaSync className={loading ? 'spin' : ''} /> Refresh
                </button>
                <div className="search-box">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search users or courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="export-btn" onClick={downloadCSV}>
                  <FaDownload /> Export Data
                </button>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
            <p>Loading purchase data...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
          </div>
        ) : (
          <>
            <div className="stats-section mb-4">
              <div className="row">
                <div className="col-md-4">
                  <div className="stat-card">
                    <div className="stat-icon">
                      <FaUser />
                    </div>
                    <div className="stat-info">
                      <h3>{filteredPurchases.length}</h3>
                      <p>Total Purchases</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="stat-card">
                    <div className="stat-icon">
                      <FaRupeeSign />
                    </div>
                    <div className="stat-info">
                      <h3>
                        ₹
                        {filteredPurchases.reduce(
                          (sum, p) => sum + (p?.paymentDetails?.amount || 0),
                          0
                        )}
                      </h3>
                      <p>Total Revenue</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="stat-card">
                    <div className="stat-icon">
                      <FaBook />
                    </div>
                    <div className="stat-info">
                      <h3>
                        {new Set(
                          filteredPurchases
                            .map((p) => p?.courseName)
                            .filter(Boolean)
                        ).size}
                      </h3>
                      <p>Unique Courses Sold</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="purchases-grid">
              {filteredPurchases.map((purchase, index) => (
                <div key={`${purchase._id}-${index}`} className="purchase-card">
                  <div className="purchase-header">
                    <div className="user-info">
                      <div className="details">
                        <h4>{purchase?.userDetails?.name || 'Unknown User'}</h4>
                        <p>{purchase?.userDetails?.email || 'No email provided'}</p>
                      </div>
                    </div>
                    <div
                      className={`status-badge ${purchase?.paymentDetails?.status || 'unknown'}`}
                    >
                      {purchase?.paymentDetails?.status || 'unknown'}
                    </div>
                  </div>

                  <div className="purchase-body">
                    <div className="course-info">
                      <FaBook className="icon" />
                      <span>{purchase?.courseName || 'Unknown Course'}</span>
                    </div>
                    <div className="purchase-meta">
                      <div className="meta-item">
                        <FaCalendar className="icon" />
                        <span>
                          {purchase?.purchaseDate 
                            ? new Date(purchase.purchaseDate).toLocaleDateString() 
                            : 'Date not available'}
                        </span>
                      </div>
                      <div className="meta-item">
                        <FaRupeeSign className="icon" />
                        <span>{purchase?.paymentDetails?.amount || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPurchases.length === 0 && (
              <div className="empty-state">
                <FaBook className="empty-icon" />
                <h3>No Purchases Found</h3>
                <p>There are no purchases matching your search criteria.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserData;