import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FaVideo,
  FaFileAlt,
  FaQuestionCircle,

  FaPlus,
  FaTrash,
  FaEdit
} from 'react-icons/fa';
import '../CSS/CourseContentManager.css'

const CourseContentManager = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [contentType, setContentType] = useState('video');
  const [content, setContent] = useState({
    title: '',
    description: '',
    url: '',
    duration: '',
    order: 1
  });
  const [quizQuestions, setQuizQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctAnswer: 0 }
  ]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [courseContent, setCourseContent] = useState([]);
  const [editingContent, setEditingContent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstructorCourses = async () => {
      try {
        const instructorId = localStorage.getItem('adminId');
        if (!instructorId) {
          navigate('/admin');
          return;
        }

        const response = await axios.get(`https://learning-managment-system-using-mern.onrender.com/courseRoute/instructor-courses/${instructorId}`);
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchInstructorCourses();
  }, [navigate]);

  useEffect(() => {
    if (selectedCourse?._id) {
      fetchCourseContent(selectedCourse._id);
    }
  }, [selectedCourse]);

  const fetchCourseContent = async (courseId) => {
    try {
      const response = await axios.get(`https://learning-managment-system-using-mern.onrender.com/courseRoute/content/${courseId}`);
      if (response.data.success) {
        setCourseContent(response.data.content);
      }
    } catch (error) {
      console.error('Error fetching course content:', error);
    }
  };

  const handleContentSubmit = async (e) => {
    e.preventDefault();
    try {
      const instructorId = localStorage.getItem('adminId');
      const formData = new FormData();

      // Add common fields
      formData.append('type', contentType);
      formData.append('title', content.title);
      formData.append('description', content.description);
      formData.append('instructorId', instructorId);

      // Add type-specific data
      switch (contentType) {
        case 'video':
          formData.append('url', content.url);
          formData.append('duration', content.duration);
          break;
        case 'document':
          formData.append('file', selectedFile);
          break;
        case 'quiz':
          formData.append('questions', JSON.stringify(quizQuestions));
          break;
        default:
          console.warn(`Unhandled content type: ${contentType}`);
      }


      const endpoint = editingContent
        ? `https://learning-managment-system-using-mern.onrender.com/courseRoute/update-content/${editingContent._id}`
        : `https://learning-managment-system-using-mern.onrender.com/courseRoute/add-content/${selectedCourse._id}`;

      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        alert(editingContent ? 'Content updated successfully!' : 'Content added successfully!');
        fetchCourseContent(selectedCourse._id);
        setEditingContent(null);
        resetForm();
      }
    } catch (error) {
      console.error('Error managing content:', error);
      alert('Operation failed');
    }
  };

  const resetForm = () => {
    setContent({
      title: '',
      description: '',
      url: '',
      duration: '',
      order: 1
    });
    setSelectedFile(null);
    setQuizQuestions([{ question: '', options: ['', '', '', ''], correctAnswer: 0 }]);
  };

  const renderContentTypeFields = () => {
    switch (contentType) {
      case 'video':
        return (
          <>
            <div className="mb-3">
              <label className="form-label">Video Title</label>
              <input
                type="text"
                className="form-control"
                value={content.title}
                onChange={(e) => setContent({ ...content, title: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Video URL (YouTube/Vimeo)</label>
              <input
                type="url"
                className="form-control"
                value={content.url}
                onChange={(e) => setContent({ ...content, url: e.target.value })}
                placeholder="https://..."
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Video Description</label>
              <textarea
                className="form-control"
                value={content.description}
                onChange={(e) => setContent({ ...content, description: e.target.value })}
                rows="3"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Duration (minutes)</label>
              <input
                type="number"
                className="form-control"
                value={content.duration}
                onChange={(e) => setContent({ ...content, duration: e.target.value })}
                required
              />
            </div>
          </>
        );

      case 'document':
        return (
          <>
            <div className="mb-3">
              <label className="form-label">Document Title</label>
              <input
                type="text"
                className="form-control"
                value={content.title}
                onChange={(e) => setContent({ ...content, title: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Upload Document</label>
              <input
                type="file"
                className="form-control"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                required
              />
              <small className="text-muted">
                Supported formats: PDF, DOC, DOCX, PPT, PPTX
              </small>
            </div>
            <div className="mb-3">
              <label className="form-label">Document Description</label>
              <textarea
                className="form-control"
                value={content.description}
                onChange={(e) => setContent({ ...content, description: e.target.value })}
                rows="3"
              />
            </div>
          </>
        );

      case 'quiz':
        return (
          <>
            <div className="mb-3">
              <label className="form-label">Quiz Title</label>
              <input
                type="text"
                className="form-control"
                value={content.title}
                onChange={(e) => setContent({ ...content, title: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Quiz Description</label>
              <textarea
                className="form-control"
                value={content.description}
                onChange={(e) => setContent({ ...content, description: e.target.value })}
                rows="2"
              />
            </div>
            <div className="mb-3">
              <label className="form-label d-flex justify-content-between">
                Questions
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setQuizQuestions([...quizQuestions,
                  { question: '', options: ['', '', '', ''], correctAnswer: 0 }
                  ])}
                >
                  <FaPlus /> Add Question
                </button>
              </label>
              {quizQuestions.map((q, qIndex) => (
                <div key={qIndex} className="card mb-3 border-light">
                  <div className="card-body">
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Question"
                        value={q.question}
                        onChange={(e) => {
                          const newQuestions = [...quizQuestions];
                          newQuestions[qIndex].question = e.target.value;
                          setQuizQuestions(newQuestions);
                        }}
                        required
                      />
                    </div>
                    {q.options.map((option, oIndex) => (
                      <div key={oIndex} className="mb-2 d-flex align-items-center">
                        <input
                          type="radio"
                          className="btn-check"
                          name={`correct-${qIndex}`}
                          id={`q${qIndex}o${oIndex}`}
                          checked={q.correctAnswer === oIndex}
                          onChange={() => {
                            const newQuestions = [...quizQuestions];
                            newQuestions[qIndex].correctAnswer = oIndex;
                            setQuizQuestions(newQuestions);
                          }}
                        />
                        <label
                          className="btn btn-outline-success btn-sm me-2"
                          htmlFor={`q${qIndex}o${oIndex}`}
                        >
                          Correct
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={`Option ${oIndex + 1}`}
                          value={option}
                          onChange={(e) => {
                            const newQuestions = [...quizQuestions];
                            newQuestions[qIndex].options[oIndex] = e.target.value;
                            setQuizQuestions(newQuestions);
                          }}
                          required
                        />
                      </div>
                    ))}
                    {quizQuestions.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger mt-2"
                        onClick={() => {
                          const newQuestions = quizQuestions.filter((_, index) => index !== qIndex);
                          setQuizQuestions(newQuestions);
                        }}
                      >
                        <FaTrash /> Remove Question
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const handleEdit = (item) => {
    setEditingContent(item);
    setContentType(item.type);

    // Set basic content fields
    setContent({
      title: item.title,
      description: item.description,
      url: item.url || '',
      duration: item.duration || '',
      order: item.order || 1
    });

    // Handle quiz questions if present
    if (item.type === 'quiz' && item.questions) {
      setQuizQuestions(item.questions);
    }
  };

  const handleDelete = async (contentId) => {
    if (!window.confirm('Are you sure you want to delete this content?')) {
      return;
    }

    try {
      const response = await axios.delete(
        `https://learning-managment-system-using-mern.onrender.com/courseRoute/delete-content/${contentId}`
      );

      if (response.data.success) {
        alert('Content deleted successfully');
        fetchCourseContent(selectedCourse._id);
      }
    } catch (error) {
      console.error('Error deleting content:', error);
      alert('Failed to delete content');
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Course Content Manager</h2>

      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-header">
              Select Course
            </div>
            <div className="card-body">
              <select
                className="form-select"
                onChange={(e) => setSelectedCourse(courses.find(c => c._id === e.target.value))}
              >
                <option value="">Choose a course...</option>
                {courses.map(course => (
                  <option key={course._id} value={course._id}>
                    {course.CourseName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedCourse && (
            <div className="card">
              <div className="card-header">
                Add New Content
              </div>
              <div className="card-body">
                <form onSubmit={handleContentSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Content Type</label>
                    <select
                      className="form-select"
                      value={contentType}
                      onChange={(e) => {
                        setContentType(e.target.value);
                        resetForm();
                      }}
                    >
                      <option value="video">Video</option>
                      <option value="document">Document</option>
                      <option value="quiz">Quiz</option>
                    </select>
                  </div>
                  {renderContentTypeFields()}
                  <button type="submit" className="btn btn-primary">
                    <FaPlus className="me-2" />
                    {editingContent ? 'Update Content' : 'Add Content'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        <div className="col-md-8">
          {selectedCourse && (
            <div className="card">
              <div className="card-header">
                Course Content - {selectedCourse.CourseName}
              </div>
              <div className="card-body">
                {courseContent.length === 0 ? (
                  <div className="text-center text-muted py-4">
                    <FaFileAlt size={40} className="mb-3" />
                    <p>No content added yet</p>
                  </div>
                ) : (
                  <div className="content-list">
                    {courseContent.map((item, index) => (
                      <div key={item._id} className="content-item">
                        <div className="content-type-icon">
                          {item.type === 'video' && <FaVideo />}
                          {item.type === 'document' && <FaFileAlt />}
                          {item.type === 'quiz' && <FaQuestionCircle />}
                        </div>
                        <div className="content-details">
                          <h5>{item.title}</h5>
                          <p className="text-muted">{item.description}</p>
                          {item.type === 'quiz' && (
                            <span className="badge bg-info">
                              {item.questions?.length || 0} Questions
                            </span>
                          )}
                          {item.type === 'video' && (
                            <span className="text-muted">
                              Duration: {item.duration} minutes
                            </span>
                          )}
                          {item.type === 'document' && (
                            <a
                              href={`https://learning-managment-system-using-mern.onrender.com${item.fileUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-outline-primary"
                            >
                              View Document
                            </a>
                          )}
                        </div>
                        <div className="content-actions">
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleEdit(item)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(item._id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseContentManager;