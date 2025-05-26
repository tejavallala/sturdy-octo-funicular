import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../CSS/CourseAddForm.css";
import Axios from "axios";

const CourseAddForm = () => {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    CourseName: "",
    CourseDescription: "",
    Price: "",
    imageUrl: "",
    instructor: "", // Change this to store instructor ID instead of object
    instructorDetails: { // Store instructor details separately
      name: "",
      bio: "",
      email: "",
    },
    duration: "",
    level: "Beginner",
    category: "Programming",
    topics: [""],
    requirements: [""],
    learningOutcomes: [""],
    language: "English",
    startDate: "",
    endDate: "",
    enrollmentLimit: "",
    certificates: {
      available: false,
      type: "Completion",
    },
    isActive: false,
  });

  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await Axios.get(
          "https://learning-managment-system-using-mern.onrender.com/adminRoute/get-instructors"
        );

        // Check if the response has the instructors array in the correct format
        if (response.data && response.data.instructors) {
          setInstructors(response.data.instructors);
        } else {
          setError("Invalid instructor data format");
          setInstructors([]);
        }
      } catch (err) {
        console.error("Error fetching instructors:", err);
        setError("Failed to fetch instructors");
        setInstructors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (e, index, field) => {
    const newArray = [...courseData[field]];
    newArray[index] = e.target.value;
    setCourseData((prev) => ({
      ...prev,
      [field]: newArray,
    }));
  };

  const addArrayField = (field) => {
    setCourseData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayField = (index, field) => {
    setCourseData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleInstructorSelect = async (e) => {
    const instructorId = e.target.value;

    if (!instructorId) {
      setCourseData(prev => ({
        ...prev,
        instructor: "",
        instructorDetails: { name: "", bio: "", email: "" }
      }));
      return;
    }

    try {
      const response = await Axios.get(
        `https://learning-managment-system-using-mern.onrender.com/adminRoute/get-instructor/${instructorId}`
      );

      if (response.data && response.data.instructor) {
        const { name, email, bio } = response.data.instructor;
        setCourseData(prev => ({
          ...prev,
          instructor: instructorId, // Store the ID
          instructorDetails: { name, bio: bio || "", email } // Store details separately
        }));
      }
    } catch (err) {
      console.error("Error fetching instructor details:", err);
      setError("Failed to load instructor details");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    
    try {
      // Create a new object with the correct structure
      const submitData = {
        ...courseData,
        // Remove instructorDetails from the submission
        instructorDetails: undefined
      };

      const response = await Axios.post(
        "https://learning-managment-system-using-mern.onrender.com/courseRoute/create-course",
        submitData
      );
  
      if (response.data.success) {
        if (window.confirm("Course added successfully! Do you want to view the course list?")) {
          navigate("/course-list");
        } else {
          // Reset form for new entry
          setCourseData({
            CourseName: "",
            CourseDescription: "",
            Price: "",
            imageUrl: "",
            instructor: "",
            instructorDetails: { name: "", bio: "", email: "" },
            duration: "",
            level: "Beginner",
            category: "Programming",
            topics: [""],
            requirements: [""],
            learningOutcomes: [""],
            language: "English",
            startDate: "",
            endDate: "",
            enrollmentLimit: "",
            certificates: {
              available: false,
              type: "Completion",
            },
            isActive: false,
          });
        }
      }
    } catch (error) {
      console.error("Error adding course:", error);
      setError(error.response?.data?.message || "Failed to add course. Please try again.");
      
      // Show error alert
      alert("Error: " + (error.response?.data?.message || "Failed to add course. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="text-center p-5">Loading...</div>;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white p-4">
              <div className="d-flex justify-content-between align-items-center">
                <button
                  className="btn btn-light btn-sm"
                  onClick={() => navigate(-1)}
                >
                  <FaArrowLeft className="me-2" /> Back
                </button>
                <h3 className="mb-0">Add New Course</h3>
              </div>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                {/* Basic Information */}
                <h5 className="mb-3">Basic Information</h5>
                <div className="row mb-4">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Course Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="CourseName"
                      value={courseData.CourseName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      name="Price"
                      value={courseData.Price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                  <label className="form-label">Image URL</label>
                  <input type="text" className="form-control" name="imageUrl" value={courseData.imageUrl} onChange={handleChange} required />
                </div>
                </div>

                {/* Instructor Selection */}
                <div className="mb-4">
                  <label className="form-label">Select Instructor</label>
                  <select
                    className="form-select"
                    onChange={handleInstructorSelect}
                    required
                  >
                    <option value="">Choose an instructor</option>
                    {Array.isArray(instructors) &&
                      instructors.map((instructor) => (
                        <option key={instructor._id} value={instructor._id}>
                          {instructor.name || "Unnamed Instructor"}
                        </option>
                      ))}
                  </select>
                  {courseData.instructorDetails.name && (
                    <div className="mt-2 p-2 bg-light rounded">
                      <small className="d-block">
                        <strong>Selected Instructor:</strong>{" "}
                        {courseData.instructorDetails.name}
                      </small>
                      <small className="d-block">
                        <strong>Email:</strong> {courseData.instructorDetails.email}
                      </small>
                      {courseData.instructorDetails.bio && (
                        <small className="d-block">
                          <strong>Bio:</strong> {courseData.instructorDetails.bio}
                        </small>
                      )}
                    </div>
                  )}
                </div>

                {/* Course Details */}
                <div className="mb-4">
                  <label className="form-label">Course Description</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    name="CourseDescription"
                    value={courseData.CourseDescription}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <label className="form-label">Level</label>
                    <select
                      className="form-select"
                      name="level"
                      value={courseData.level}
                      onChange={handleChange}
                      required
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Category</label>
                    <select
                      className="form-select"
                      name="category"
                      value={courseData.category}
                      onChange={handleChange}
                      required
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

                {/* Duration and Language */}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <label className="form-label">Duration (e.g., "8 weeks")</label>
                    <input
                      type="text"
                      className="form-control"
                      name="duration"
                      value={courseData.duration}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Language</label>
                    <select
                      className="form-select"
                      name="language"
                      value={courseData.language}
                      onChange={handleChange}
                      required
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Chinese">Chinese</option>
                      <option value="Japanese">Japanese</option>
                    </select>
                  </div>
                </div>

                {/* Course Dates */}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <label className="form-label">Start Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="startDate"
                      value={courseData.startDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="endDate"
                      value={courseData.endDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Dynamic Arrays */}
                {["topics", "requirements", "learningOutcomes"].map((field) => (
                  <div key={field} className="mb-4">
                    <label className="form-label text-capitalize">
                      {field}
                    </label>
                    {courseData[field].map((item, index) => (
                      <div key={index} className="input-group mb-2">
                        <input
                          type="text"
                          className="form-control"
                          value={item}
                          onChange={(e) => handleArrayChange(e, index, field)}
                          required
                        />
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => removeArrayField(index, field)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => addArrayField(field)}
                    >
                      Add {field.slice(0, -1)}
                    </button>
                  </div>
                ))}

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Creating Course...
                    </>
                  ) : (
                    'Create Course'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseAddForm;
