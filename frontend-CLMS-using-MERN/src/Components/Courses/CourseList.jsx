import React, { useState, useEffect,useCallback } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaExclamationTriangle } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../CSS/CourseList.css';
const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [editedCourse, setEditedCourse] = useState(null);
  const navigate = useNavigate();

  const fetchCourses = useCallback(async () => {
    try {
      const instructorId = localStorage.getItem('adminId') || sessionStorage.getItem('adminId');
      if (!instructorId) {
        navigate('/admin');
        return;
      }

      const response = await axios.get(`https://learning-managment-system-using-mern.onrender.com/courseRoute`, {
        params: { instructor: instructorId }
      });

      if (response.data?.courses) {
        const filteredCourses = response.data.courses.filter(
          course => course.instructor?._id === instructorId
        );
        setCourses(filteredCourses);

        if (filteredCourses.length === 0) {
          setError('No courses found');
        }
      } else {
        setError('No courses found');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Correct useEffect at the top level
  useEffect(() => {
    const instructorId = localStorage.getItem('adminId') || sessionStorage.getItem('adminId');
    if (!instructorId) {
      navigate('/admin');
      return;
    }
    fetchCourses();
  }, [navigate, fetchCourses]);

  // Handle edit course
  const handleEdit = (course) => {
    const instructorId = localStorage.getItem('adminId') || sessionStorage.getItem('adminId');
    
    if (course.instructor._id !== instructorId) {
      alert('You are not authorized to edit this course');
      return;
    }

    setSelectedCourse(course);
    setEditedCourse({ ...course });
    setShowModal(true);
  };

  // Handle delete course
  const handleDelete = async (courseId, instructorId) => {
    const currentInstructorId = localStorage.getItem('adminId') || sessionStorage.getItem('adminId');
    
    if (instructorId !== currentInstructorId) {
      alert('You are not authorized to delete this course');
      return;
    }

    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`https://learning-managment-system-using-mern.onrender.com/courseRoute/delete-course/${courseId}`);
        fetchCourses(); // Refresh the list
        alert('Course deleted successfully');
      } catch (error) {
        alert('Failed to delete course');
      }
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCourse(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle array field changes
  const handleArrayChange = (field, index, value) => {
    const updatedArray = [...editedCourse[field]];
    updatedArray[index] = value;
    setEditedCourse(prev => ({
      ...prev,
      [field]: updatedArray
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://learning-managment-system-using-mern.onrender.com/courseRoute/update-course/${selectedCourse._id}`, editedCourse);
      setShowModal(false);
      fetchCourses(); // Refresh the list
      alert('Course updated successfully');
    } catch (error) {
      alert('Failed to update course');
    }
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading your courses...</p>
        </div>
      </div>
    );
  }
  if (error) return <div className="text-center p-5 text-danger">{error}</div>;

  return (
    <div className="container py-5">
      <h2 className="mb-4">My Courses</h2>
      
      {courses.length === 0 && !loading && !error ? (
        <div className="text-center p-5" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
        <FaExclamationTriangle className="text-warning mb-4" size={50} />
        <h4 className="mb-3" style={{ color: '#343a40' }}>No courses found</h4>
        <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>You haven't created any courses yet.</p>
        <Button 
          variant="primary" 
          onClick={() => navigate('/add-course')}
          className="px-4 py-2"
          style={{ fontWeight: '500' }}
        >
          Create Your First Course
        </Button>
      </div>
      ) : (
        <div className="row">
          {courses.map(course => (
            <div key={course._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img 
                  src={course.imageUrl} 
                  className="card-img-top" 
                  alt={course.CourseName}
                  style={{ height: '200px', objectFit: 'cover' }}
                  
                />
                <div className="card-body">
                  <h5 className="card-title">{course.CourseName}</h5>
                  <p className="card-text">{course.CourseDescription.substring(0, 100)}...</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-primary">{course.category}</span>
                    <span className="text-muted">${course.Price}</span>
                  </div>
                </div>
                <div className="card-footer bg-white border-top-0">
                  <div className="d-flex justify-content-between">
                    <button 
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleEdit(course)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button 
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(course._id, course.instructor._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Course Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editedCourse && (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Course Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="CourseName"
                  value={editedCourse.CourseName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="CourseDescription"
                  value={editedCourse.CourseDescription}
                  onChange={handleInputChange}
                  rows="3"
                  required
                />
              </div>

              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="Price"
                    value={editedCourse.Price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col">
                  <label className="form-label">Duration</label>
                  <input
                    type="text"
                    className="form-control"
                    name="duration"
                    value={editedCourse.duration}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">Level</label>
                  <select
                    className="form-select"
                    name="level"
                    value={editedCourse.level}
                    onChange={handleInputChange}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div className="col">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    name="category"
                    value={editedCourse.category}
                    onChange={handleInputChange}
                  >
                    <option value="Programming">Programming</option>
                    <option value="Design">Design</option>
                    <option value="Business">Business</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Science">Science</option>
                    <option value="Languages">Languages</option>
                  </select>
                </div>
              </div>

              {/* Topics */}
              <div className="mb-3">
                <label className="form-label">Topics</label>
                {editedCourse.topics.map((topic, index) => (
                  <div key={index} className="input-group mb-2">
                    <input
                      type="text"
                      className="form-control"
                      value={topic}
                      onChange={(e) => handleArrayChange('topics', index, e.target.value)}
                    />
                  </div>
                ))}
              </div>

              <Button type="submit" variant="primary">Save Changes</Button>
            </form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CourseList;