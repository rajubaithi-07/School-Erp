import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="landing-navbar">

        <div className="landing-container navbar-inner">

          <Link to="/" className="brand">
            <div className="brand-logo">
              🎓
            </div>

            <div>
              <div className="brand-name">
                School ERP
              </div>

              <div className="brand-subtitle">
                Smart School Management
              </div>
            </div>
          </Link>

          <nav className="main-nav">

            <Link to="/" className="nav-link active">
              Home
            </Link>

            <a href="#about" className="nav-link">
              About
            </a>

            <a href="#services" className="nav-link">
              Services
            </a>

            <a href="#gallery" className="nav-link">
              Gallery
            </a>

            <a href="#contact" className="nav-link">
              Contact
            </a>

          </nav>

          <Link
            to="/login"
            className="navbar-login-btn"
          >
            Login →
          </Link>

        </div>

      </header>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="hero-section">

        <div className="landing-container hero-grid">

          <div className="hero-content">

            <div className="hero-badge">
              🔐 SECURE SCHOOL MANAGEMENT
            </div>

            <h1>
              Smart Management.
              <br />
              <span>Better Education.</span>
            </h1>

            <p>
              School ERP brings students, teachers, parents
              and administrators together in one simple,
              secure and powerful platform.
            </p>

            <div className="hero-buttons">

              <Link
                to="/login"
                className="primary-btn"
              >
                Get Started →
              </Link>

              <a
                href="#about"
                className="secondary-btn"
              >
                Explore School ERP
              </a>

            </div>

            <div className="hero-stats">

              <div>
                <strong>4</strong>
                <span>User Portals</span>
              </div>

              <div>
                <strong>24/7</strong>
                <span>Access</span>
              </div>

              <div>
                <strong>100%</strong>
                <span>Digital</span>
              </div>

            </div>

          </div>


          {/* HERO CARD */}

          <div className="hero-dashboard">

            <div className="dashboard-window">

              <div className="window-header">

                <div className="window-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <span>
                  School ERP Dashboard
                </span>

              </div>

              <div className="dashboard-body">

                <div className="mini-sidebar">

                  <div className="mini-logo">
                    🎓
                  </div>

                  <div className="mini-menu active">
                    📊
                  </div>

                  <div className="mini-menu">
                    👨‍🎓
                  </div>

                  <div className="mini-menu">
                    📅
                  </div>

                  <div className="mini-menu">
                    📈
                  </div>

                  <div className="mini-menu">
                    💳
                  </div>

                </div>

                <div className="mini-content">

                  <div className="mini-title">
                    Dashboard
                  </div>

                  <div className="mini-cards">

                    <div className="mini-card">
                      <span>Students</span>
                      <strong>1,250</strong>
                      <small>↑ 12% this month</small>
                    </div>

                    <div className="mini-card">
                      <span>Attendance</span>
                      <strong>94%</strong>
                      <small>Excellent</small>
                    </div>

                  </div>

                  <div className="mini-chart">

                    <div className="chart-title">
                      Academic Overview
                    </div>

                    <div className="chart-bars">
                      <span style={{ height: "45%" }}></span>
                      <span style={{ height: "65%" }}></span>
                      <span style={{ height: "55%" }}></span>
                      <span style={{ height: "80%" }}></span>
                      <span style={{ height: "70%" }}></span>
                      <span style={{ height: "92%" }}></span>
                      <span style={{ height: "85%" }}></span>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          TRUST STRIP
      ===================================================== */}

      <section className="trust-section">

        <div className="landing-container trust-grid">

          <div>
            <strong>Students</strong>
            <span>Academic progress</span>
          </div>

          <div>
            <strong>Faculty</strong>
            <span>Teaching management</span>
          </div>

          <div>
            <strong>Parents</strong>
            <span>Child monitoring</span>
          </div>

          <div>
            <strong>Administrators</strong>
            <span>Complete control</span>
          </div>

        </div>

      </section>


      {/* =====================================================
          ABOUT
      ===================================================== */}

      <section
        id="about"
        className="about-section"
      >

        <div className="landing-container about-grid">

          <div className="about-visual">

            <div className="about-main-card">

              <div className="about-icon">
                🏫
              </div>

              <h3>
                One Platform
              </h3>

              <p>
                Everything your school needs,
                connected in one place.
              </p>

            </div>

            <div className="floating-card floating-one">
              📊 Academic Tracking
            </div>

            <div className="floating-card floating-two">
              🔒 Secure Access
            </div>

          </div>


          <div className="about-content">

            <span className="section-label">
              ABOUT SCHOOL ERP
            </span>

            <h2>
              A smarter way to
              <span> manage your school</span>
            </h2>

            <p>
              School ERP is a complete digital school
              management platform designed to simplify
              everyday academic and administrative work.
            </p>

            <p>
              From student records and attendance to
              examinations, courses, fees and reports,
              everything can be managed from one
              centralized system.
            </p>

            <div className="about-points">

              <div>
                <span>✓</span>
                Easy to use
              </div>

              <div>
                <span>✓</span>
                Secure and organized
              </div>

              <div>
                <span>✓</span>
                Role-based access
              </div>

              <div>
                <span>✓</span>
                Real-time information
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section
        id="services"
        className="services-section"
      >

        <div className="landing-container">

          <div className="section-heading">

            <span className="section-label">
              OUR SERVICES
            </span>

            <h2>
              Everything your school needs
            </h2>

            <p>
              Powerful tools designed for every
              member of your school community.
            </p>

          </div>


          <div className="services-grid">

            <div className="service-card">
              <div className="service-icon">
                👨‍🎓
              </div>
              <h3>
                Student Management
              </h3>
              <p>
                Manage student profiles, academic
                records, departments and semesters.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                👨‍🏫
              </div>
              <h3>
                Faculty Management
              </h3>
              <p>
                Manage teaching activities,
                attendance, performance and assignments.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                📅
              </div>
              <h3>
                Attendance
              </h3>
              <p>
                Track daily attendance records
                quickly and efficiently.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                📈
              </div>
              <h3>
                Performance
              </h3>
              <p>
                Monitor marks, grades, examinations
                and academic performance.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                💳
              </div>
              <h3>
                Fee Management
              </h3>
              <p>
                Track payments, pending fees,
                balances and financial records.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                📊
              </div>
              <h3>
                Reports
              </h3>
              <p>
                Access organized information and
                generate useful school reports.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          PORTALS
      ===================================================== */}

      <section className="portal-section">

        <div className="landing-container">

          <div className="section-heading">

            <span className="section-label">
              FOUR POWERFUL PORTALS
            </span>

            <h2>
              One system for everyone
            </h2>

          </div>


          <div className="portal-grid">

            <div className="portal-card">
              <div className="portal-icon">
                🎓
              </div>

              <h3>Student</h3>

              <p>
                Access courses, attendance,
                examinations and academic performance.
              </p>

              <Link to="/login/student">
                Student Login →
              </Link>
            </div>


            <div className="portal-card">
              <div className="portal-icon">
                👨‍🏫
              </div>

              <h3>Faculty</h3>

              <p>
                Manage students, attendance,
                performance and teaching activities.
              </p>

              <Link to="/login/faculty">
                Faculty Login →
              </Link>
            </div>


            <div className="portal-card">
              <div className="portal-icon">
                👨‍👩‍👧
              </div>

              <h3>Parent</h3>

              <p>
                Track your child's attendance,
                performance, examinations and fees.
              </p>

              <Link to="/login/parent">
                Parent Login →
              </Link>
            </div>


            <div className="portal-card">
              <div className="portal-icon">
                🛡️
              </div>

              <h3>Admin</h3>

              <p>
                Manage the complete school
                management system from one portal.
              </p>

              <Link to="/login/admin">
                Admin Login →
              </Link>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          GALLERY
      ===================================================== */}

      <section
        id="gallery"
        className="gallery-section"
      >

        <div className="landing-container">

          <div className="section-heading">

            <span className="section-label">
              SCHOOL LIFE
            </span>

            <h2>
              Learn. Grow. Achieve.
            </h2>

            <p>
              A connected digital experience for
              modern education.
            </p>

          </div>


          <div className="gallery-grid">

            <div className="gallery-card gallery-one">
              <div>📚</div>
              <span>Learning</span>
            </div>

            <div className="gallery-card gallery-two">
              <div>🏆</div>
              <span>Achievements</span>
            </div>

            <div className="gallery-card gallery-three">
              <div>🔬</div>
              <span>Innovation</span>
            </div>

            <div className="gallery-card gallery-four">
              <div>🎨</div>
              <span>Activities</span>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CONTACT
      ===================================================== */}

      <section
        id="contact"
        className="contact-section"
      >

        <div className="landing-container contact-card">

          <div className="contact-content">

            <span className="section-label">
              CONTACT US
            </span>

            <h2>
              Let's build a smarter
              <span> school together.</span>
            </h2>

            <p>
              Have questions about School ERP?
              Our team is ready to help you.
            </p>

          </div>


          <div className="contact-info">

            <div>
              <span>📧</span>
              <div>
                <small>Email</small>
                <strong>
                  support@schoolerp.com
                </strong>
              </div>
            </div>

            <div>
              <span>📞</span>
              <div>
                <small>Phone</small>
                <strong>
                  +91 90000 00000
                </strong>
              </div>
            </div>

            <div>
              <span>📍</span>
              <div>
                <small>Location</small>
                <strong>
                  Hyderabad, India
                </strong>
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="landing-footer">

        <div className="landing-container footer-grid">

          <div>

            <div className="footer-brand">
              <div className="brand-logo">
                🎓
              </div>

              <div>
                <strong>
                  School ERP
                </strong>

                <span>
                  Smart School Management
                </span>
              </div>
            </div>

            <p>
              Making school management simple,
              secure and connected.
            </p>

          </div>


          <div>

            <h4>
              Quick Links
            </h4>

            <a href="#about">
              About
            </a>

            <a href="#services">
              Services
            </a>

            <a href="#gallery">
              Gallery
            </a>

            <a href="#contact">
              Contact
            </a>

          </div>


          <div>

            <h4>
              Portals
            </h4>

            <Link to="/login/student">
              Student
            </Link>

            <Link to="/login/faculty">
              Faculty
            </Link>

            <Link to="/login/parent">
              Parent
            </Link>

            <Link to="/login/admin">
              Admin
            </Link>

          </div>


          <div>

            <h4>
              Contact
            </h4>

            <span>
              📧 support@schoolerp.com
            </span>

            <span>
              📞 +91 90000 00000
            </span>

            <span>
              📍 Hyderabad, India
            </span>

          </div>

        </div>


        <div className="footer-bottom">

          <span>
            © 2026 School ERP. All rights reserved.
          </span>

          <span>
            Smart • Secure • Connected
          </span>

        </div>

      </footer>

    </div>
  );
}

export default LandingPage;