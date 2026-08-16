import React from "react";
import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

function StudentLayout() {
  const navigate = useNavigate();

  const studentData = JSON.parse(
    localStorage.getItem("student") || "null"
  );

  const studentName =
    studentData?.name || "Student";

  const handleLogout = () => {
    localStorage.removeItem("student");
    navigate("/login", { replace: true });
  };

  const menuItems = [
    {
      path: "/student/dashboard",
      label: "Dashboard",
      icon: "📊",
    },
    {
      path: "/student/attendance",
      label: "Attendance",
      icon: "📅",
    },
    {
      path: "/student/performance",
      label: "Performance",
      icon: "📈",
    },
    {
      path: "/student/examinations",
      label: "Examinations",
      icon: "📝",
    },
    {
      path: "/student/courses",
      label: "Courses",
      icon: "📚",
    },
    {
      path: "/student/activities",
      label: "Activities",
      icon: "🏆",
    },
    {
      path: "/student/reports",
      label: "Reports",
      icon: "📄",
    },
  ];

  return (
    <div className="student-layout">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside className="student-sidebar">

        {/* LOGO */}

        <div className="student-sidebar-logo">

          <div className="student-logo-icon">
            🎓
          </div>

          <div>
            <h2>School ERP</h2>
            <p>Student Portal</p>
          </div>

        </div>

        {/* MENU TITLE */}

        <div className="student-menu-title">
          MAIN MENU
        </div>

        {/* MENU */}

        <nav className="student-navigation">

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `student-nav-link ${
                  isActive
                    ? "student-nav-link-active"
                    : ""
                }`
              }
            >
              <span className="student-nav-icon">
                {item.icon}
              </span>

              <span>
                {item.label}
              </span>
            </NavLink>
          ))}

        </nav>

        {/* SIDEBAR BOTTOM */}

        <div className="student-sidebar-bottom">

          <div className="student-user-box">

            <div className="student-user-avatar">
              {studentName
                .charAt(0)
                .toUpperCase()}
            </div>

            <div>
              <strong>
                {studentName}
              </strong>

              <span>
                Student
              </span>
            </div>

          </div>

          <button
            className="student-logout-button"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>

        </div>

      </aside>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main className="student-main">

        {/* TOP HEADER */}

        <header className="student-topbar">

          <div>
            <h1>
              School ERP
            </h1>

            <span>
              Student Management Portal
            </span>
          </div>

          <div className="student-topbar-user">
            <span>
              Welcome, {studentName}
            </span>
          </div>

        </header>

        {/* PAGE CONTENT */}

        <section className="student-content">
          <Outlet />
        </section>

      </main>

      {/* =================================================
          STYLES
      ================================================= */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        .student-layout {
          min-height: 100vh;
          display: flex;
          background: #f1f5f9;
          color: #0f172a;
        }

        /* ===============================
           SIDEBAR
        =============================== */

        .student-sidebar {
          width: 270px;
          min-height: 100vh;
          background: #071126;
          color: white;
          display: flex;
          flex-direction: column;
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          z-index: 100;
        }

        .student-sidebar-logo {
          min-height: 110px;
          padding: 25px 22px;
          display: flex;
          align-items: center;
          gap: 14px;
          border-bottom: 1px solid #1e293b;
        }

        .student-logo-icon {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          background: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 25px;
        }

        .student-sidebar-logo h2 {
          margin: 0;
          font-size: 20px;
          font-weight: 700;
        }

        .student-sidebar-logo p {
          margin: 4px 0 0;
          color: #94a3b8;
          font-size: 13px;
        }

        .student-menu-title {
          padding: 28px 25px 12px;
          color: #64748b;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
        }

        .student-navigation {
          padding: 0 15px;
        }

        .student-nav-link {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 13px 15px;
          margin-bottom: 6px;
          border-radius: 8px;
          color: #cbd5e1;
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          transition: 0.2s;
        }

        .student-nav-link:hover {
          background: #17233c;
          color: white;
        }

        .student-nav-link-active {
          background: #2563eb;
          color: white !important;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
        }

        .student-nav-icon {
          width: 24px;
          text-align: center;
          font-size: 18px;
        }

        .student-sidebar-bottom {
          margin-top: auto;
          padding: 18px 15px;
          border-top: 1px solid #1e293b;
        }

        .student-user-box {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px;
          margin-bottom: 12px;
        }

        .student-user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 17px;
        }

        .student-user-box strong {
          display: block;
          font-size: 14px;
        }

        .student-user-box span {
          display: block;
          color: #94a3b8;
          font-size: 12px;
          margin-top: 3px;
        }

        .student-logout-button {
          width: 100%;
          padding: 11px;
          border: 1px solid #334155;
          border-radius: 7px;
          background: #111c32;
          color: #fca5a5;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
        }

        .student-logout-button:hover {
          background: #7f1d1d;
          color: white;
        }

        /* ===============================
           MAIN
        =============================== */

        .student-main {
          width: calc(100% - 270px);
          margin-left: 270px;
          min-height: 100vh;
        }

        .student-topbar {
          height: 75px;
          background: white;
          border-bottom: 1px solid #e2e8f0;
          padding: 0 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .student-topbar h1 {
          margin: 0;
          font-size: 21px;
          color: #0f172a;
        }

        .student-topbar span {
          display: block;
          margin-top: 3px;
          color: #64748b;
          font-size: 12px;
        }

        .student-topbar-user {
          padding: 10px 16px;
          border-radius: 8px;
          background: #eff6ff;
          color: #2563eb;
          font-weight: 600;
        }

        .student-topbar-user span {
          color: #2563eb;
          margin: 0;
          font-size: 14px;
        }

        .student-content {
          padding: 30px;
          max-width: 1500px;
        }

        /* ===============================
           MOBILE
        =============================== */

        @media (max-width: 900px) {

          .student-sidebar {
            width: 220px;
          }

          .student-main {
            width: calc(100% - 220px);
            margin-left: 220px;
          }

          .student-topbar-user {
            display: none;
          }

        }

        @media (max-width: 650px) {

          .student-sidebar {
            width: 70px;
          }

          .student-sidebar-logo {
            justify-content: center;
            padding: 15px 5px;
          }

          .student-sidebar-logo > div:last-child,
          .student-menu-title,
          .student-nav-link span:last-child,
          .student-user-box > div:last-child,
          .student-logout-button {
            display: none;
          }

          .student-navigation {
            padding: 0 8px;
          }

          .student-nav-link {
            justify-content: center;
            padding: 14px 5px;
          }

          .student-main {
            width: calc(100% - 70px);
            margin-left: 70px;
          }

          .student-content {
            padding: 15px;
          }

          .student-topbar {
            padding: 0 15px;
          }

        }

      `}</style>

    </div>
  );
}

export default StudentLayout;