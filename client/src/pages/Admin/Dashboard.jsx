import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/dashboard.css";

const API_URL = "http://localhost:5000/api/dashboard";

function Dashboard() {
  const [data, setData] = useState({
    students: 0,
    teachers: 0,
    courses: 0,
    fees: 0,
  });

  const [loading, setLoading] = useState(true);

  // =====================================================
  // LOAD DASHBOARD DATA
  // =====================================================

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Failed to fetch dashboard data"
          );
        }

        return response.json();
      })
      .then((result) => {
        setData({
          students: result.students ?? 0,
          teachers: result.teachers ?? 0,
          courses: result.courses ?? 0,
          fees: result.fees ?? 0,
        });

        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Dashboard API Error:",
          error
        );

        setLoading(false);
      });
  }, []);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>

        <h3>
          Loading Dashboard...
        </h3>

        <p>
          Please wait while we fetch your
          school data.
        </p>
      </div>
    );
  }

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="professional-dashboard">

      {/* =====================================================
          WELCOME SECTION
      ===================================================== */}

      <section className="dashboard-welcome">

        <div>
          <span className="welcome-label">
            ADMIN PORTAL
          </span>

          <h1>
            Welcome Admin <span>👋</span>
          </h1>

          <p>
            Here's what's happening with your
            school today.
          </p>
        </div>

        <div className="dashboard-date">

          <span className="dashboard-date-icon">
            📅
          </span>

          <div>
            <small>
              Dashboard
            </small>

            <strong>
              School Management
            </strong>
          </div>

        </div>

      </section>

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <section className="dashboard-stats">

        {/* STUDENTS */}

        <div className="dashboard-stat-card">

          <div className="stat-top">

            <div className="stat-icon students-icon">
              🎓
            </div>

            <span className="stat-status">
              Active
            </span>

          </div>

          <div className="stat-content">

            <span>
              Students
            </span>

            <h2>
              {data.students}
            </h2>

            <p>
              Total registered students
            </p>

          </div>

        </div>

        {/* TEACHERS */}

        <div className="dashboard-stat-card">

          <div className="stat-top">

            <div className="stat-icon teachers-icon">
              👨‍🏫
            </div>

            <span className="stat-status">
              Staff
            </span>

          </div>

          <div className="stat-content">

            <span>
              Teachers
            </span>

            <h2>
              {data.teachers}
            </h2>

            <p>
              Teaching staff members
            </p>

          </div>

        </div>

        {/* COURSES */}

        <div className="dashboard-stat-card">

          <div className="stat-top">

            <div className="stat-icon courses-icon">
              📚
            </div>

            <span className="stat-status">
              Courses
            </span>

          </div>

          <div className="stat-content">

            <span>
              Courses
            </span>

            <h2>
              {data.courses}
            </h2>

            <p>
              Available academic courses
            </p>

          </div>

        </div>

        {/* FEES */}

        <div className="dashboard-stat-card">

          <div className="stat-top">

            <div className="stat-icon fees-icon">
              💰
            </div>

            <span className="stat-status">
              Finance
            </span>

          </div>

          <div className="stat-content">

            <span>
              Total Fees
            </span>

            <h2>
              ₹{data.fees}
            </h2>

            <p>
              Recorded fee amount
            </p>

          </div>

        </div>

      </section>

      {/* =====================================================
          OVERVIEW + QUICK ACTIONS
      ===================================================== */}

      <section className="dashboard-grid">

        {/* SCHOOL OVERVIEW */}

        <div className="dashboard-panel overview-panel">

          <div className="panel-header">

            <div>
              <h2>
                School Overview
              </h2>

              <p>
                Current school management
                statistics
              </p>
            </div>

            <span className="panel-icon">
              📊
            </span>

          </div>

          <div className="overview-list">

            {/* STUDENTS */}

            <div className="overview-item">

              <div className="overview-left">

                <span className="overview-circle">
                  🎓
                </span>

                <div className="overview-text">

                  <strong>
                    Students
                  </strong>

                  <small>
                    Registered students
                  </small>

                </div>

              </div>

              <strong className="overview-value">
                {data.students}
              </strong>

            </div>

            {/* TEACHERS */}

            <div className="overview-item">

              <div className="overview-left">

                <span className="overview-circle">
                  👨‍🏫
                </span>

                <div className="overview-text">

                  <strong>
                    Teachers
                  </strong>

                  <small>
                    Teaching staff
                  </small>

                </div>

              </div>

              <strong className="overview-value">
                {data.teachers}
              </strong>

            </div>

            {/* COURSES */}

            <div className="overview-item">

              <div className="overview-left">

                <span className="overview-circle">
                  📚
                </span>

                <div className="overview-text">

                  <strong>
                    Courses
                  </strong>

                  <small>
                    Academic courses
                  </small>

                </div>

              </div>

              <strong className="overview-value">
                {data.courses}
              </strong>

            </div>

            {/* FEES */}

            <div className="overview-item">

              <div className="overview-left">

                <span className="overview-circle">
                  💰
                </span>

                <div className="overview-text">

                  <strong>
                    Fees
                  </strong>

                  <small>
                    Recorded amount
                  </small>

                </div>

              </div>

              <strong className="overview-value">
                ₹{data.fees}
              </strong>

            </div>

          </div>

        </div>

        {/* QUICK ACTIONS */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>

              <h2>
                Quick Actions
              </h2>

              <p>
                Manage your school quickly
              </p>

            </div>

            <span className="panel-icon">
              ⚡
            </span>

          </div>

          <div className="quick-actions">

            {/* STUDENTS */}

            <Link
              to="/admin/students"
              className="quick-action"
            >

              <span className="quick-action-icon">
                🎓
              </span>

              <div>

                <strong>
                  Students
                </strong>

                <small>
                  Manage student records
                </small>

              </div>

              <span className="arrow">
                →
              </span>

            </Link>

            {/* TEACHERS */}

            <Link
              to="/admin/teachers"
              className="quick-action"
            >

              <span className="quick-action-icon">
                👨‍🏫
              </span>

              <div>

                <strong>
                  Teachers
                </strong>

                <small>
                  Manage teaching staff
                </small>

              </div>

              <span className="arrow">
                →
              </span>

            </Link>

            {/* PARENTS */}

            <Link
              to="/admin/parents"
              className="quick-action"
            >

              <span className="quick-action-icon">
                👨‍👩‍👧
              </span>

              <div>

                <strong>
                  Parents
                </strong>

                <small>
                  Manage parent records
                </small>

              </div>

              <span className="arrow">
                →
              </span>

            </Link>

            {/* COURSES */}

            <Link
              to="/admin/courses"
              className="quick-action"
            >

              <span className="quick-action-icon">
                📚
              </span>

              <div>

                <strong>
                  Courses
                </strong>

                <small>
                  Manage academic courses
                </small>

              </div>

              <span className="arrow">
                →
              </span>

            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          SCHOOL MANAGEMENT
      ===================================================== */}

      <section className="dashboard-panel modules-panel">

        <div className="panel-header">

          <div>

            <h2>
              School Management
            </h2>

            <p>
              Access the main areas of your
              ERP system
            </p>

          </div>

          <span className="panel-icon">
            🏫
          </span>

        </div>

        <div className="module-grid">

          {/* STUDENTS */}

          <Link
            to="/admin/students"
            className="module-card"
          >

            <span>
              🎓
            </span>

            <strong>
              Student Management
            </strong>

            <small>
              Profiles, academic records
              and performance
            </small>

          </Link>

          {/* TEACHERS */}

          <Link
            to="/admin/teachers"
            className="module-card"
          >

            <span>
              👨‍🏫
            </span>

            <strong>
              Teacher Management
            </strong>

            <small>
              Staff information and
              responsibilities
            </small>

          </Link>

          {/* PARENTS */}

          <Link
            to="/admin/parents"
            className="module-card"
          >

            <span>
              👨‍👩‍👧
            </span>

            <strong>
              Parent Management
            </strong>

            <small>
              Parent profiles and contact
              information
            </small>

          </Link>

          {/* ATTENDANCE */}

          <Link
            to="/admin/attendance"
            className="module-card"
          >

            <span>
              📅
            </span>

            <strong>
              Attendance
            </strong>

            <small>
              Track student attendance
              and participation
            </small>

          </Link>

          {/* EXAMINATIONS */}

          <Link
            to="/admin/exams"
            className="module-card"
          >

            <span>
              📝
            </span>

            <strong>
              Examinations
            </strong>

            <small>
              Manage exams, marks
              and results
            </small>

          </Link>

          {/* REPORTS */}

          <Link
            to="/admin/reports"
            className="module-card"
          >

            <span>
              📈
            </span>

            <strong>
              Reports
            </strong>

            <small>
              View school management
              reports
            </small>

          </Link>

          {/* SETTINGS */}

          <Link
            to="/admin/settings"
            className="module-card"
          >

            <span>
              ⚙️
            </span>

            <strong>
              Settings
            </strong>

            <small>
              Configure school ERP
              settings
            </small>

          </Link>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;