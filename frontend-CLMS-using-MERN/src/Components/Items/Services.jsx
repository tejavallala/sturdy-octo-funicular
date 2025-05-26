import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "../CSS/services.css"; 
import {FaHome,FaInfoCircle,  FaUser,  FaUserTie, FaCogs,FaSearch} from "react-icons/fa";
import {faInstagram,faYoutube,faTwitter,faLinkedin,faFacebook} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope,faMapMarker,faPhone,} from "@fortawesome/free-solid-svg-icons";
import "../CSS/footerstyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../CSS/Navbar.css";

const Services = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate("/user-login");
    }
  };
  const handleEnrollClick = () => {
    navigate("/user-login");
  };
  const courses = [
    {
      id: 1,
      title: "Full-Stack Web Development",
      description: "Master MERN stack development with real-world projects",
      imageUrl: "https://img-c.udemycdn.com/course/750x422/1646980_23f7_2.jpg",
      technologies: ["MongoDB", "Express.js", "React"],
      price: "$89.99",
      level: "Intermediate",
      duration: "6 months",
      rating: 4.8,
      students: "15.5K",
      link: "https://www.udemy.com/course/the-complete-web-development-bootcamp/",
    },
    {
      id: 2,
      title: "AWS Certified Solutions Architect",
      description: "Comprehensive guide to AWS certification",
      imageUrl: "https://img-c.udemycdn.com/course/750x422/2196488_8fc7_10.jpg",
      technologies: ["AWS", "Cloud", "DevOps", "Security"],
      price: "$99.99",
      level: "Advanced",
      duration: "4 months",
      rating: 4.9,
      students: "28.3K",
      link: "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/",
    },
    {
      id: 3,
      title: "Python Data Science",
      description: "Complete Data Science & Machine Learning Bootcamp",
      imageUrl: "https://img-c.udemycdn.com/course/750x422/2473048_8255_5.jpg",
      technologies: ["Python", "Pandas", "NumPy"],
      price: "$84.99",
      level: "Beginner",
      duration: "5 months",
      rating: 4.7,
      students: "32.1K",
      link: "https://www.udemy.com/course/python-data-science-machine-learning-bootcamp/",
    },
    {
      id: 4,
      title: "Flutter App Development",
      description: "Build iOS and Android apps with Flutter",
      imageUrl: "https://img-c.udemycdn.com/course/750x422/1708340_7108_4.jpg",
      technologies: ["Flutter", "Dart", "Firebase", "UI/UX"],
      price: "$94.99",
      level: "Intermediate",
      duration: "4 months",
      rating: 4.8,
      students: "21.7K",
      link: "https://www.udemy.com/course/flutter-bootcamp-with-dart/",
    },
    {
      id: 5,
      title: "UI/UX Design Masterclass",
      description: "Master modern UI/UX design principles and tools",
      imageUrl:
        "data:image/webp;base64,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",
      technologies: ["Figma", "Adobe XD", "Sketch"],
      price: "$79.99",
      level: "Beginner",
      duration: "3 months",
      rating: 4.7,
      students: "18.2K",
      link: "https://www.udemy.com/course/ui-ux-web-design-using-adobe-xd/",
    },
    {
      id: 6,
      title: "DevOps Engineering",
      description: "Learn Docker, Kubernetes & CI/CD pipelines",
      imageUrl:
        "data:image/png;base64,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",
      technologies: ["Docker", "Kubernetes", "Jenkins", "Git"],
      price: "$99.99",
      level: "Advanced",
      duration: "5 months",
      rating: 4.8,
      students: "12.5K",
      link: "https://www.udemy.com/course/devops-fundamentals/",
    },
    {
      id: 7,
      title: "Cybersecurity Specialist",
      description: "Master ethical hacking and security principles",
      imageUrl: "https://img-c.udemycdn.com/course/750x422/857010_8239_2.jpg",
      technologies: ["Network Security", "Ethical Hacking"],
      price: "$94.99",
      level: "Intermediate",
      duration: "6 months",
      rating: 4.9,
      students: "25.3K",
      link: "https://www.udemy.com/course/complete-ethical-hacking-course/",
    },
    {
      id: 8,
      title: "Artificial Intelligence & ML",
      description: "Deep Learning and Neural Networks masterclass",
      imageUrl: "https://img-c.udemycdn.com/course/750x422/950390_270f_3.jpg",
      technologies: ["TensorFlow", "PyTorch", "Deep Learning"],
      price: "$89.99",
      level: "Advanced",
      duration: "7 months",
      rating: 4.8,
      students: "20.1K",
      link: "https://www.udemy.com/course/artificial-intelligence-az/",
    },
    {
      id: 9,
      title: "Blockchain Development",
      description: "Build DApps with Ethereum and Solidity",
      imageUrl: "https://img-c.udemycdn.com/course/750x422/2776760_f176_9.jpg",
      technologies: ["Ethereum", "Solidity", "Web3.js"],
      price: "$95.99",
      level: "Advanced",
      duration: "5 months",
      rating: 4.7,
      students: "15.8K",
      link: "https://www.udemy.com/course/blockchain-developer/",
    },
  ];

  // Define your desired background color and other styles
  const navbarStyles = {
    background: "linear-gradient(135deg, k1e3c72 0%, k2a5298 100%)",
    padding: "15px 0",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  };

  const navigate = useNavigate();
 const [searchQuery, setSearchQuery] = useState("");
  const [isHovered, setIsHovered] = useState("");

  return (
    <>
      <nav
              className="navbar navbar-expand-lg navbar-dark shadow-lg fixed-top"
              style={navbarStyles}
            >
              <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                  <img
                    src="/images/logo1.jpg"
                    alt="Logo"
                    className="brand-logo me-3"
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "10px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    }}
                  />
                  <span
                    className="brand-text"
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      background: "linear-gradient(45deg, kfff, ke3f2fd)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
                    }}
                  >
                    LEARN HUB
                  </span>
                </Link>
      
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="knavbarNav"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
      
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav ms-auto align-items-center">
                    {/* Search Bar */}
                    <li className="nav-item mx-2">
                      <form
                        onSubmit={handleSearch}
                        className="d-flex align-items-center"
                      >
                        <div className="search-wrapper">
                          <input
                            type="search"
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                          />
                          <button type="submit" className="search-btn">
                            <FaSearch />
                          </button>
                        </div>
                      </form>
                    </li>
      
                    {[
                      { path: "/", icon: <FaHome />, text: "Home" },
                      { path: "/about", icon: <FaInfoCircle />, text: "About" },
                      { path: "/services", icon: <FaCogs />, text: "Services" },
                    ].map((item) => (
                      <li className="nav-item mx-2" key={item.path}>
                        <Link
                          className="nav-link d-flex align-items-center"
                          to={item.path}
                          onMouseEnter={() => setIsHovered(item.path)}
                          onMouseLeave={() => setIsHovered("")}
                          style={{
                            transition: "all 0.3s ease",
                            transform:
                              isHovered === item.path ? "translateY(-2px)" : "none",
                            padding: "8px 16px",
                            borderRadius: "8px",
                            background:
                              isHovered === item.path
                                ? "rgba(255,255,255,0.1)"
                                : "transparent",
                          }}
                        >
                          <span className="icon me-2">{item.icon}</span>
                          {item.text}
                        </Link>
                      </li>
                    ))}
      
                    <li className="nav-item mx-2">
                      <Link
                        className="btn btn-glow"
                        to="/user-login"
                        style={{
                          background: "linear-gradient(45deg, kFF512F, kDD2476)",
                          border: "none",
                          padding: "10px 20px",
                          borderRadius: "30px",
                          color: "white",
                          fontWeight: "600",
                          transition: "all 0.3s ease",
                          boxShadow: "0 4px 15px rgba(221, 36, 118, 0.4)",
                        }}
                      >
                        <FaUser className="me-2" /> User Login
                      </Link>
                    </li>
      
                    <li className="nav-item mx-2">
                      <Link
                        className="btn btn-glow"
                        to="/admin"
                        style={{
                          background: "linear-gradient(45deg, k11998e, k38ef7d)",
                          border: "none",
                          padding: "10px 20px",
                          borderRadius: "30px",
                          color: "white",
                          fontWeight: "600",
                          transition: "all 0.3s ease",
                          boxShadow: "0 4px 15px rgba(56, 239, 125, 0.4)",
                        }}
                      >
                        <FaUserTie className="me-2" /> Admin Login
                      </Link>
                    </li>
                  </ul>
                  {/* Theme Toggle Button */}
                </div>
              </div>
            </nav>

      <section className="services-section">
        <div className="container">
          <h2 className="section-title" data-aos="fade-down">
            Explore Our Premium Courses
          </h2>

          <div className="card-container">
            {courses.map((course) => (
              <div
                key={course.id}
                className="course-card"
                data-aos="fade-up"
                data-aos-delay={course.id * 100}
              >
                <div className="card-image-wrapper">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="card-img-top"
                  />
                  <span className="course-price">{course.price}</span>
                  <span className="course-level">{course.level}</span>
                </div>

                <div className="card-body">
                  <h3 className="card-title">{course.title}</h3>
                  <p className="card-description">{course.description}</p>

                  <div className="tech-stack">
                    {course.technologies.map((tech, index) => (
                      <span key={index} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="course-stats">
                    <div className="stat-item">
                      <i className="fas fa-clock"></i>
                      {course.duration}
                    </div>
                    <div className="stat-item">
                      <i className="fas fa-star"></i>
                      {course.rating}
                    </div>
                    <div className="stat-item">
                      <i className="fas fa-users"></i>
                      {course.students}
                    </div>
                  </div>

                  <div className="card-actions">
                    <a
                      href={course.link}
                      target="knowledge"
                      rel="noopener noreferrer"
                      className="view-course-btn"
                    >
                      View Details
                    </a>
                    <button onClick={handleEnrollClick} className="enroll-btn">
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="modern-footer">
        <div className="footer-top-wave"></div>
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4 col-md-6" id="company">
              <div className="company-info">
                <img
                  src="/images/logo1.jpg"
                  alt="Learn Hub"
                  className="footer-logo"
                />
                <p className="mission-text">
                  "Our mission at Learn Hub is to provide accessible,
                  high-quality, and diverse educational content to learners of
                  all backgrounds."
                </p>
                <div className="social-links">
                  {[
                    { icon: faFacebook, link: "https://facebook.com" },
                    { icon: faInstagram, link: "https://instagram.com" },
                    { icon: faYoutube, link: "https://youtube.com" },
                    { icon: faTwitter, link: "https://twitter.com" },
                    { icon: faLinkedin, link: "https://linkedin.com" },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      className="social-icon"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={social.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-2 col-md-6" id="services">
              <h3 className="footer-title">Services</h3>
              <ul className="footer-links">
                <li>
                  <a href="k">E-learning</a>
                </li>
                <li>
                  <a href="k">Live Sessions</a>
                </li>
                <li>
                  <a href="k">Assessments</a>
                </li>
                <li>
                  <a href="k">Course Content</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-6" id="useful-links">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-links">
                <li>
                  <a href="k">About Us</a>
                </li>
                <li>
                  <a href="k">Services</a>
                </li>
                <li>
                  <a href="k">Privacy Policy</a>
                </li>
                <li>
                  <a href="k">Support</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-6" id="contact">
              <h3 className="footer-title">Contact Us</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <FontAwesomeIcon
                    icon={faMapMarker}
                    className="contact-icon"
                  />
                  <div>
                    <p>
                      FF-42, Hyderabad,
                      <br />
                      Telangana, INDIA
                    </p>
                  </div>
                </div>
                <div className="contact-item">
                  <FontAwesomeIcon icon={faPhone} className="contact-icon" />
                  <div>
                    <p>+1-8755856858</p>
                  </div>
                </div>
                <div className="contact-item">
                  <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
                  <div>
                    <p>info@learnhub.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <hr className="footer-divider" />
            <div className="row align-items-center">
              <div className="col-md-6">
                <p className="copyright">
                  © {new Date().getFullYear()} Learn Hub. All rights reserved.
                </p>
              </div>
              <div className="col-md-6">
                <div className="footer-bottom-links">
                  <a href="k">Terms</a>
                  <a href="k">Privacy</a>
                  <a href="k">Cookies</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Services;
