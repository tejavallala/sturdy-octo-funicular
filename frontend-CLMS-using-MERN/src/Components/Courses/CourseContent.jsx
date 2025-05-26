import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  FaVideo,
  FaFileAlt,
  FaQuestionCircle,
  FaCheckCircle,
  FaTimesCircle
} from 'react-icons/fa';
import '../CSS/CourseContent.css';

const CourseContent = () => {
  const { courseId } = useParams();
  const [courseContent, setCourseContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeContent, setActiveContent] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResults, setQuizResults] = useState(null);

  useEffect(() => {
    const fetchCourseContent = async () => {
      try {
        const response = await axios.get(`https://learning-managment-system-using-mern.onrender.com/courseRoute/content/${courseId}`);
        if (response.data.success) {
          setCourseContent(response.data.content);
          if (response.data.content.length > 0) {
            setActiveContent(response.data.content[0]);
          }
        }
      } catch (err) {
        setError('Failed to fetch course content');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseContent();
  }, [courseId]);

  const handleContentSelect = (content) => {
    setActiveContent(content);
    setQuizAnswers({});
    setQuizResults(null);
  };

  const handleQuizSubmit = () => {
    if (!activeContent || activeContent.type !== 'quiz') return;

    const results = activeContent.questions.map((question, index) => ({
      question: question.question,
      correct: question.correctAnswer === Number(quizAnswers[index])
    }));

    setQuizResults(results);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-4" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="course-content-container">
      <div className="content-sidebar">
        <h5 className="sidebar-title">Course Contents</h5>
        <div className="content-list">
          {courseContent.map((content, index) => (
            <div
              key={content._id}
              className={`content-item ${activeContent?._id === content._id ? 'active' : ''}`}
              onClick={() => handleContentSelect(content)}
            >
              <div className="content-icon">
                {content.type === 'video' && <FaVideo />}
                {content.type === 'document' && <FaFileAlt />}
                {content.type === 'quiz' && <FaQuestionCircle />}
              </div>
              <div className="content-info">
                <h6>{content.title}</h6>
                <small>{content.type}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="content-main">
        {activeContent ? (
          <div className="content-display">
            <h3>{activeContent.title}</h3>
            <p className="text-muted">{activeContent.description}</p>

            {activeContent.type === 'video' && (
              <div className="video-container">
                <iframe
                  src={activeContent.url}
                  title={activeContent.title}
                  allowFullScreen
                  className="video-frame"
                />
              </div>
            )}

            {activeContent.type === 'document' && (
              <div className="document-container">
                <iframe
                  src={`https://learning-managment-system-using-mern.onrender.com${activeContent.fileUrl}`}
                  title={activeContent.title}
                  className="document-frame"
                />
              </div>
            )}

            {activeContent.type === 'quiz' && (
              <div className="quiz-container">
                {activeContent.questions.map((question, qIndex) => (
                  <div key={qIndex} className="quiz-question mb-4">
                    <h5>
                      {qIndex + 1}. {question.question}
                    </h5>
                    <div className="options-list">
                      {question.options.map((option, oIndex) => (
                        <div key={oIndex} className="option-item">
                          <input
                            type="radio"
                            id={`q${qIndex}o${oIndex}`}
                            name={`question${qIndex}`}
                            value={oIndex}
                            onChange={(e) => 
                              setQuizAnswers({
                                ...quizAnswers,
                                [qIndex]: e.target.value
                              })
                            }
                            disabled={quizResults !== null}
                          />
                          <label htmlFor={`q${qIndex}o${oIndex}`}>
                            {option}
                          </label>
                          {quizResults && (
                            <span className="result-icon">
                              {Number(quizAnswers[qIndex]) === oIndex && (
                                question.correctAnswer === oIndex ? 
                                <FaCheckCircle className="text-success" /> : 
                                <FaTimesCircle className="text-danger" />
                              )}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {!quizResults && (
                  <button 
                    className="btn btn-primary"
                    onClick={handleQuizSubmit}
                  >
                    Submit Quiz
                  </button>
                )}
                {quizResults && (
                  <div className="quiz-results">
                    <h4>Quiz Results</h4>
                    <p>
                      Score: {quizResults.filter(r => r.correct).length} / {quizResults.length}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-muted">
            <h4>No content selected</h4>
            <p>Please select content from the sidebar to view</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseContent;