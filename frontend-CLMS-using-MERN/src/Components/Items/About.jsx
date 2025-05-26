import React, { useState, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { FaHome, FaInfoCircle, FaUser, FaUserTie, FaCogs,FaSearch } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faFacebook,faInstagram,faYoutube,faLinkedin, faTwitter} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope,faPhone,faMapMarker} from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../CSS/About.css';
import '../CSS/Navbar.css';


const navbarStyles = {
  background: "var(--nav-bg)",
  padding: "15px 0",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
};


const About = () => {
  const [isHovered, setIsHovered] = useState("");
  const navigate = useNavigate();
   const [searchQuery, setSearchQuery] = useState("");
  

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate("/user-login");
    }
  };


  const teamMembers = [
    {
      name: 'Aashritha Paladugu',
      role: 'Frontend Developer',
      image: '/images/aashritha.jpg', // Add the image URL
      twitterLink: '#',
      facebookLink: '#',
      instagramLink: '#',
    },
    {
      name: 'Neeraj Chokkaku',
      role: 'Backend Developer',
      image: '/images/neeraj.jpg',
      twitterLink: '#',
      facebookLink: '#',
      instagramLink: '#',
    },
    {
      name: 'Ankitha Paladugu',
      role: 'Frontend Developer',
      image: '/images/ankitha.jpg',
      twitterLink: 'www.twitter.com',
      facebookLink: '#',
      instagramLink: '#',
    },
    {
      name: 'Eswar Prashanth Mulagani',
      role: 'Backend Developer',
      image: '/images/eswar.jpg',
      twitterLink: '#',
      facebookLink: '#',
      instagramLink: '#',
    },
    {
      name: 'Maniteja Vallala',
      role: 'Backend Developer',
      image: '/images/teja.jpg',
      twitterLink: '#',
      facebookLink: '#',
      instagramLink: '#',
    },
  ];

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
                      background: "linear-gradient(45deg, #fff, #e3f2fd)",
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
                  data-bs-target="#navbarNav"
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
                          background: "linear-gradient(45deg, #FF512F, #DD2476)",
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
                          background: "linear-gradient(45deg, #11998e, #38ef7d)",
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

      {/* Enhanced Team Section */}
      <section className="team-section">
        <div className="center">
          <h1 className="avengers-title">
            Our  Team
            <div className="title-effect"></div>
          </h1>
        </div>

        <div className="team-content">
          {teamMembers.map((member, index) => (
            <div className="card-3d avenger-card" key={index}
                 data-aos="zoom-in"
                 data-aos-delay={index * 100}>
              <div className="card-inner">
                <div className="card-front">
                  <div className="hero-circle"></div>
                  <img src={member.image}  alt={member.name} className="avatar" />
                  <h3>{member.name}</h3>
                  <h5>{member.role}</h5>
                  <div className="hero-glow"></div>
                </div>
                <div className="card-back">
                  <div className="hero-pattern"></div>
                  <div className="social-links">
                    <a href={member.twitterLink} className="hero-social">
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href={member.facebookLink} className="hero-social">
                      <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href={member.instagramLink} className="hero-social">
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="section-separator"></div>

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

export default About;