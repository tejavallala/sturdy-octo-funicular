import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaUser,
  FaUserTie,
  FaCogs,
  FaSearch,
} from "react-icons/fa";
import {
  faInstagram,
  faYoutube,
  faTwitter,
  faLinkedin,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faMapMarker,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import "../CSS/footerstyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../CSS/Navbar.css";

const navbarStyles = {
  background: "var(--nav-bg)",
  padding: "15px 0",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
};

function Nav() {
  const [isHovered, setIsHovered] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate("/user-login");
    }
  };

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

      <div className="container-fluid py-5 my-4 mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 shadow p-3 mb-5 bg-body rounded">
            <div
              id="carouselExampleDark"
              className="carousel carousel-dark slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="/images/slide1.jpg"
                    className="d-block w-100 img-fluid"
                    alt="First slide"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="/images/slide2.jpg"
                    className="d-block w-100 img-fluid"
                    alt="Second slide"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="/images/slide3.jpg"
                    className="d-block w-100 img-fluid"
                    alt="Third slide"
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="text-center mb-5">
              <h2 className="fw-bold" style={{ color: "#1e3c72" }}>
                Trusted by over 16,000 companies and millions of learners around
                the world
              </h2>
            </div>
            <div className="d-flex flex-wrap justify-content-center align-items-center gap-4 px-4">
              {[
                {
                  name: "Volkswagen",
                  logo: "https://logos-world.net/wp-content/uploads/2021/04/Volkswagen-Logo.png",
                },
                {
                  name: "Samsung",
                  logo: "https://logos-world.net/wp-content/uploads/2020/04/Samsung-Logo.png",
                },
                {
                  name: "Cisco",
                  logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBhas3pIdWqnPtxBZQcM7TuSvFqgjnrErF8Q&s",
                },
                {
                  name: "Vimeo",
                  logo: "https://logos-world.net/wp-content/uploads/2021/02/Vimeo-Logo.png",
                },
                {
                  name: "P&G",
                  logo: "data:image/jpeg;base64,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",
                },
                {
                  name: "HPE",
                  logo: "data:image/jpeg;base64,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",
                },
                {
                  name: "Citi",
                  logo: "data:image/png;base64,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",
                },
                {
                  name: "Ericsson",
                  logo: "data:image/png;base64,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",
                },
              ].map((company) => (
                <div key={company.name} className="company-logo-wrapper">
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="company-logo"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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
                  <a href="l">Assessments</a>
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
}

export default Nav;
